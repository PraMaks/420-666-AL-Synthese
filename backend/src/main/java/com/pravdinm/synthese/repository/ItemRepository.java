package com.pravdinm.synthese.repository;

import com.pravdinm.synthese.model.delivery.Item;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends MongoRepository<Item, String> {

}
