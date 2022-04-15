package com.pravdinm.synthese.controller;

import com.pravdinm.synthese.model.delivery.Item;
import com.pravdinm.synthese.model.delivery.Listing;
import com.pravdinm.synthese.model.delivery.Order;
import com.pravdinm.synthese.model.delivery.Product;
import com.pravdinm.synthese.model.user.Client;
import com.pravdinm.synthese.service.InventoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.pravdinm.synthese.utils.UtilsUrl.*;
import static com.pravdinm.synthese.utils.UtilsUrl.InventoryControllerUrl.*;

@RestController
@CrossOrigin(CROSS_ORIGIN_ALLOWED)
public class InventoryController {

    private final InventoryService service;

    public InventoryController(InventoryService service) {
        this.service = service;
    }

    //////////////////////////////////////////////////////
    // PRODUCTS
    //////////////////////////////////////////////////////
    @PostMapping(URL_ADD_PRODUCT)
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        return service.addProduct(product)
                .map(_product -> ResponseEntity.status(HttpStatus.CREATED).body(_product))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @GetMapping(URL_GET_PRODUCT)
    public ResponseEntity<Product> getProduct(@PathVariable String productId) {
        return service.getProduct(productId)
                .map(_product -> ResponseEntity.status(HttpStatus.ACCEPTED).body(_product))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @GetMapping(URL_GET_ALL_PRODUCTS)
    public ResponseEntity<List<Product>> getAllProducts(){
        return service.getAllProducts()
                .map(_products -> ResponseEntity.status(HttpStatus.ACCEPTED).body(_products))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @PostMapping(URL_DELETE_PRODUCT)
    public Boolean deleteProduct(@PathVariable String productId){
        return service.deleteProduct(productId);
    }

    //////////////////////////////////////////////////////
    // ITEMS
    //////////////////////////////////////////////////////

    @PostMapping(URL_ADD_ITEM)
    public ResponseEntity<Item> addItem(@PathVariable String productId, @PathVariable int itemAvailability, @PathVariable float itemCost) {
        return service.addItem(productId, itemAvailability, itemCost)
                .map(_item -> ResponseEntity.status(HttpStatus.CREATED).body(_item))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @GetMapping(URL_GET_ITEM)
    public ResponseEntity<Item> getItem(@PathVariable String itemId) {
        return service.getItem(itemId)
                .map(_item -> ResponseEntity.status(HttpStatus.ACCEPTED).body(_item))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @GetMapping(URL_GET_ALL_ITEMS)
    public ResponseEntity<List<Item>> getAllItems(){
        return service.getAllItems()
                .map(_items -> ResponseEntity.status(HttpStatus.ACCEPTED).body(_items))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @PostMapping(URL_UPDATE_ITEM)
    public ResponseEntity<Item> updateItem(@PathVariable String productId, @PathVariable int itemAvailability, @PathVariable float itemCost) {
        return service.updateItem(productId, itemAvailability, itemCost)
                .map(_item -> ResponseEntity.status(HttpStatus.CREATED).body(_item))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @PostMapping(URL_DELETE_ITEM)
    public Boolean deleteItem(@PathVariable String itemId){
        return service.deleteItem(itemId);
    }

    @GetMapping(URL_GET_ALL_AVAILABLE_ITEMS)
    public ResponseEntity<List<Item>> getAllAvailableItems(){
        return service.getAllAvailableItems()
                .map(_items -> ResponseEntity.status(HttpStatus.ACCEPTED).body(_items))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    //////////////////////////////////////////////////////
    // LISTINGS
    //////////////////////////////////////////////////////

    @PostMapping(URL_ADD_LISTING)
    public ResponseEntity<Listing> addListing(@PathVariable String itemId, @PathVariable int listingAmount, @PathVariable String userId) {
        return service.addListing(itemId, listingAmount, userId)
                .map(_listing -> ResponseEntity.status(HttpStatus.CREATED).body(_listing))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @GetMapping(URL_GET_LISTING)
    public ResponseEntity<Listing> getListing(@PathVariable String listingId) {
        return service.getListing(listingId)
                .map(_listing -> ResponseEntity.status(HttpStatus.ACCEPTED).body(_listing))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @GetMapping(URL_GET_LISTINGS_FROM_CLIENT)
    public ResponseEntity<List<Listing>> getListingsFromClient(@PathVariable String userId) {
        return service.getListingFromClient(userId)
                .map(_listings -> ResponseEntity.status(HttpStatus.ACCEPTED).body(_listings))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @PostMapping(URL_DELETE_LISTING_FROM_CLIENT)
    public ResponseEntity<Client> deleteListingFromClient(@PathVariable String userId, @PathVariable String listingId) {
        return service.deleteListingFromClient(userId, listingId)
                .map(_client -> ResponseEntity.status(HttpStatus.ACCEPTED).body(_client))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @PostMapping(URL_UPDATE_LISTING)
    public ResponseEntity<Listing> updateListing(@PathVariable String listingId, @PathVariable int listingAmount, @PathVariable String userId) {
        return service.updateListing(listingId, listingAmount, userId)
                .map(_listing -> ResponseEntity.status(HttpStatus.CREATED).body(_listing))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    //////////////////////////////////////////////////////
    // ORDERS
    //////////////////////////////////////////////////////

    @PostMapping(URL_ADD_ORDER)
    public ResponseEntity<Order> addOrder(@RequestBody Order order, @PathVariable String userId) {
        return service.addOrder(order, userId)
                .map(_order -> ResponseEntity.status(HttpStatus.CREATED).body(_order))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @GetMapping(URL_GET_ORDER)
    public ResponseEntity<Order> getOrder(@PathVariable String orderId) {
        return service.getOrder(orderId)
                .map(_order -> ResponseEntity.status(HttpStatus.ACCEPTED).body(_order))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @GetMapping(URL_GET_ORDERS_FROM_CLIENT)
    public ResponseEntity<List<Order>> getOrdersFromClient(@PathVariable String userId) {
        return service.getOrdersFromClient(userId)
                .map(_orders -> ResponseEntity.status(HttpStatus.ACCEPTED).body(_orders))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @GetMapping(URL_GET_ALL_UNACCEPTED_ORDERS)
    public ResponseEntity<List<Order>> getAllUnacceptedOrders(){
        return service.getAllUnacceptedOrders()
                .map(_orders -> ResponseEntity.status(HttpStatus.ACCEPTED).body(_orders))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @PostMapping(URL_ACCEPT_ORDER)
    public ResponseEntity<Order> acceptOrder(@PathVariable String orderId) {
        return service.acceptOrder(orderId)
                .map(_order -> ResponseEntity.status(HttpStatus.CREATED).body(_order))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

}
