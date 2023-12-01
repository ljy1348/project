package com.example.back.controller.baggage;

import com.example.back.model.entity.baggage.Baggage;
import com.example.back.service.baggage.BaggageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * packageName : com.example.back.controller.checkin
 * fileName : BaggageController
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
public class BaggageController {
    @Autowired
    BaggageService baggageService; // DI
    // 전체 조회 + bagNumber like 검색
    @GetMapping("/baggage/{airlineReservationPassport}")
    public ResponseEntity<Object> findAllByBagNumberContaining(
            @RequestParam(defaultValue = "") String bagNumber
    ) {
        try {
            // 전체조회(bagNumber="") + like 검색(bagNumber="S")
            List<Baggage> baggageList = baggageService.findAll();

            if (!baggageList.isEmpty()) {
                // 성공
                return new ResponseEntity<>(baggageList, HttpStatus.OK);
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
    @PostMapping("/baggage")
    public ResponseEntity<Object> create(@RequestBody Baggage baggage) {
            log.info("aaaaaaaaaaaaaaa : "+baggage.getAirlineReservationNumber());
        try {
            Baggage baggage2 = baggageService.save(baggage); // db 저장

            return new ResponseEntity<>(baggage2, HttpStatus.OK);
        } catch (Exception e) {
//            DB 에러가 났을경우 : INTERNAL_SERVER_ERROR 프론트엔드로 전송
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/baggage/get/{id}")
    public ResponseEntity<?> findById(@PathVariable int id) {
        log.info("수화물 점검 : "+id);
        try {
        Optional<Baggage> optional = baggageService.findById(id);
        if (optional.isPresent()) {
            return new ResponseEntity<>(optional.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }
}
