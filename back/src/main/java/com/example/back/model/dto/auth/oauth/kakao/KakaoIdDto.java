package com.example.back.model.dto.auth.oauth.kakao;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class KakaoIdDto {
    private String id;
    private KakaoAccountDto properties;


}
