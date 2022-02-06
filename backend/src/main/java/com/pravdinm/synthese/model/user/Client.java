package com.pravdinm.synthese.model.user;

import lombok.Data;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@SuperBuilder(toBuilder = true)
@Document(collection = "manager")
public class Client extends User{
}
