package com.example.back.controller.boardingPass;
import com.example.back.model.dto.boardingPass.BoardingPassDto;
import com.example.back.model.entity.boardingPass.BoardingPass;
import com.example.back.service.boardingpPass.BoardingPassService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

/**
 * packageName : com.example.back.controller.boardingPass
 * fileName : BoardingPassController
 * author : GGG
 * date : 2023-11-30
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-30         GGG          최초 생성
 */

@Slf4j
@RestController
@RequestMapping("/api/tour")
public class BoardingPassController {
    @Autowired
    BoardingPassService boardingpassService;

    @GetMapping("/boardingpass/{airlineReservationNumber}")
    public ResponseEntity<Object> boardingpass(
            @PathVariable int airlineReservationNumber
    ) {
        try {
            List<BoardingPassDto> boardingpassList
                    = boardingpassService.boardingpass(airlineReservationNumber);

            if (!boardingpassList.isEmpty()) {
                // 성공
                return new ResponseEntity<>(boardingpassList, HttpStatus.OK);
            } else {
                // 데이터 없음
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


//    상세조회
//@GetMapping("/boardingpass/{airlineReservationNumber}")
//public ResponseEntity<Object> findById(@PathVariable int airlineReservationNumber) {
//
//    try {
////            상세조회 실행
//        List<BoardingPass> listBoardingPass = BoardingPassService.findByAirlineReservationNumber(airlineReservationNumber);
//
//        if (!listBoardingPass.isEmpty()) {
////                성공
//            return new ResponseEntity<>(listBoardingPass, HttpStatus.OK);
//        } else {
////                데이터 없음
//            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//        }
//    } catch (Exception e) {
////            서버 에러
//        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//    }
//}

}