package com.pravdinm.synthese.service;

import com.pravdinm.synthese.model.delivery.Product;
import com.pravdinm.synthese.repository.ProductRepository;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class InventoryService {

    private final ProductRepository productRepository;

    InventoryService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Optional<Product> addProduct(Product product) {
        Optional<Product> optionalProduct = Optional.empty();
        try {
            System.out.println(product);
            optionalProduct = Optional.of(productRepository.save(product));
        } catch (DuplicateKeyException exception) {
            exception.printStackTrace();
        }
        return optionalProduct;
    }

    public Optional<Product> getProduct(String productId) {
        return productRepository.findById(productId);
    }
}
