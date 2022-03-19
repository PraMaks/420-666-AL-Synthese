package com.pravdinm.synthese.service;

import com.pravdinm.synthese.model.delivery.Item;
import com.pravdinm.synthese.model.delivery.Listing;
import com.pravdinm.synthese.model.delivery.Order;
import com.pravdinm.synthese.model.delivery.Product;
import com.pravdinm.synthese.model.user.Client;
import com.pravdinm.synthese.repository.*;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class InventoryService {

    private final ProductRepository productRepository;
    private final ItemRepository itemRepository;
    private final ListingRepository listingRepository;
    private final OrderRepository orderRepository;
    private final ClientRepository clientRepository;

    InventoryService(ProductRepository productRepository,
                     ItemRepository itemRepository,
                     ListingRepository listingRepository,
                     OrderRepository orderRepository,
                     ClientRepository clientRepository) {
        this.productRepository = productRepository;
        this.itemRepository = itemRepository;
        this.listingRepository = listingRepository;
        this.orderRepository = orderRepository;
        this.clientRepository = clientRepository;
    }

    public Optional<Product> addProduct(Product product) {
        Optional<Product> optionalProduct = Optional.empty();
        try {
            optionalProduct = Optional.of(productRepository.save(product));
        } catch (DuplicateKeyException exception) {
            exception.printStackTrace();
        }
        return optionalProduct;
    }

    public Optional<Product> getProduct(String productId) {
        return productRepository.findById(productId);
    }

    public Optional<List<Product>> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return products.isEmpty() ? Optional.empty() : Optional.of(products);
    }

    public Optional<Item> addItem(String productId, int itemAvailability, float itemCost) {
        Optional<Product> optionalProduct = productRepository.findById(productId);
        if(optionalProduct.isPresent())
            return itemRepository.findByProduct(optionalProduct.get()).isPresent() ? Optional.empty() :
                    optionalProduct.map(product -> createItem(itemAvailability, itemCost, product));
        else
            return Optional.empty();
    }

    private Item createItem(int itemAvailability, float itemCost, Product product){
        Item item = new Item();
        item.setProduct(product);
        item.setItemAvailability(itemAvailability);
        item.setItemCost(itemCost);
        item.setProductHistoryInfo(archiveProductInfo(product));
        return itemRepository.save(item);
    }

    private String getCurrentFormattedDate(){
        SimpleDateFormat formatter= new SimpleDateFormat("yyyy-MM-dd 'at' HH:mm:ss z");
        Date date = new Date(System.currentTimeMillis());
        return formatter.format(date);
    }

    private String archiveProductInfo(Product product){
        return "The archived product is " + product.getProductName() + " owned by " + product.getProductCompany() + " at " + getCurrentFormattedDate();
    }

    public Optional<Item> getItem(String itemId) {
        return itemRepository.findById(itemId);
    }

    public Optional<List<Item>> getAllItems() {
        List<Item> items = itemRepository.findAll();
        return items.isEmpty() ? Optional.empty() : Optional.of(items);
    }

    public Optional<Item> updateItem(String productId, int itemAvailability, float itemCost){
        Optional<Product> optionalProduct = productRepository.findById(productId);
        if(optionalProduct.isPresent()) {
            Optional<Item> optionalItem = itemRepository.findByProduct(optionalProduct.get());
            if(optionalItem.isPresent()){
                Item item = optionalItem.get();
                item.setItemAvailability(itemAvailability);
                item.setItemCost(itemCost);
                optionalItem = Optional.of(itemRepository.save(item));
                return optionalItem;
            }
        }
        return Optional.empty();
    }

    public Optional<Listing> addListing(String itemId, int listingAmount, String userId) {
        Optional<Item> optionalItem = itemRepository.findById(itemId);
        if(optionalItem.isPresent()) {
            Item itemFound = optionalItem.get();
            if(itemFound.getItemAvailability() >= listingAmount)
                return optionalItem.map(item -> createListing(listingAmount, item, userId));
        }
        return Optional.empty();
    }

    private Listing createListing(int listingAmount, Item item, String userId){
        Listing listing = new Listing();

        updateItemAvailability(listingAmount, item);

        listing.setItem(item);
        listing.setListingAmount(listingAmount);
        listing.setListingPrice(calculatePrice(listingAmount, item));
        listing.setItemHistoryInfo(archiveItemInfo(item));
        listingRepository.save(listing);

        Optional<Client> optionalClient = clientRepository.findById(userId);
        if (optionalClient.isPresent()){
            Client client = optionalClient.get();
            List<Listing> list = client.getListingList();
            list.add(listing);
            clientRepository.save(client);
            return listing;
        }

        return null;
    }

    private void updateItemAvailability(int listingAmount, Item item){
        item.setItemAvailability(item.getItemAvailability() - listingAmount);
        itemRepository.save(item);
    }

    private float calculatePrice(int listingAmount, Item item){
        return listingAmount * item.getItemCost();
    }

    private String archiveItemInfo(Item item){
        return "The archived item availability at " + getCurrentFormattedDate() + " was " + item.getItemAvailability() + " with a cost of $" + item.getItemCost() + ". " + archiveProductInfo(item.getProduct());
    }

    public Optional<Listing> getListing(String listingId) {
        return listingRepository.findById(listingId);
    }

    public Optional<List<Listing>> getListingFromUser(String userId) {
        Optional<Client> optionalClient = clientRepository.findById(userId);
        if(optionalClient.isPresent()){
            Client client = optionalClient.get();
            return Optional.of(client.getListingList());
        }
        return Optional.empty();
    }

    public Optional<Order> addOrder(Order order) {
        Optional<Order> optionalOrder = Optional.empty();
        try {
            for(String listingId : order.getListingIdList()){
                if(listingRepository.findById(listingId).isEmpty()){
                    return Optional.empty();
                }
            }
            optionalOrder = Optional.of(order);
            Order orderToSave = optionalOrder.get();

            orderToSave.setOrderInfo(archiveOrderInfo(orderToSave.getListingIdList()));

            orderRepository.save(optionalOrder.get());
        } catch (DuplicateKeyException exception) {
            exception.printStackTrace();
        }
        return optionalOrder;
    }

    private String archiveOrderInfo(List<String> listingIdList){
        String orderInfo = "The order was made " + getCurrentFormattedDate() + " contains listings of : ";
        int listingCounter = 1;
        for(String listingId : listingIdList){
            Listing listing = listingRepository.findById(listingId).get();
            orderInfo += listingCounter + ") " + archiveItemInfo(listing.getItem()) + " with a price of $" + listing.getListingPrice() + ". The listing's amount is " + listing.getListingAmount();
            listingCounter++;
        }
        return orderInfo;
    }

    public Optional<Order> getOrder(String orderId) {
        return orderRepository.findById(orderId);
    }

    public Optional<List<Item>> getAllAvailableItems() {
        List<Item> items = itemRepository.findByItemAvailabilityGreaterThan(0).get();
        return items.isEmpty() ? Optional.empty() : Optional.of(items);
    }
}
