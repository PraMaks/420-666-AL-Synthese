package com.pravdinm.synthese.repository;

import com.pravdinm.synthese.model.delivery.Order;
import com.pravdinm.synthese.model.user.Client;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends MongoRepository<Order, String> {

    List<Order> findAllByIsAcceptedFalse();

    List<Order> findAllByClient(Client client);

}
