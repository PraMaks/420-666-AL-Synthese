package com.pravdinm.synthese.service;

import com.pravdinm.synthese.model.delivery.Item;
import com.pravdinm.synthese.model.delivery.Listing;
import com.pravdinm.synthese.model.delivery.Product;
import com.pravdinm.synthese.repository.ItemRepository;
import com.pravdinm.synthese.repository.ListingRepository;
import com.pravdinm.synthese.repository.ProductRepository;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;

@Service
public class InventoryService {

    private final ProductRepository productRepository;
    private final ItemRepository itemRepository;
    private final ListingRepository listingRepository;

    InventoryService(ProductRepository productRepository,
                     ItemRepository itemRepository,
                     ListingRepository listingRepository) {
        this.productRepository = productRepository;
        this.itemRepository = itemRepository;
        this.listingRepository = listingRepository;
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

    public Optional<Listing> addListing(String itemId, int listingAmount) {
        Optional<Item> optionalItem = itemRepository.findById(itemId);
        if(optionalItem.isPresent())
            return optionalItem.map(item -> createListing(listingAmount, item));
        else
            return Optional.empty();
    }

    private Listing createListing(int listingAmount, Item item){
        Listing listing = new Listing();
        listing.setItem(item);
        listing.setListingAmount(listingAmount);
        listing.setListingPrice(calculatePrice(listingAmount, item));
        listing.setItemHistoryInfo(archiveItemInfo(item));
        return listingRepository.save(listing);
    }

    private float calculatePrice(int listingAmount, Item item){
        return listingAmount * item.getItemCost();
    }

    private String archiveItemInfo(Item item){

        return "The archived item availability at" + getCurrentFormattedDate() + " was " + item.getItemAvailability() + " with a cost of $" + item.getItemCost() + ". " + archiveProductInfo(item.getProduct());
    }

    public Optional<Listing> getListing(String listingId) {
        return listingRepository.findById(listingId);
    }
}
