package com.example.back.model.dto.auth.oauth.naver;

import com.example.back.model.dto.auth.oauth.kakao.KakaoAccountDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class NaverInfoDto {
    private NaverResponseDto response;


}
