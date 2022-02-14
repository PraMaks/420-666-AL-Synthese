package com.pravdinm.synthese.repository;

import com.pravdinm.synthese.model.user.Manager;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ManagerRepository extends MongoRepository<Manager, String> {

    Optional<Manager> findByUsernameAndPassword(String username, String password);

}
