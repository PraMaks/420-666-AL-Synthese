package com.pravdinm.synthese.service;

import com.pravdinm.synthese.model.delivery.Item;
import com.pravdinm.synthese.model.delivery.Product;
import com.pravdinm.synthese.repository.ItemRepository;
import com.pravdinm.synthese.repository.ProductRepository;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class InventoryService {

    private final ProductRepository productRepository;
    private final ItemRepository itemRepository;

    InventoryService(ProductRepository productRepository,
                     ItemRepository itemRepository) {
        this.productRepository = productRepository;
        this.itemRepository = itemRepository;
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

    public Optional<Item> addItem(Product productReceived, int itemAvailability, float itemCost) {
        Optional<Product> optionalProduct = productRepository.findByProductName(productReceived.getProductName());
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
        return itemRepository.save(item);
    }

    public Optional<Item> getItem(String itemId) {
        return itemRepository.findById(itemId);
    }
}
