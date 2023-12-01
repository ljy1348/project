package com.example.back.controller.auth;

import com.example.back.model.dto.auth.request.MemberReq;
import com.example.back.model.dto.auth.response.MemberRes;
import com.example.back.model.entity.auth.ERole;
import com.example.back.model.entity.auth.Member;
import com.example.back.security.jwt.JwtUtils;
import com.example.back.security.services.UserDetailsImpl;
import com.example.back.service.auth.UserService;
import lombok.extern.slf4j.Slf4j;
import oracle.ucp.proxy.annotation.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.Optional;

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
    public ResponseEntity<Object> login(@RequestBody MemberReq memberReq) {
        try {
//            1) 인증 관리자가 인증 시작 : id/pwd 로 db에 있는지 조사
//            authentication : 인증을 통과한 객체(id/pwd,유저명,인증여부=true)
            Authentication authentication = authenticationManager.authenticate(
                    // 아이디와 패스워드로, Security 가 알아 볼 수 있는 token 객체로 생성해서 인증처리
                    new UsernamePasswordAuthenticationToken(memberReq.getMemberId(), memberReq.getMemberPw()));
            
//            2) 인증된 객체들을 홀더에 저장해둠
            SecurityContextHolder.getContext().setAuthentication(authentication);

//            3) jwt 발행
            String jwt = jwtUtils.generateJwtToken(authentication);

//            4) 인증된 객체
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
                log.info("aaaa : "+userDetails.getUserId());
//            5) 리액트로 보낼 dto 생성
            MemberRes memberRes = new MemberRes(jwt,userDetails.getUserId(),userDetails.getUsername(), userDetails.getAuthority().toString());

            return new ResponseEntity<>(memberRes,HttpStatus.OK);
        } catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //    신규 회원가입
    @PostMapping("/signup")
    public ResponseEntity<Object> createUser(@RequestBody MemberReq memberReq) {
        try {
//            1) 요청된 유저객체가 DB 에 id(email) 있는 지 확인
            if (userService.existsById(memberReq.getMemberId())) {
                return ResponseEntity
                        .badRequest()
                        .body("에러 : 아이디가 이미 있습니다.");
            }

            // ISO 8601 형식의 문자열을 파싱합니다
            ZonedDateTime zonedDateTime = ZonedDateTime.parse(memberReq.getMemberDate());

// ZonedDateTime을 java.util.Date로 변환합니다
            Date date = Date.from(zonedDateTime.toInstant());

//            2) 신규 유저 생성 : 권한 없이 생성
            Member user = new Member(
                    memberReq.getMemberId(),
//               todo: encoder.encode(패스워드) -> 암호화된 패스워드
                    passwordEncoder.encode(memberReq.getMemberPw()), // 패스워드(암호화)
                    memberReq.getMemberName(),
                    memberReq.getMemberEmail(),
                    memberReq.getMemberAdd(),
                    memberReq.getMemberPhone(),
                    memberReq.getMemberSex(),
                    memberReq.getMemberCountry(),
                    date.toString(),
                    memberReq.getMemberEname()
            );

            user.setMemberAuth(ERole.ROLE_USER);

            userService.save(user); // 신규유저를 DB 에 저장

            return new ResponseEntity<>("User registered successfully!", HttpStatus.OK);

        } catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/info/{userId}")
    public ResponseEntity<Member> findById(@PathVariable String userId) {
        try {

        Optional<Member> optionalUser = userService.findById(userId);
        if (optionalUser.isPresent()) {
            return new ResponseEntity<>(optionalUser.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Transactional
    @PutMapping("/info")
    public ResponseEntity<String> findById(@RequestBody Member user) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            UserDetailsImpl userDetails = (UserDetailsImpl)authentication.getPrincipal();

            String userId = userDetails.getUserId();
        log.info(userDetails.getAuthority().toString()+":"+userId);
        ERole eRole = ERole.ROLE_ADMIN;
        log.info("aaaaaaaaaa : "+eRole.toString());

            if (userDetails.getAuthority().toString().equals(eRole.toString()))
            {userId = user.getMemberId();}


        Optional<Member> optionalUser = userService.findById(userId);
        if (optionalUser.isPresent()) {
            Member user1 = optionalUser.get();
            user1.setMemberEname(user.getMemberEname());
            user1.setMemberName(user.getMemberName());
            user1.setMemberAdd(user.getMemberAdd());
            user1.setMemberEmail(user.getMemberEmail());
            user1.setMemberDate(user.getMemberDate());
            user1.setMemberPhone(user.getMemberPhone());
            user1.setMemberSex(user.getMemberSex());
        return new ResponseEntity<>("수정되었습니다.",HttpStatus.OK);
        }
        else
        return new ResponseEntity<>("수정에 실패하였습니다.",HttpStatus.NOT_FOUND);
        } catch (Exception e) {
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @Transactional
    @PutMapping("/pchange")
    public ResponseEntity<?> passChange(@RequestBody MemberReq memberReq) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl)authentication.getPrincipal();
        String originPw = userDetails.getPassword();

        if (passwordEncoder.matches(memberReq.getMemberPw(), originPw)) {
            try {

                Optional<Member> member = userService.findById(memberReq.getMemberId());
                if (member.isPresent()) {
                    Member member1 = member.get();
                    String newPw = passwordEncoder.encode(memberReq.getChangePw());
                    member1.setMemberPw(newPw);
                    return new ResponseEntity<>(HttpStatus.OK);
                } else {
                    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
                }
            } catch (Exception e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }


        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }

    @PostMapping("/forgot")
    public ResponseEntity<?> forgotPassword(@RequestBody Member member) {
        try {
            member.setMemberPw(passwordEncoder.encode(member.getMemberPw()));
        userService.forgot(member);
        return new ResponseEntity<>(HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
