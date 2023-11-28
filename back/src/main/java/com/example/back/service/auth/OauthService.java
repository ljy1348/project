package com.example.back.service.auth;

import com.example.back.model.dto.auth.oauth.google.GoogleIdDto;
import com.example.back.model.dto.auth.oauth.google.GoogleTokenDto;
import com.example.back.model.dto.auth.oauth.kakao.KakaoIdDto;
import com.example.back.model.dto.auth.oauth.kakao.KakaoTokenDto;
import com.example.back.model.dto.auth.oauth.naver.NaverInfoDto;
import com.example.back.model.dto.auth.oauth.naver.NaverTokenDto;
import com.example.back.model.entity.auth.ERole;
import com.example.back.model.entity.auth.Member;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
public class OauthService {

    @Autowired
    UserService userService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Value("${kakao.api.key}")
    String KAKAO_CLIENT_ID;

    @Value("${naver.client.key}")
    String NAVER_CLIENT_KEY;

    @Value("${naver.secret.key}")
    String NAVER_SECREIT_KEY;

    @Value("${state}")
    String STATE;

    @Value("${google.client.id}")
    String GOOGLE_CLIENT_ID;

    @Value("${google.client.secret}")
    String GOOGLE_CLIENT_SECRET;

//    카카오 액세스 토큰 발급받기
    @Transactional
    public KakaoTokenDto getKakaoAccessToken(String code) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // Http Response Body 객체 생성
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code"); //카카오 공식문서 기준 authorization_code 로 고정
        params.add("client_id", KAKAO_CLIENT_ID); // 카카오 Dev 앱 REST API 키
        params.add("redirect_uri", "http://localhost:3000/login/auth/kakao"); // 카카오 Dev redirect uri
        params.add("code", code); // 프론트에서 인가 코드 요청시 받은 인가 코드값

        // 헤더와 바디 합치기 위해 Http Entity 객체 생성
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(params, headers);

        // 카카오로부터 Access token 받아오기
        RestTemplate rt = new RestTemplate();
        ResponseEntity<String> accessTokenResponse = rt.exchange(
                "https://kauth.kakao.com/oauth/token",
                HttpMethod.POST,
                kakaoTokenRequest,
                String.class
        );
        // JSON Parsing (-> KakaoTokenDto)
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        KakaoTokenDto kakaoTokenDto = null;
        try {
            kakaoTokenDto = objectMapper.readValue(accessTokenResponse.getBody(), KakaoTokenDto.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return kakaoTokenDto;
    }

//    액세스 토큰으로 유저 정보 가져오기
    public Member getKakaoInfo(String kakaoAccessToken) {
        RestTemplate rt = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + kakaoAccessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        HttpEntity<MultiValueMap<String, String>> accountInfoRequest = new HttpEntity<>(headers);

        // POST 방식으로 API 서버에 요청 후 response 받아옴
        ResponseEntity<String> accountInfoResponse = rt.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.POST,
                accountInfoRequest,
                String.class
        );
        // JSON Parsing (-> kakaoAccountDto)
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        KakaoIdDto kakaoIdDto = null;
        try {
            kakaoIdDto = objectMapper.readValue(accountInfoResponse.getBody(), KakaoIdDto.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        // 회원가입 처리하기
        String kakaoId = kakaoIdDto.getId();
        kakaoId = kakaoId+"@kakao.oauth";
        Optional<Member> optionalUser = userService.findById(kakaoId);
        if (optionalUser.isPresent()) {
            return optionalUser.get();
        } else {

            Member user = new Member(kakaoId, passwordEncoder.encode(UUID.randomUUID().toString()), "", ERole.ROLE_USER);
            return userService.save(user);
        }
    }

//    네이버 액세스 토큰 발급받기
    @Transactional
    public NaverTokenDto getNaverAccessToken(String code) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

//         Http Response Body 객체 생성
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code"); //카카오 공식문서 기준 authorization_code 로 고정
        params.add("client_id", NAVER_CLIENT_KEY); // 카카오 Dev 앱 REST API 키
        params.add("client_secret", NAVER_SECREIT_KEY); // 카카오 Dev redirect uri
        params.add("code", code); // 프론트에서 인가 코드 요청시 받은 인가 코드값
        params.add("state", STATE);


//         헤더와 바디 합치기 위해 Http Entity 객체 생성
        HttpEntity<MultiValueMap<String, String>> naverTokenRequest = new HttpEntity<>(params, headers);
        // 카카오로부터 Access token 받아오기
        RestTemplate rt = new RestTemplate();
        ResponseEntity<String> accessTokenResponse = rt.exchange(
                "https://nid.naver.com/oauth2.0/token",
                HttpMethod.POST,
                naverTokenRequest,
                String.class
        );

        // JSON Parsing (-> KakaoTokenDto)
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        NaverTokenDto naverTokenDto = null;
        log.info(accessTokenResponse.toString());
        try {
            naverTokenDto = objectMapper.readValue(accessTokenResponse.getBody(), NaverTokenDto.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return naverTokenDto;
    }

    //    액세스 토큰으로 유저 정보 가져오기
    public Member getNaverInfo(String naverAccessToken) {
        RestTemplate rt = new RestTemplate();
        log.info("네이버 정보 가져오기1 : "+naverAccessToken);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + naverAccessToken);
        headers.add("Content-type", "application/xml");

        HttpEntity<MultiValueMap<String, String>> accountInfoRequest = new HttpEntity<>(headers);

        log.info("네이버 정보 가져오기2");
        // POST 방식으로 API 서버에 요청 후 response 받아옴
        ResponseEntity<String> accountInfoResponse = rt.exchange(
                "https://openapi.naver.com/v1/nid/me",
                HttpMethod.POST,
                accountInfoRequest,
                String.class
        );
        log.info("네이버 정보 가져오기3 : "+accountInfoResponse.toString());
        // JSON Parsing (-> kakaoAccountDto)
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        NaverInfoDto naverInfoDto = null;
        log.info("네이버 정보 가져오기3");
        try {
            naverInfoDto = objectMapper.readValue(accountInfoResponse.getBody(), NaverInfoDto.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        // 회원가입 처리하기
        String kakaoId = naverInfoDto.getResponse().getId();
        kakaoId = kakaoId+"@naver.oauth";
        Optional<Member> optionalUser = userService.findById(kakaoId);
        if (optionalUser.isPresent()) {
            return optionalUser.get();
        } else {

            Member user = new Member(kakaoId, passwordEncoder.encode(UUID.randomUUID().toString()), "", ERole.ROLE_USER);
            return userService.save(user);
        }
    }

    @Transactional
    public GoogleTokenDto getGoogleAccessToken(String code) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

//         Http Response Body 객체 생성
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code"); //카카오 공식문서 기준 authorization_code 로 고정
        params.add("client_id", GOOGLE_CLIENT_ID); // 카카오 Dev 앱 REST API 키
        params.add("client_secret", GOOGLE_CLIENT_SECRET); // 카카오 Dev redirect uri
        params.add("code", "4/"+code); // 프론트에서 인가 코드 요청시 받은 인가 코드값
        params.add("redirect_uri", "http://localhost:3000/login/auth/google");

//         헤더와 바디 합치기 위해 Http Entity 객체 생성
        HttpEntity<MultiValueMap<String, String>> googleTokenRequest = new HttpEntity<>(params, headers);
        // 카카오로부터 Access token 받아오기
        RestTemplate rt = new RestTemplate();
        ResponseEntity<JsonNode> accessTokenResponse = rt.exchange(
                "https://oauth2.googleapis.com/token",
                HttpMethod.POST,
                googleTokenRequest,
                JsonNode.class
        );

        // JSON Parsing (-> KakaoTokenDto)
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

        String access_token = accessTokenResponse.getBody().get("access_token").asText();
        String token_type = accessTokenResponse.getBody().get("token_type").asText();
        String id_token = accessTokenResponse.getBody().get("id_token").asText();

        GoogleTokenDto googleTokenDto = new GoogleTokenDto(token_type,access_token,id_token);
        log.info(googleTokenDto.toString());


        return googleTokenDto;
    }

    //    액세스 토큰으로 유저 정보 가져오기
    public Member getGoogleInfo(String googleAccessToken) {
        RestTemplate rt = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + googleAccessToken);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("access_token", googleAccessToken); //카카오 공식문서 기준 authorization_code 로 고정

        HttpEntity<MultiValueMap<String, String>> accountInfoRequest = new HttpEntity<>(params, headers);

        log.info("네이버 정보 가져오기2");
        // POST 방식으로 API 서버에 요청 후 response 받아옴


        log.info("네이버 정보 가져오기3 : ");
        ResponseEntity<String> accountInfoResponse = rt.exchange(
                "https://oauth2.googleapis.com/tokeninfo",
                HttpMethod.POST,
                accountInfoRequest,
                String.class
        );
        log.info("E : "+accountInfoResponse.toString());

        // JSON Parsing (-> kakaoAccountDto)
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        GoogleIdDto googleIdDto = null;
        log.info("네이버 정보 가져오기3");
        try {
            googleIdDto = objectMapper.readValue(accountInfoResponse.getBody(), GoogleIdDto.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        // 회원가입 처리하기
        String kakaoId = googleIdDto.getEmail();
        kakaoId = kakaoId+"@google.oauth";
        Optional<Member> optionalUser = userService.findById(kakaoId);
        if (optionalUser.isPresent()) {
            return optionalUser.get();
        } else {
            Member user = new Member(kakaoId, passwordEncoder.encode(UUID.randomUUID().toString()), "", ERole.ROLE_USER);
            return userService.save(user);
        }
    }
}
