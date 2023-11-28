package com.example.back.controller.searchReservation;

import com.example.back.model.dto.OprResDto;
import com.example.back.model.dto.reserve.ReservationDto;
import com.example.back.model.entity.reserve.Reservation;


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

//    ID 검색
    @GetMapping("/search-reservation/{memberId}")
    public ResponseEntity<Object> getAll(
            @PathVariable String memberId
    ){
        try {
//            전체 조회 + like 검색
            List<ReservationDto> list = searchReservationService.getAll(memberId);

            if (list.isEmpty() == false) {
//                성공
                return new ResponseEntity<>(list, HttpStatus.OK);
            } else {
//                데이터 없음
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

        } catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
//    예약번호 검색
    @GetMapping("/search-reservation")
    public ResponseEntity<Object> getSearchReservation(
            @RequestParam(defaultValue = "0") int airlineReservationNumber,
            @RequestParam(defaultValue = "") String memberId
    ){
        try {
//            전체 조회 + like 검색
            List<Reservation> list = searchReservationService.findAllByAirlineReservationNumberAndMemberId(airlineReservationNumber, memberId);

            if (list.isEmpty() == false) {
//                성공
                return new ResponseEntity<>(list, HttpStatus.OK);
            } else {
//                데이터 없음
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

        } catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



//    상세 조회
    @GetMapping("/search-reservation/seeReservation/{airlineReservationNumber}")
    public ResponseEntity<Object> getAirlineReservationNumber(
            @PathVariable int airlineReservationNumber
    ) {
        try {
            Optional<OprResDto> optionalOprResDto = searchReservationService.searchReservation(airlineReservationNumber);

            if(optionalOprResDto.isEmpty() == false) {
                return new ResponseEntity<>(optionalOprResDto.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
