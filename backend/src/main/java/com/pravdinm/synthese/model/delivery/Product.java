package com.pravdinm.synthese.model.delivery;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
@AllArgsConstructor
@Document(collection = "product")
public class Product {

    @Id
    private String productId;

    @Field
    @Indexed(unique = true)
    private String productName;

    @Field
    private String productDescription;

    @Field
    private String productCompany;
}
