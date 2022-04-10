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

@RestController
@CrossOrigin("http://localhost:3006")
public class InventoryController {

    private final InventoryService service;

    public InventoryController(InventoryService service) {
        this.service = service;
    }

    @PostMapping("/inventory/product/add")
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        return service.addProduct(product)
                .map(_product -> ResponseEntity.status(HttpStatus.CREATED).body(_product))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @GetMapping("/inventory/product/get/{productId}")
    public ResponseEntity<Product> getProduct(@PathVariable String productId) {
        return service.getProduct(productId)
                .map(_product -> ResponseEntity.status(HttpStatus.ACCEPTED).body(_product))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @GetMapping("/inventory/product/getAll")
    public ResponseEntity<List<Product>> getAllProducts(){
        return service.getAllProducts()
                .map(_products -> ResponseEntity.status(HttpStatus.ACCEPTED).body(_products))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @PostMapping("/inventory/product/delete/{productId}")
    public Boolean deleteProduct(@PathVariable String productId){
        return service.deleteProduct(productId);
    }

    @PostMapping("/inventory/item/add/{productId}/{itemAvailability}/{itemCost}")
    public ResponseEntity<Item> addItem(@PathVariable String productId, @PathVariable int itemAvailability, @PathVariable float itemCost) {
        return service.addItem(productId, itemAvailability, itemCost)
                .map(_item -> ResponseEntity.status(HttpStatus.CREATED).body(_item))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @GetMapping("/inventory/item/get/{itemId}")
    public ResponseEntity<Item> getItem(@PathVariable String itemId) {
        return service.getItem(itemId)
                .map(_item -> ResponseEntity.status(HttpStatus.ACCEPTED).body(_item))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @GetMapping("/inventory/item/getAll")
    public ResponseEntity<List<Item>> getAllItems(){
        return service.getAllItems()
                .map(_items -> ResponseEntity.status(HttpStatus.ACCEPTED).body(_items))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @PostMapping("/inventory/item/update/{productId}/{itemAvailability}/{itemCost}")
    public ResponseEntity<Item> updateItem(@PathVariable String productId, @PathVariable int itemAvailability, @PathVariable float itemCost) {
        return service.updateItem(productId, itemAvailability, itemCost)
                .map(_item -> ResponseEntity.status(HttpStatus.CREATED).body(_item))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @PostMapping("/inventory/item/delete/{itemId}")
    public Boolean deleteItem(@PathVariable String itemId){
        return service.deleteItem(itemId);
    }

    @PostMapping("/inventory/listing/add/{itemId}/{listingAmount}/{userId}")
    public ResponseEntity<Listing> addListing(@PathVariable String itemId, @PathVariable int listingAmount, @PathVariable String userId) {
        return service.addListing(itemId, listingAmount, userId)
                .map(_listing -> ResponseEntity.status(HttpStatus.CREATED).body(_listing))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @GetMapping("/inventory/listing/get/{listingId}")
    public ResponseEntity<Listing> getListing(@PathVariable String listingId) {
        return service.getListing(listingId)
                .map(_listing -> ResponseEntity.status(HttpStatus.ACCEPTED).body(_listing))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @GetMapping("/inventory/listing/getList/{userId}")
    public ResponseEntity<List<Listing>> getListingsFromClient(@PathVariable String userId) {
        return service.getListingFromClient(userId)
                .map(_listings -> ResponseEntity.status(HttpStatus.ACCEPTED).body(_listings))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @PostMapping("/inventory/listing/delete/{userId}/{listingId}")
    public ResponseEntity<Client> deleteListingFromClient(@PathVariable String userId, @PathVariable String listingId) {
        return service.deleteListingFromClient(userId, listingId)
                .map(_client -> ResponseEntity.status(HttpStatus.ACCEPTED).body(_client))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @PostMapping("/inventory/listing/update/{listingId}/{listingAmount}/{userId}")
    public ResponseEntity<Listing> updateListing(@PathVariable String listingId, @PathVariable int listingAmount, @PathVariable String userId) {
        return service.updateListing(listingId, listingAmount, userId)
                .map(_listing -> ResponseEntity.status(HttpStatus.CREATED).body(_listing))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @PostMapping("/inventory/order/add/{userId}")
    public ResponseEntity<Order> addOrder(@RequestBody Order order, @PathVariable String userId) {
        return service.addOrder(order, userId)
                .map(_order -> ResponseEntity.status(HttpStatus.CREATED).body(_order))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @GetMapping("/inventory/order/get/{orderId}")
    public ResponseEntity<Order> getOrder(@PathVariable String orderId) {
        return service.getOrder(orderId)
                .map(_order -> ResponseEntity.status(HttpStatus.ACCEPTED).body(_order))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @GetMapping("/inventory/order/getList/{userId}")
    public ResponseEntity<List<Order>> getOrdersFromClient(@PathVariable String userId) {
        return service.getOrdersFromClient(userId)
                .map(_orders -> ResponseEntity.status(HttpStatus.ACCEPTED).body(_orders))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @GetMapping("/inventory/item/getAllAvailable")
    public ResponseEntity<List<Item>> getAllAvailableItems(){
        return service.getAllAvailableItems()
                .map(_items -> ResponseEntity.status(HttpStatus.ACCEPTED).body(_items))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @GetMapping("/inventory/order/getAllUnaccepted")
    public ResponseEntity<List<Order>> getAllUnacceptedOrders(){
        return service.getAllUnacceptedOrders()
                .map(_orders -> ResponseEntity.status(HttpStatus.ACCEPTED).body(_orders))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @PostMapping("/inventory/order/acceptOrder/{orderId}")
    public ResponseEntity<Order> acceptOrder(@PathVariable String orderId) {
        return service.acceptOrder(orderId)
                .map(_order -> ResponseEntity.status(HttpStatus.CREATED).body(_order))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

}
