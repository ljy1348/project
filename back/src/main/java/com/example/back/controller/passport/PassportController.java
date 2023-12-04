package com.example.back.controller.passport;

import com.example.back.model.entity.passport.Passport;

import com.example.back.service.passport.PassportService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * packageName : com.example.back.controller.checkin
 * fileName : PassportController
 * author : GGG
 * date : 2023-11-29
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-29         GGG          최초 생성
 */
@Slf4j
@RestController
@RequestMapping("/api/tour")
public class PassportController {
    @Autowired
    PassportService passportService; // DI

    // 전체 조회 + passportId like 검색
    @GetMapping("/passport")
    public ResponseEntity<Object> findAllByPassportIdContaining(
            @RequestParam(defaultValue = "") String passportId
    ) {
        try {
            // 전체조회(passportId="") + like 검색(passportId="S")
            List<Passport> passportList = passportService.findAll();

            if (!passportList.isEmpty()) {
                // 성공
                return new ResponseEntity<>(passportList, HttpStatus.OK);
            } else {
                // 데이터 없음
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //    저장 함수
    @PostMapping("/passport")
    public ResponseEntity<Object> create(@RequestBody List<Passport> passport) {

        try {
            List<Passport> passport2 = passportService.save(passport); // db 저장

            return new ResponseEntity<>(passport2, HttpStatus.OK);
        } catch (Exception e) {
//            DB 에러가 났을경우 : INTERNAL_SERVER_ERROR 프론트엔드로 전송
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}