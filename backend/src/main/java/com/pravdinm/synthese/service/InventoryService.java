package com.pravdinm.synthese.service;

import com.pravdinm.synthese.model.delivery.Item;
import com.pravdinm.synthese.model.delivery.Listing;
import com.pravdinm.synthese.model.delivery.Order;
import com.pravdinm.synthese.model.delivery.Product;
import com.pravdinm.synthese.model.user.Client;
import com.pravdinm.synthese.repository.*;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
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

    public Boolean deleteProduct(String productId) {
        Optional<Product> optionalProduct = productRepository.findById(productId);
        if(optionalProduct.isPresent()){
            Optional<Item> optionalItem = itemRepository.findByProduct(optionalProduct.get());
            if(optionalItem.isPresent()){
                Item item = optionalItem.get();
                itemRepository.deleteById(item.getItemId());
            }

            productRepository.deleteById(productId);
            return true;
        }
        return false;
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

    public Boolean deleteItem(String itemId) {
        Optional<Item> optionalItem = itemRepository.findById(itemId);
        if(optionalItem.isPresent()){
            itemRepository.deleteById(itemId);
            return true;
        }
        return false;
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

        substractItemAvailability(listingAmount, item);

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

    private void substractItemAvailability(int listingAmount, Item item){
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

    public Optional<List<Listing>> getListingFromClient(String userId) {
        Optional<Client> optionalClient = clientRepository.findById(userId);
        if(optionalClient.isPresent()){
            Client client = optionalClient.get();
            return Optional.of(client.getListingList());
        }
        return Optional.empty();
    }

    public Optional<Listing> updateListing(String listingId, int listingAmount, String userId) {
        Optional<Listing> optionalListing = listingRepository.findById(listingId);
        if(optionalListing.isPresent()) {
            Listing listing = optionalListing.get();
            Item itemFromListing = listing.getItem();

            deleteListingFromClient(userId, listingId);

            Optional<Listing> optionalListingUpdated = addListing(itemFromListing.getItemId(), listingAmount, userId);
            return optionalListingUpdated;
        }
        return Optional.empty();
    }

    public Optional<Client> deleteListingFromClient(String userId, String listingId) {
        Optional<Client> optionalClient = clientRepository.findById(userId);
        Optional<Listing> optionalListing = listingRepository.findById(listingId);

        if(optionalClient.isPresent() && optionalListing.isPresent()){
            Client client = optionalClient.get();
            Listing listing = optionalListing.get();

            updateItemWhenListingDeleted(listing);

            client.getListingList().remove(listing);
            listingRepository.delete(listing);

            clientRepository.save(client);
            return Optional.of(client);
        }
        return Optional.empty();
    }

    private void updateItemWhenListingDeleted(Listing listing){
        String itemId = listing.getItem().getItemId();
        Optional<Item> optionalItem = itemRepository.findById(itemId);

        if(optionalItem.isPresent()){
            Item item = optionalItem.get();
            addItemAvailability(listing.getListingAmount(), item);
        }
    }

    private void addItemAvailability(int listingAmount, Item item){
        item.setItemAvailability(item.getItemAvailability() + listingAmount);
        itemRepository.save(item);
    }

    public Optional<Order> addOrder(Order order, String userId) {
        Optional<Order> optionalOrder = Optional.empty();
        Optional<Client> optionalClient = clientRepository.findById(userId);

        if(optionalClient.isPresent()){
            for(Listing listing : order.getListingList()){
                if(listingRepository.findById(listing.getListingId()).isEmpty())
                    return Optional.empty();
            }
            optionalOrder = Optional.of(order);
            Order orderToSave = optionalOrder.get();
            orderToSave.setClient(optionalClient.get());
            orderToSave.setShippingDate(calculateShippingDate(14));
            orderToSave.setOrderInfo(archiveOrderInfo(orderToSave.getListingList(), order.getCost()));
            orderRepository.save(optionalOrder.get());

            Client client = optionalClient.get();
            client.getListingList().clear();
            clientRepository.save(client);
        }
        return optionalOrder;
    }

    private Date calculateShippingDate(int noOfDays){
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.DAY_OF_YEAR, noOfDays);
        Date date = cal.getTime();
        return date;
    }

    private String archiveOrderInfo(List<Listing> listingList, float cost){
        DecimalFormat decimalFormat = new DecimalFormat("##.00");
        String orderInfo = "The order with a total cost of " + decimalFormat.format(cost) + "$ was made " + getCurrentFormattedDate() + " contains listings of : ";
        int listingCounter = 1;
        for(Listing listing : listingList){
            orderInfo += listingCounter + ") " + archiveItemInfo(listing.getItem()) + " with a price of $" + listing.getListingPrice() + ". The listing's amount is " + listing.getListingAmount();
            listingCounter++;
        }
        return orderInfo;
    }

    public Optional<Order> getOrder(String orderId) {
        return orderRepository.findById(orderId);
    }

    public Optional<List<Order>> getOrdersFromClient(String userId) {
        Optional<Client> optionalClient = clientRepository.findById(userId);
        if(optionalClient.isPresent()){
            Client client = optionalClient.get();
            List<Order> orders = orderRepository.findAllByClient(client);
            return Optional.of(orders);
        }
        return Optional.empty();
    }

    public Optional<List<Item>> getAllAvailableItems() {
        List<Item> items = itemRepository.findByItemAvailabilityGreaterThan(0).get();
        return items.isEmpty() ? Optional.empty() : Optional.of(items);
    }

    public Optional<List<Order>> getAllUnacceptedOrders() {
        List<Order> orders = orderRepository.findAllByIsAcceptedFalse();
        return orders.isEmpty() ? Optional.empty() : Optional.of(orders);
    }

    public Optional<Order> acceptOrder(String orderId) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        if (optionalOrder.isPresent()){
            Order order = optionalOrder.get();
            order.setIsAccepted(true);
            orderRepository.save(order);
            return Optional.of(order);
        }
        return Optional.empty();
    }

}
