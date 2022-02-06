package com.pravdinm.synthese.model.user;

import lombok.Data;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
@SuperBuilder(toBuilder = true)
@Document(collection = "manager")
public class Manager extends User{

    @Field
    private String managerTitle;
}
