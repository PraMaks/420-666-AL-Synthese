package com.pravdinm.synthese.model.delivery;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@Document(collection = "order")
public class Order {

    @Id
    private String orderId;

    @Builder.Default
    private List<String> listingIdList = new ArrayList<>();

    @Field
    private String address;

    @Field
    private String city;

    @Field
    private String orderInfo;

    public Order() {
        super();
        this.listingIdList = new ArrayList<>();
    }

}