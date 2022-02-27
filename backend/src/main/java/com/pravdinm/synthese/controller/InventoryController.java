package com.pravdinm.synthese.controller;

import com.pravdinm.synthese.model.delivery.Item;
import com.pravdinm.synthese.model.delivery.Listing;
import com.pravdinm.synthese.model.delivery.Order;
import com.pravdinm.synthese.model.delivery.Product;
import com.pravdinm.synthese.service.InventoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/inventory/listing/add/{itemId}/{listingAmount}")
    public ResponseEntity<Listing> addListing(@PathVariable String itemId, @PathVariable int listingAmount) {
        return service.addListing(itemId, listingAmount)
                .map(_listing -> ResponseEntity.status(HttpStatus.CREATED).body(_listing))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @GetMapping("/inventory/listing/get/{listingId}")
    public ResponseEntity<Listing> getListing(@PathVariable String listingId) {
        return service.getListing(listingId)
                .map(_listing -> ResponseEntity.status(HttpStatus.ACCEPTED).body(_listing))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @PostMapping("/inventory/order/add")
    public ResponseEntity<Order> addOrder(@RequestBody Order order) {
        return service.addOrder(order)
                .map(_order -> ResponseEntity.status(HttpStatus.CREATED).body(_order))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @GetMapping("/inventory/order/get/{orderId}")
    public ResponseEntity<Order> getOrder(@PathVariable String orderId) {
        return service.getOrder(orderId)
                .map(_order -> ResponseEntity.status(HttpStatus.ACCEPTED).body(_order))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

}
