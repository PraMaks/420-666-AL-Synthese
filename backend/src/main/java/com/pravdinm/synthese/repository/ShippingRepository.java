package com.pravdinm.synthese.repository;

import com.pravdinm.synthese.model.delivery.Shipping;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShippingRepository extends MongoRepository<Shipping, String> {

}
