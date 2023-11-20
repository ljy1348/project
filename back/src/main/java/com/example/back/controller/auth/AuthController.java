package com.example.back.controller.auth;

import com.example.back.model.dto.auth.request.UserReq;
import com.example.back.model.dto.auth.response.UserRes;
import com.example.back.model.entity.auth.ERole;
import com.example.back.model.entity.auth.User;
import com.example.back.security.jwt.JwtUtils;
import com.example.back.security.services.UserDetailsImpl;
import com.example.back.service.auth.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * packageName : com.example.simpledms.controller.auth
 * fileName : AuthController
 * author : GGG
 * date : 2023-11-14
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-14         GGG          최초 생성
 */
@Slf4j
@RestController
@RequestMapping("/api/auth")
public class AuthController {

//    인증/권한체크 관리 객체
    @Autowired
    AuthenticationManager authenticationManager;

//    웹토큰
    @Autowired
    JwtUtils jwtUtils;

//    패스워드 암호화
    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    UserService userService;

    @PostMapping("/signin")
    public ResponseEntity<Object> login(@RequestBody UserReq userReq) {
        try {
//            1) 인증 관리자가 인증 시작 : id/pwd 로 db에 있는지 조사
//            authentication : 인증을 통과한 객체(id/pwd,유저명,인증여부=true)
            Authentication authentication = authenticationManager.authenticate(
                    // 아이디와 패스워드로, Security 가 알아 볼 수 있는 token 객체로 생성해서 인증처리
                    new UsernamePasswordAuthenticationToken(userReq.getEmail(), userReq.getPassword()));
            
//            2) 인증된 객체들을 홀더에 저장해둠
            SecurityContextHolder.getContext().setAuthentication(authentication);

//            3) jwt 발행
            String jwt = jwtUtils.generateJwtToken(authentication);

//            4) 인증된 객체
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

//            5) 리액트로 보낼 dto 생성
            UserRes userRes = new UserRes(jwt,userDetails.getEmail(),userDetails.getUsername(),userDetails.getAuthority().toString());

            return new ResponseEntity<>(userRes,HttpStatus.OK);
        } catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //    신규 회원가입
    @PostMapping("/signup")
    public ResponseEntity<Object> createUser(@RequestBody UserReq userReq) {
        try {
//            1) 요청된 유저객체가 DB 에 id(email) 있는 지 확인
            if (userService.existsById(userReq.getEmail())) {
                return ResponseEntity
                        .badRequest()
                        .body("에러 : 이메일이 이미 있습니다.");
            }

//            2) 신규 유저 생성 : 권한 없이 생성
            User user = new User(
                    userReq.getEmail(),   // id(이메일)
//               todo: encoder.encode(패스워드) -> 암호화된 패스워드
                    passwordEncoder.encode(userReq.getPassword()), // 패스워드(암호화)
                    userReq.getUsername()  // 유저명
            );

//            3) 일단 리액트에서 요청한 권한 있는지 조사
            String codeName = userReq.getCodeName(); // 요청권한 가져오기

            user.setCodeName(ERole.ROLE_USER.name()); // 권한 수정

            userService.save(user); // 신규유저를 DB 에 저장

            return new ResponseEntity<>("User registered successfully!", HttpStatus.OK);

        } catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
