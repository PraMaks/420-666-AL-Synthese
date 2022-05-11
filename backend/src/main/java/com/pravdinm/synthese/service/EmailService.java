package com.pravdinm.synthese.service;

import com.pravdinm.synthese.model.delivery.Listing;
import com.pravdinm.synthese.model.delivery.Order;
import com.pravdinm.synthese.model.user.Client;
import com.pravdinm.synthese.repository.OrderRepository;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.mail.internet.MimeMessage;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class EmailService {

    private final JavaMailSender mailSender;
    private final OrderRepository orderRepository;

    EmailService(JavaMailSender mailSender,
                 OrderRepository orderRepository) {
        this.mailSender = mailSender;
        this.orderRepository = orderRepository;
    }

    //Pour les raisons de tests le cron est mis à se lancer à chaque minute
    @Scheduled(cron = "0 * * * * *")
    private void sendMails(){
        createEmailForOrderArrival();
    }

    private void createEmailForOrderArrival(){
        List<Order> orderList = orderRepository.findAll();
        for(Order order : orderList){
            if(isToday(order.getShippingDate())) {
                Client client = order.getClient();
                try {
                    MimeMessage message = mailSender.createMimeMessage();
                    MimeMessageHelper helper = new MimeMessageHelper(message, true);

                    helper.addTo(client.getEmail());
                    helper.setSubject("Votre commande arrive aujourd'hui");
                    helper.setText(generateOrderInfoEmail(order));
                    mailSender.send(message);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
    }

    private boolean isToday(Date shippingDate) {
        SimpleDateFormat fmt = new SimpleDateFormat("yyyyMMdd");
        return fmt.format(shippingDate).equals(fmt.format(new Date()));
    }

    private String generateOrderInfoEmail(Order order){
        String start = "Votre commande va arriver aujourd'hui!";
        String middle = "\n Elle contiendra : ";

        for(Listing listing : order.getListingList()){
            middle += "\n " + listing.getListingAmount() + " " + listing.getItem().getProduct().getProductName();
        }
        String body = start + middle;
        return body;
    }

    @Configuration
    @EnableScheduling
    @ConditionalOnProperty(name = "scheduling.enabled", matchIfMissing = true)
    static class SchedulingConfiguration {

    }
}
