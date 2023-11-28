package com.example.back.model.dto.auth.oauth.kakao;

import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class KakaoAccountDto {
    private String nickname;
}
