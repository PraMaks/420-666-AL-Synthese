package com.pravdinm.synthese.repository;

import com.pravdinm.synthese.model.user.Client;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClientRepository extends MongoRepository<Client, String> {

    Optional<Client> findByUsernameAndPassword(String username, String password);

    Optional<Client> findByUsername(String username);

    Optional<Client> findByEmail(String email);

}
