package com.example.back.controller.reserve;

import com.example.back.model.entity.reserve.OperationInfo;
import com.example.back.service.reserve.OperationInfoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.ZonedDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * packageName : com.example.back.controller.reserve
 * fileName : ReserveController
 * author : GGG
 * date : 2023-11-22
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-22         GGG          최초 생성
 */
@Slf4j
@RestController
@RequestMapping("/api/ksm")
public class ReserveController {

    @Autowired
    OperationInfoService operationInfoService;

    //  전체 조회 + question/questioner like 검색
    @GetMapping("/reserve")

    public ResponseEntity<Object> selectOperationInfo(
            @RequestParam(required = false) String startAirport,
            @RequestParam(required = false) String finalAirport,
            @RequestParam(required = false) String operationDate,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date sysdate,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "4") int size
    ) {
        try {

            Pageable pageable = PageRequest.of(page, size);
            Page<OperationInfo> customerPage = operationInfoService.selectOperationInfo(startAirport,finalAirport,operationDate,sysdate,pageable);


//          리엑트 전송 : 부서배열, 페이징 정보[자료구조 : Map<키이름, 값>]
            Map<String,Object> response = new HashMap<>();
            response.put("operation",customerPage.getContent());       // qna 배열
            response.put("currentPage",customerPage.getNumber()); // 현재 페이지 번호
            response.put("totalItems",customerPage.getTotalElements()); // 총건수 ( 개수 )
            response.put("totalPages",customerPage.getTotalPages()); // 총페이지 수
            if (customerPage.isEmpty() == false) {
//                성공
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
//                데이터 없음
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

        }catch (Exception e){
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }
}
