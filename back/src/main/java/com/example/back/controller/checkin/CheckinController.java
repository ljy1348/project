package com.example.back.controller;

import com.example.back.model.checkin.Checkin;
import com.example.back.model.dto.checkindto;
import com.example.back.model.entity.checkin.Passport;
import com.example.back.service.checkin.CheckinService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * packageName : com.example.back.controller
 * fileName : CheckinController
 * author : GGG
 * date : 2023-11-27
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-27         GGG          최초 생성
 */
@Slf4j
@RestController
@RequestMapping("/api")
public class CheckinController {
    @Autowired
    CheckinService checkinService; // DI

    //   전체 조회 + dname like 검색
    @GetMapping("/checkin/{airlineReservationNumber}")
    public ResponseEntity<Object>  checkresnum(
            @PathVariable int airlineReservationNumber
    ){
        try {
            log.info("aaaaaaaaaaaaaaaaaaaa : "+airlineReservationNumber);

            Optional<checkindto> checkinOptional
                    = checkinService.checkresnum(airlineReservationNumber);

            if (checkinOptional.isEmpty() == false) {
//                성공
                return new ResponseEntity<>(checkinOptional, HttpStatus.OK);
            } else {
//                데이터 없음
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        }catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //    저장 함수
    @PostMapping("/")
    public ResponseEntity<Object> create(@RequestBody Passport passport) {

        try {
            Passport passport2 = passportService.save(passport); // db 저장

            return new ResponseEntity<>(passport2, HttpStatus.OK);
        } catch (Exception e) {
//            DB 에러가 났을경우 : INTERNAL_SERVER_ERROR 프론트엔드로 전송
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }




}