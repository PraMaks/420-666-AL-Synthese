package com.pravdinm.synthese.controller;

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

    @PostMapping("/inventory/item/add")
    public ResponseEntity<Product> addItem(@RequestBody Product product) {
        return service.addProduct(product)
                .map(_product -> ResponseEntity.status(HttpStatus.CREATED).body(_product))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @GetMapping("/inventory/item/get/{productId}")
    public ResponseEntity<Product> getProduct(@PathVariable String productId) {
        return service.getProduct(productId)
                .map(_product -> ResponseEntity.status(HttpStatus.ACCEPTED).body(_product))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

}
