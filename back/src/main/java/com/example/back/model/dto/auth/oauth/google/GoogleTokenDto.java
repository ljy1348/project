package com.example.back.model.dto.auth.oauth.google;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class GoogleTokenDto {
    private String token_type;
    private String access_token;
    private String id_token;
}
