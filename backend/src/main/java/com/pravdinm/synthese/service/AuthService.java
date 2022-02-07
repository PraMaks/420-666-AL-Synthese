package com.pravdinm.synthese.service;

import com.pravdinm.synthese.model.user.Client;
import com.pravdinm.synthese.repository.ClientRepository;
import com.pravdinm.synthese.repository.ManagerRepository;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final ClientRepository clientRepository;
    private final ManagerRepository managerRepository;

    AuthService(ClientRepository clientRepository,
                ManagerRepository managerRepository
    ) {
        this.clientRepository = clientRepository;
        this.managerRepository = managerRepository;
    }

    public Optional<Client> signUp(Client client) {
        Optional<Client> optionalClient = Optional.empty();
        try {
            System.out.println(client);
            optionalClient = Optional.of(clientRepository.save(client));
        } catch (DuplicateKeyException exception) {
            exception.printStackTrace();
        }
        return optionalClient;
    }
}