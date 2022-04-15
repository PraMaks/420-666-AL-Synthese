package com.pravdinm.synthese.controller;

import com.pravdinm.synthese.model.user.Client;
import com.pravdinm.synthese.model.user.Manager;
import com.pravdinm.synthese.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.pravdinm.synthese.utils.UtilsUrl.*;
import static com.pravdinm.synthese.utils.UtilsUrl.AuthControllerUrl.*;

@RestController
@CrossOrigin(CROSS_ORIGIN_ALLOWED)
public class AuthController {

    private final AuthService service;

    public AuthController(AuthService service) {
        this.service = service;
    }

    @PostMapping(URL_SIGN_UP_CLIENT)
    public ResponseEntity<Client> signUpClient(@RequestBody Client client) {
        return service.signUp(client)
                .map(_client -> ResponseEntity.status(HttpStatus.CREATED).body(_client))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @GetMapping(URL_LOGIN_CLIENT)
    public ResponseEntity<Client> loginClient(@PathVariable String username, @PathVariable String password) {
        return service.loginClient(username, password)
                .map(_client -> ResponseEntity.status(HttpStatus.ACCEPTED).body(_client))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @GetMapping(URL_LOGIN_MANAGER)
    public ResponseEntity<Manager> loginManager(@PathVariable String username, @PathVariable String password) {
        return service.loginManager(username, password)
                .map(_manager -> ResponseEntity.status(HttpStatus.ACCEPTED).body(_manager))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }
}
