package com.pravdinm.synthese.repository;

import com.pravdinm.synthese.model.user.Manager;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ManagerRepository extends MongoRepository<Manager, String> {

}
