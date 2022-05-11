package com.pravdinm.synthese.repository;

import com.pravdinm.synthese.model.delivery.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepository extends MongoRepository<Product, String> {

}
