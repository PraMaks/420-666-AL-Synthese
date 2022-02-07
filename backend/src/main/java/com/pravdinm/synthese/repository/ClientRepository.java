package com.pravdinm.synthese.repository;

import com.pravdinm.synthese.model.user.Client;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends MongoRepository<Client, String> {

}
