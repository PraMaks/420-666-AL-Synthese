package com.pravdinm.synthese.model.delivery;

import com.pravdinm.synthese.model.user.Client;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@Document(collection = "order")
public class Order {

    @Id
    private String orderId;

    @Builder.Default
    private List<Listing> listingList = new ArrayList<>();

    @Field
    private String address;

    @Field
    private String city;

    @Field
    private float cost;

    @Field
    private String orderInfo;

    @CreatedDate
    @Builder.Default
    private Date creationDate = new Date();

    @Builder.Default
    private Boolean isAccepted = false;

    @Builder.Default
    private Date shippingDate = new Date();

    @DBRef
    private Client client;

    public Order() {
        super();
        this.listingList = new ArrayList<>();
        this.creationDate = new Date();
        this.isAccepted = false;
        this.shippingDate = new Date();
    }

}