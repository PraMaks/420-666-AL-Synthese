package com.pravdinm.synthese.model.user;

import com.pravdinm.synthese.model.delivery.Shipping;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.ArrayList;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder(toBuilder = true)
@Document(collection = "client")
public class Client extends User{

    @Field
    private Preferences preferences;

    @Builder.Default
    private List<Shipping> shippingList = new ArrayList<>();

    public Client() {
        super();
        this.shippingList = new ArrayList<>();
    }
}
