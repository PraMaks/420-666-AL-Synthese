package com.pravdinm.synthese.model.user;

import com.pravdinm.synthese.model.delivery.Order;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder(toBuilder = true)
@Document(collection = "client")
public class Client extends User{

    @Builder.Default
    private List<Order> orderList = new ArrayList<>();

    public Client() {
        super();
        this.orderList = new ArrayList<>();
    }
}
