package com.pravdinm.synthese.utils;

import com.pravdinm.synthese.model.delivery.Product;
import com.pravdinm.synthese.model.user.Client;
import com.pravdinm.synthese.model.user.Manager;

public class UtilsTest {

    public static Client getClientWithId(){
        Client client = getClientWithoutId();
        client.setUserId("61478hgk58e00c02c02bhd5");
        return client;
    }

    public static Client getClientWithoutId(){
        return Client.builder()
                .username("E1257896")
                .password("DAJo90l")
                .email("daniel.jolicoeur5@gmail.com")
                .firstName("Daniel")
                .lastName("Jolicoeur")
                .build();
    }

    public static Manager getManagerWithId(){
        Manager manager = getManagerWithoutId();
        manager.setUserId("61478hgk58e00c02c02bhd5");
        return manager;
    }

    public static Manager getManagerWithoutId(){
        return Manager.builder()
                .username("E1257896")
                .password("DAJo90l")
                .email("daniel.jolicoeur5@gmail.com")
                .firstName("Daniel")
                .lastName("Jolicoeur")
                .managerTitle("Employe")
                .build();
    }

}
