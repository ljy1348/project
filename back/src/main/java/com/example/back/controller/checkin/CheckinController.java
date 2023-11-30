package com.example.back.controller.checkin;


import com.example.back.model.dto.checkin.checkindto;
import com.example.back.model.entity.checkin.Checkin;

import com.example.back.model.entity.passport.Passport;
import com.example.back.service.checkin.CheckinService;
import com.example.back.service.passport.PassportService;
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
@RequestMapping("/api/tour")
public class CheckinController {
    @Autowired
    CheckinService checkinService; // DI

    @Autowired
    PassportService passportService;

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




    @GetMapping("/checkin/sheat/{operaionId}")
    public ResponseEntity<?> getSheat(@PathVariable int operaionId) {
        try {
            List<checkindto> list = checkinService.getSheat(operaionId);
            return new ResponseEntity<>(list, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    //    checkin 사용
//    @GetMapping("/checkin")
//    public ResponseEntity<Object> find(@RequestParam(defaultValue = "") Integer airlineReservationNumber,
//                                       @RequestParam(defaultValue = "0") int page,
//                                       @RequestParam(defaultValue = "3") int size) {
//        try {
////            페이지 변수 저장(page: 현재페이지번호, size: 1페이지당 개수)
////            함수 매개변수: Pageable(위의 값을 넣기)
////            사용법 : Pageable pageable = PageRequest.of(현재페이지번호,1페이지당 개수)
//            Pageable pageable = PageRequest.of(page, size);
//
////          전체조회(dname="") + like 검색(dname="S")
//            Page<Checkin> checkinPage = checkinService.findAllByAirlineReservationNumberContaining(airlineReservationNumber, pageable);
//
////          리엑트 전송 : 부서배열, 페이징 정보[자료구조 : Map<키이름, 값>]
//            Map<String, Object> response = new HashMap<>();
//            response.put("checkin", checkinPage.getContent());
//            response.put("currentPage", checkinPage.getNumber()); // 현재 페이지 번호
//            response.put("totalItems", checkinPage.getTotalElements()); // 총건수 ( 개수 )
//            response.put("totalPages", checkinPage.getTotalPages()); // 총페이지 수
//            if (checkinPage.isEmpty() == false) {
////                성공
//                return new ResponseEntity<>(response, HttpStatus.OK);
//            } else {
////                데이터 없음
//                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//            }
//
//        } catch (Exception e) {
//            log.debug(e.getMessage());
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//


    //    저장 함수
    @PostMapping("/checkin")
    public ResponseEntity<Object> create(@RequestBody List<Checkin> checkin) {

        try {
            List<Checkin> passport2 = checkinService.save(checkin); // db 저장

            return new ResponseEntity<>(passport2, HttpStatus.OK);
        } catch (Exception e) {
//            DB 에러가 났을경우 : INTERNAL_SERVER_ERROR 프론트엔드로 전송
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



}