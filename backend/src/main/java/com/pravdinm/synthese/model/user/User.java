package com.pravdinm.synthese.model.user;

import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Field;

import java.io.Serializable;

@Data
@SuperBuilder(toBuilder = true)
@NoArgsConstructor
public class User implements Serializable {

    @Id
    protected String userId;

    @Field
    @Indexed(unique = true)
    protected String username;

    @Field
    protected String password;

    @Field
    protected String firstName;

    @Field
    protected String lastName;

    @Field
    @Indexed(unique = true)
    protected String email;

}

