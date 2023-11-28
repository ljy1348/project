package com.example.back.model.dto.auth.oauth.naver;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class NaverTokenDto {
    private String token_type;
    private String access_token;
}
