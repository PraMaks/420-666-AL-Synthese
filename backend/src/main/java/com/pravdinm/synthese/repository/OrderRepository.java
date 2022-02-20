package com.pravdinm.synthese.repository;

import com.pravdinm.synthese.model.delivery.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends MongoRepository<Order, String> {

}
