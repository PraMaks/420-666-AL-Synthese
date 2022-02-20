package com.pravdinm.synthese.repository;

import com.pravdinm.synthese.model.delivery.Item;
import com.pravdinm.synthese.model.delivery.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ItemRepository extends MongoRepository<Item, String> {

    Optional<Item> findByProduct(Product product);

}
