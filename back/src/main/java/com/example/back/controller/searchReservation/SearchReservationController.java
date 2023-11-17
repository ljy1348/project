package com.example.back.controller.searchReservation;

import com.example.back.model.dto.TestDto;
import com.example.back.model.searchReservation.SearchReservation;
import com.example.back.service.searchReservation.SearchReservationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * packageName : com.example.back.controller.searchReservation
 * fileName : SearchReservationController
 * author : GGG
 * date : 2023-11-17
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-17         GGG          최초 생성
 */
@Slf4j
@RestController
@RequestMapping("/api/tour")
public class SearchReservationController {
    @Autowired
    SearchReservationService searchReservationService; // DI

//    airlineReservationNumber like 검색
    @GetMapping("/search-reservation")
    public ResponseEntity<Object> getAirlineReservationNumber(
            @RequestParam(defaultValue = "airlineReservationNumber") String searchSelect, // select 태그 (1) number, (2) id
            @RequestParam(defaultValue = "") String searchKeyword  // 검색어
    ) {
        System.out.println(searchSelect+":"+searchKeyword);
        try {
            log.info("Aa");
            List<SearchReservation> searchReservationList;

            if(searchSelect.equals("airlineReservationNumber")) {
                //            question like 검색
                searchReservationList = searchReservationService.findAllByAirlineReservationNumberContaining(searchKeyword);

            } else {
                //            questioner like 검색
                searchReservationList = searchReservationService.findAllByUserIdContaining(searchKeyword);

            }

            if(searchReservationList.isEmpty() == false) {
                return new ResponseEntity<>(searchReservationList, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //    airlineReservationNumber like 검색
    @GetMapping("/search-reservation2")
    public ResponseEntity<Object> test(
            @RequestParam(defaultValue = "airlineReservationNumber") String searchSelect, // select 태그 (1) number, (2) id
            @RequestParam(defaultValue = "") String searchKeyword  // 검색어
    ) {
        System.out.println(searchSelect+":"+searchKeyword);
        try {
            log.info("Aa");
            List<TestDto> searchReservationList;

            if(searchSelect.equals("airlineReservationNumber")) {
                //            question like 검색
                searchReservationList = searchReservationService.test(searchKeyword);

            } else {
                //            questioner like 검색
                searchReservationList = searchReservationService.test(searchKeyword);

            }

            if(searchReservationList.isEmpty() == false) {
                return new ResponseEntity<>(searchReservationList, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


////    userId like 검색
//    @GetMapping("/search-reservation")
//    public ResponseEntity<Object> getUserId(
//            @RequestParam(defaultValue = "") String userId
//    ) {
//        try {
//            List<SearchReservation> list = searchReservationService.findAllByUserIdContaining(userId);
//            if(list.isEmpty() == false) {
//                return new ResponseEntity<>(HttpStatus.OK);
//            } else {
//                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//            }
//        } catch (Exception e) {
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

//    1건 상세 조회
    @GetMapping("/search-reservation/{airlineReservationNumber}")
    public ResponseEntity<Object> getReservationNumber(
            @PathVariable String airlineReservationNumber){
        try {
//            상세 조회
            Optional<SearchReservation> optionalSearchReservation = searchReservationService.findByAirlineReservationNumber(airlineReservationNumber);

            if (optionalSearchReservation.isEmpty() == false) {
//                성공
                return new ResponseEntity<>(optionalSearchReservation.get(), HttpStatus.OK);
            } else {
//                데이터 없음
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
