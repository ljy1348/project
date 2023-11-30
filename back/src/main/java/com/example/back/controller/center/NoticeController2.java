package com.example.back.controller.center;


//import com.example.back.model.entity.center.Notice2;

import com.example.back.model.dto.notice.NoticeDto;
import com.example.back.model.entity.notice.Notice;
import com.example.back.service.center.NoticeService2;
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
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/api/tour")
public class NoticeController2 {

    @Autowired
    NoticeService2 noticeService; // DI


    // 전체 조회
    @GetMapping("/notice2")
    public ResponseEntity<Object> findAllByContaining(
            @RequestParam(defaultValue = "title") String searchSelect,
            @RequestParam(defaultValue = "") String searchKeyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size
    ) {
        try {
            Pageable pageable = PageRequest.of(page, size);

            Page<NoticeDto> noticePage;

            if (searchSelect.equals("title")) {
                //            title like 검색
                noticePage
                        = noticeService.findAllByNoticeTitleContaining(searchKeyword, pageable);
            } else {
                //            email like 검색
                noticePage
                        = noticeService.findAllByNoticeContentContaining(searchKeyword, pageable);
            }


            Map<String, Object> response = new HashMap<>();
            response.put("notice", noticePage.getContent());
            response.put("currentPage", noticePage.getNumber());
            response.put("totalItems", noticePage.getTotalElements());
            response.put("totalPages", noticePage.getTotalPages());

            if (noticePage.isEmpty() == false) {
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


    // 상세조회
//    @GetMapping("/notice2/{noticeId}")
//    public ResponseEntity<Object> findById(@PathVariable int noticeId) {
//
//        try {
////            상세조회 실행
//            Optional<NoticeDto> optionalNotice = noticeService.findById(noticeId);
//
//            if (optionalNotice.isPresent()) {
////                성공
//                return new ResponseEntity<>(optionalNotice.get(), HttpStatus.OK);
//            } else {
////                데이터 없음
//                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//            }
//        } catch (Exception e) {
////            서버 에러
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }


}
