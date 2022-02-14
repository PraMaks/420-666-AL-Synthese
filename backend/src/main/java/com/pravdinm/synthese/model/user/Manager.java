package com.pravdinm.synthese.model.user;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.ArrayList;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder(toBuilder = true)
@Document(collection = "manager")
public class Manager extends User{

    @Field
    private String managerTitle;

    public Manager() {
        super();
    }
}
