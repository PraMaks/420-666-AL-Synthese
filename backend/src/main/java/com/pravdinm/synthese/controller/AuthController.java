package com.pravdinm.synthese.controller;

import com.pravdinm.synthese.model.user.Client;
import com.pravdinm.synthese.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("http://localhost:8080")
public class AuthController {

    private final AuthService service;

    public AuthController(AuthService service) {
        this.service = service;
    }

    @PostMapping("/signUp/client")
    public ResponseEntity<Client> signUpClient(@RequestBody Client client) {
        return service.signUp(client)
                .map(_client -> ResponseEntity.status(HttpStatus.CREATED).body(_client))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }
}
