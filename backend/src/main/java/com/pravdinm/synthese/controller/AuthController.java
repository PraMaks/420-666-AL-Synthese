package com.pravdinm.synthese.controller;

import com.pravdinm.synthese.model.user.Client;
import com.pravdinm.synthese.model.user.Manager;
import com.pravdinm.synthese.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:3006")
public class AuthController {

    private final AuthService service;

    public AuthController(AuthService service) {
        this.service = service;
    }

    /*
    {
    "username": "test3",
    "password": "12345",
    "firstName": "firstName",
    "lastName": "lastName",
    "weeklyWorkTime": 3,
    "email": "email",
    "preferences": "TECHNOLOGIE"
    }
     */
    @PostMapping("/signUp/client")
    public ResponseEntity<Client> signUpClient(@RequestBody Client client) {
        return service.signUp(client)
                .map(_client -> ResponseEntity.status(HttpStatus.CREATED).body(_client))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @GetMapping("/login/client/{username}/{password}")
    public ResponseEntity<Client> loginClient(@PathVariable String username, @PathVariable String password) {
        return service.loginClient(username, password)
                .map(_client -> ResponseEntity.status(HttpStatus.ACCEPTED).body(_client))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @GetMapping("/login/manager/{username}/{password}")
    public ResponseEntity<Manager> loginManager(@PathVariable String username, @PathVariable String password) {
        return service.loginManager(username, password)
                .map(_manager -> ResponseEntity.status(HttpStatus.ACCEPTED).body(_manager))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }
}
