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

    public List<OperationInfo> selectOperationInfo(
            @RequestParam(required = false) String startAirport,
            @RequestParam(required = false) String finalAirport,
            @RequestParam(required = false) String operationDate,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date sysdate){



        return operationInfoService.selectOperationInfo(startAirport, finalAirport, operationDate, sysdate);

    }
}
