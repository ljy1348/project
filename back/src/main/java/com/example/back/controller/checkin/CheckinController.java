package com.example.back.controller.checkin;

import com.example.back.model.dto.checkindto;
import com.example.back.service.checkin.CheckinService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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


    @GetMapping("/checkin/{airlineReservationNumber}")
    public ResponseEntity<Object>  airnumber(
            @PathVariable int airlineReservationNumber
    ){
        try {
            log.info("aaaaaaaaaaaaaaaaaaaa : "+airlineReservationNumber);


            Optional<checkindto> checkinOptional
                    = checkinService.airnumber(airlineReservationNumber);

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


}
