package com.example.back.model.dto.auth.oauth.google;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class GoogleIdDto {
    private String email;
//    private GoogleAccountDto properties;
    private String name;


}
