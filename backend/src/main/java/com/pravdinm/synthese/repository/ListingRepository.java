package com.pravdinm.synthese.repository;

import com.pravdinm.synthese.model.delivery.Listing;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ListingRepository extends MongoRepository<Listing, String> {

}
