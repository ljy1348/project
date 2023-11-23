package com.example.back.model.dto.auth.request;

import com.example.back.model.entity.auth.ERole;
import lombok.*;

/**
 * packageName : com.example.simpledms.model.vo
 * fileName : User
 * author : kangtaegyung
 * date : 2023/07/29
 * description : UserReq
 * 요약 : 클라이언트 요청 매개변수값을 전달받을 클래스
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
public class MemberReq {

  private String memberName;

  private String memberId;

  private ERole memberAuth; // 권한명

  private String memberPw;

  private String memberEname;
  private String memberEmail;
  private String memberPhone;
  private String memberSex;
  private String memberAdd;
  private String memberDate;
  private String memberCountry;


  private boolean changePwd; // 프론트에서 패스워드 수정 했다는것을 나타내는 옵션(true, false)
}
