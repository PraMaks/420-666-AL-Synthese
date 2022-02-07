package com.pravdinm.synthese.model.delivery;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@Document(collection = "shipping")
public class Shipping {

    @Id
    private String shippingId;

    @Builder.Default
    private List<Listing> listingList = new ArrayList<>();

    @Field
    private String address;

    @Field
    private String city;

}