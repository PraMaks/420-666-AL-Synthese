package com.pravdinm.synthese.service;

import com.pravdinm.synthese.model.user.Client;
import com.pravdinm.synthese.model.user.Manager;
import com.pravdinm.synthese.repository.ClientRepository;
import com.pravdinm.synthese.repository.ManagerRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

import static com.pravdinm.synthese.utils.UtilsTest.*;

@ExtendWith(MockitoExtension.class)
public class AuthServiceTest {

    @InjectMocks
    private AuthService service;

    @Mock
    private ClientRepository clientRepository;

    @Mock
    private ManagerRepository managerRepository;

    //global variables
    private Client expectedClient;
    private Manager expectedManager;

    @Test
    public void testSignUpClient() {
        //Arrange
        expectedClient = getClientWithId();
        Client givenClient = getClientWithoutId();

        when(clientRepository.save(givenClient)).thenReturn(expectedClient);

        //Act
        final Optional<Client> optionalClient = service.signUp(givenClient);

        //Assert
        Client actualClient = optionalClient.orElse(null);

        assertThat(optionalClient.isPresent()).isTrue();
        assertThat(actualClient).isEqualTo(expectedClient);
    }

    @Test
    public void testLoginClient() {
        //Arrange
        expectedClient = getClientWithId();

        when(clientRepository.findByUsernameAndPassword(
                expectedClient.getUsername(), expectedClient.getPassword()))
                .thenReturn(Optional.of(expectedClient));
        //Act
        final Optional<Client> optionalClient =
                service.loginClient(expectedClient.getUsername(), expectedClient.getPassword());

        //Assert
        Client actualClient = optionalClient.orElse(null);

        assertThat(optionalClient.isPresent()).isTrue();
        assertThat(actualClient).isEqualTo(actualClient);
    }

    @Test
    public void testLoginManager() {
        //Arrange
        expectedManager = getManagerWithId();

        when(managerRepository.findByUsernameAndPassword(
                expectedManager.getUsername(), expectedManager.getPassword()))
                .thenReturn(Optional.of(expectedManager));
        //Act
        final Optional<Manager> optionalManager =
                service.loginManager(expectedManager.getUsername(), expectedManager.getPassword());

        //Assert
        Manager actualManager = optionalManager.orElse(null);

        assertThat(optionalManager.isPresent()).isTrue();
        assertThat(actualManager).isEqualTo(actualManager);
    }
}
