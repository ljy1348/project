package com.example.back.controller.auth;

import com.example.back.model.dto.auth.oauth.google.GoogleTokenDto;
import com.example.back.model.dto.auth.oauth.kakao.KakaoTokenDto;
import com.example.back.model.dto.auth.oauth.naver.NaverTokenDto;
import com.example.back.model.dto.auth.response.MemberRes;
import com.example.back.model.entity.auth.Member;
import com.example.back.security.jwt.JwtUtils;
import com.example.back.security.services.UserDetailsImpl;
import com.example.back.security.services.UserDetailsServiceImpl;
import com.example.back.service.auth.OauthService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/oauth")
public class OauthController {

    @Autowired
    OauthService oauthService;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserDetailsServiceImpl userDetailsService;

    //    웹토큰
    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/kakao")
    public ResponseEntity<?> kakaoLogin(@RequestBody String code) {
        try {
            KakaoTokenDto kakaoTokenDto = oauthService.getKakaoAccessToken(code);
            if (kakaoTokenDto != null){
                Member user = oauthService.getKakaoInfo(kakaoTokenDto.getAccess_token());
                SimpleGrantedAuthority codeName = new SimpleGrantedAuthority(user.getMemberAuth().toString());
                List<SimpleGrantedAuthority> codeNameList = new LinkedList<>();
                codeNameList.add(codeName);
                UserDetails userDetail = userDetailsService.loadUserByUsername(user.getMemberId());
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetail,
                        null,
                        codeNameList
                );
                //            2) 인증된 객체들을 홀더에 저장해둠
                SecurityContextHolder.getContext().setAuthentication(authentication);

//            3) jwt 발행
                String jwt = jwtUtils.generateJwtToken(authentication);

//            4) 인증된 객체
                UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

//            5) 리액트로 보낼 dto 생성
                MemberRes memberRes = new MemberRes(jwt,userDetails.getUserId(),userDetails.getUsername(),userDetails.getAuthority().toString());

                return new ResponseEntity<>(memberRes,HttpStatus.OK);
            }
            else return new ResponseEntity<>("토큰 정보 못받아왔어용",HttpStatus.OK);

        } catch (Exception e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.OK);

        }

    }

    @PostMapping("/naver/{code}")
    public ResponseEntity<?> naverLogin(@PathVariable String code) {
        try {
            log.info("네이버 로그인1");
            NaverTokenDto naverTokenDto = oauthService.getNaverAccessToken(code);
            if (naverTokenDto != null){
            log.info("네이버 로그인2");
                Member user = oauthService.getNaverInfo(naverTokenDto.getAccess_token());
                SimpleGrantedAuthority codeName = new SimpleGrantedAuthority(user.getMemberAuth().toString());
                List<SimpleGrantedAuthority> codeNameList = new LinkedList<>();
                codeNameList.add(codeName);
                UserDetails userDetail = userDetailsService.loadUserByUsername(user.getMemberId());
            log.info("네이버 로그인3");
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetail,
                        null,
                        codeNameList
                );
                //            2) 인증된 객체들을 홀더에 저장해둠
                SecurityContextHolder.getContext().setAuthentication(authentication);
            log.info("네이버 로그인4");

//            3) jwt 발행
                String jwt = jwtUtils.generateJwtToken(authentication);

//            4) 인증된 객체
                UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

//            5) 리액트로 보낼 dto 생성
                MemberRes memberRes = new MemberRes(jwt,userDetails.getUserId(),userDetails.getUsername(),userDetails.getAuthority().toString());

                return new ResponseEntity<>(memberRes,HttpStatus.OK);
            }
            else return new ResponseEntity<>("토큰 정보 못받아왔어용",HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.OK);

        }

    }

    @PostMapping("/google/{a}/{code}")
    public ResponseEntity<?> googleLogin(@PathVariable String code) {
        try {
            GoogleTokenDto googleTokenDto = oauthService.getGoogleAccessToken(code);
            if (googleTokenDto != null){
                Member user = oauthService.getGoogleInfo(googleTokenDto.getAccess_token());
                SimpleGrantedAuthority codeName = new SimpleGrantedAuthority(user.getMemberAuth().toString());
                List<SimpleGrantedAuthority> codeNameList = new LinkedList<>();
                codeNameList.add(codeName);
                UserDetails userDetail = userDetailsService.loadUserByUsername(user.getMemberId());
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetail,
                        null,
                        codeNameList
                );
                //            2) 인증된 객체들을 홀더에 저장해둠
                SecurityContextHolder.getContext().setAuthentication(authentication);

//            3) jwt 발행
                String jwt = jwtUtils.generateJwtToken(authentication);

//            4) 인증된 객체
                UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

//            5) 리액트로 보낼 dto 생성
                MemberRes memberRes = new MemberRes(jwt,userDetails.getUserId(),userDetails.getUsername(),userDetails.getAuthority().toString());

                return new ResponseEntity<>(memberRes,HttpStatus.OK);
            }
            else return new ResponseEntity<>("토큰 정보 못받아왔어용",HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.OK);
        }

    }
}
