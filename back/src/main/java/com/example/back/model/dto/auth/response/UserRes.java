package com.example.back.model.dto.auth.response;

import com.example.back.model.entity.auth.ERole;
import lombok.*;


/**
 * packageName : com.example.simpledms.model.vo
 * fileName : User
 * author : kangtaegyung
 * date : 2023/07/29
 * description : UserRes
 * 요약 : 클라이언트로 서버 결과를 전송할 클래스(웹토큰 과 인증정보가 있음)
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2023/07/29         kangtaegyung          최초 생성
 */
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class UserRes {

  private String accessToken;

  private String tokenType = "Bearer";

  private String userId;

  private String userName;

  private String right;  // 권한명

  public UserRes(String accessToken, String email, String username, String codeName) {
    this.accessToken = accessToken;
    this.userId = email;
    this.userName = username;
    this.right = codeName;
  }
}
