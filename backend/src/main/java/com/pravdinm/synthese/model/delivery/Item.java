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
@Document(collection = "item")
public class Item {

    @Id
    private String itemId;

    @DBRef
    private Product product;

    @Field
    private int itemAvailability;

    @Field
    private float itemCost;
}
