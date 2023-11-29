package com.example.back.controller.reserve;

import com.example.back.model.entity.reserve.Reservation;
import com.example.back.service.reserve.ReservationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * packageName : com.example.back.controller.reserve
 * fileName : ReservationController
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
public class ReservationController {

    @Autowired
    ReservationService reservationService;

    //  전체 조회 + dname like 검색
    @GetMapping("/reservation")
    public ResponseEntity<Object> findAllByseatTypeContaining(@RequestParam(defaultValue = "") String seatType,
                                       @RequestParam(defaultValue = "0") int page,
                                       @RequestParam(defaultValue = "3") int size) {
        try {
//            페이지 변수 저장(page: 현재페이지번호, size: 1페이지당 개수)
//            함수 매개변수: Pageable(위의 값을 넣기)
//            사용법 : Pageable pageable = PageRequest.of(현재페이지번호,1페이지당 개수)
            Pageable pageable = PageRequest.of(page, size);

//          전체조회(dname="") + like 검색(dname="S")
            Page<Reservation> deptPage = reservationService.findAllByseatTypeContaining(seatType, pageable);

//          리엑트 전송 : 부서배열, 페이징 정보[자료구조 : Map<키이름, 값>]
            Map<String, Object> response = new HashMap<>();
            response.put("reservation", deptPage.getContent());
            response.put("currentPage", deptPage.getNumber()); // 현재 페이지 번호
            response.put("totalItems", deptPage.getTotalElements()); // 총건수 ( 개수 )
            response.put("totalPages", deptPage.getTotalPages()); // 총페이지 수
            if (deptPage.isEmpty() == false) {
//                성공
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
//                데이터 없음
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

        } catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    //   저장 함수
    @PostMapping("/reservation")
    public ResponseEntity<Object> create(@RequestBody Reservation reservation) {

        try {
            Reservation reservation2 = reservationService.save(reservation);

            return new ResponseEntity<>(reservation2, HttpStatus.OK);
        } catch (Exception e) {
//            DB 에러가 났을경우 : INTERNAL_SERVER_ERROR 프론트엔드로 전송
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
