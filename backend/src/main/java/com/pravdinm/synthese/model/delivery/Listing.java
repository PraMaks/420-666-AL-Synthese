package com.pravdinm.synthese.model.delivery;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "listing")
public class Listing {

    @Id
    private String listingId;

    @DBRef
    private Item item;

    @Field
    private int listingAmount;

    @Field
    private float listingPrice;

    @Field
    private String itemHistoryInfo;
}
