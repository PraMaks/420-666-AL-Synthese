package com.pravdinm.synthese.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pravdinm.synthese.model.user.Client;
import com.pravdinm.synthese.model.user.Manager;
import com.pravdinm.synthese.service.AuthService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import static com.pravdinm.synthese.utils.UtilsTest.*;
import static com.pravdinm.synthese.utils.UtilsURL.*;

@WebMvcTest(AuthController.class)
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AuthService service;

    //global variables
    private Client expectedClient;
    private Manager expectedManager;

    @Test
    public void testSignUpClient() throws Exception {
        // Arrange
        expectedClient = getClientWithId();
        when(service.signUp(expectedClient)).thenReturn(Optional.of(expectedClient));

        // Act
        MvcResult result = mockMvc.perform(post(URL_SIGN_UP_CLIENT)
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(expectedClient))).andReturn();

        // Assert
        MockHttpServletResponse response = result.getResponse();
        var actualClient = new ObjectMapper().readValue(response.getContentAsString(), Client.class);

        assertThat(response.getStatus()).isEqualTo(HttpStatus.CREATED.value());
        assertThat(actualClient).isEqualTo(expectedClient);
    }

    @Test
    public void testLoginClient() throws Exception {
        // Arrange
        expectedClient = getClientWithId();
        when(service.loginClient(expectedClient.getUsername(), expectedClient.getPassword())).thenReturn(Optional.of(expectedClient));

        // Act
        MvcResult result = mockMvc.perform(get(URL_LOGIN_CLIENT + expectedClient.getUsername() + "/" + expectedClient.getPassword())
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(expectedClient))).andReturn();

        // Assert
        MockHttpServletResponse response = result.getResponse();
        var actualClient = new ObjectMapper().readValue(response.getContentAsString(), Client.class);

        assertThat(response.getStatus()).isEqualTo(HttpStatus.ACCEPTED.value());
        assertThat(actualClient).isEqualTo(expectedClient);
    }

    @Test
    public void testLoginManager() throws Exception {
        // Arrange
        expectedManager = getManagerWithId();
        when(service.loginManager(expectedManager.getUsername(), expectedManager.getPassword())).thenReturn(Optional.of(expectedManager));

        // Act
        MvcResult result = mockMvc.perform(get(URL_LOGIN_MANAGER + expectedManager.getUsername() + "/" + expectedManager.getPassword())
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(expectedManager))).andReturn();

        // Assert
        MockHttpServletResponse response = result.getResponse();
        var actualManager = new ObjectMapper().readValue(response.getContentAsString(), Manager.class);

        assertThat(response.getStatus()).isEqualTo(HttpStatus.ACCEPTED.value());
        assertThat(actualManager).isEqualTo(expectedManager);
    }

}
