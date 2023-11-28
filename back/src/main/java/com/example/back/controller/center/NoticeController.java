package com.example.back.controller.center;


import com.example.back.model.entity.center.Notice;
import com.example.back.service.center.NoticeService;
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
@RequestMapping("/api/notice")
public class NoticeController {

    @Autowired
    NoticeService noticeService; // DI


    // 전체 조회
    @GetMapping("/notice")
    public ResponseEntity<Object> findAllByContaining(
            @RequestParam(defaultValue = "title") String searchSelect,
            @RequestParam(defaultValue = "") String searchKeyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size
    ) {
        try {
            Pageable pageable = PageRequest.of(page, size);

            Page<Notice> noticePage; // customer 페이지 정의

            if(searchSelect.equals("title")) {
                //            fullName like 검색
                noticePage
                        = noticeService.findAllByNoticeTitleContaining(searchKeyword, pageable);
            } else {
                //            email like 검색
                noticePage
                        = noticeService.findAllByNoticeContentContaining(searchKeyword, pageable);
            }

//          리액트 전송 : 부서배열 , 페이징정보 [자료구조 : Map<키이름, 값>]
            Map<String, Object> response = new HashMap<>();
            response.put("notice", noticePage.getContent()); // 부서배열
            response.put("currentPage", noticePage.getNumber()); // 현재페이지번호
            response.put("totalItems", noticePage.getTotalElements()); // 총건수(개수)
            response.put("totalPages", noticePage.getTotalPages()); // 총페이지수

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

    //    저장 함수
    @PostMapping("/notice")
    public ResponseEntity<Object> create(@RequestBody Notice notice) {

        try {
            Notice notice2 = noticeService.save(notice); // db 저장

            return new ResponseEntity<>(notice2, HttpStatus.OK);
        } catch (Exception e) {
//            DB 에러가 났을경우 : INTERNAL_SERVER_ERROR 프론트엔드로 전송
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    //    수정 함수
    @PutMapping("/notice/{noticeId}")
    public ResponseEntity<Object> update(
            @PathVariable int noticeId,
            @RequestBody Notice notice) {

        try {
            Notice notice2 = noticeService.save(notice); // db 수정

            return new ResponseEntity<>(notice2, HttpStatus.OK);
        } catch (Exception e) {
//            DB 에러가 났을경우 : INTERNAL_SERVER_ERROR 프론트엔드로 전송
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 상세조회
    @GetMapping("/notice/{noticeId}")
    public ResponseEntity<Object> findById(@PathVariable int noticeId) {

        try {
//            상세조회 실행
            Optional<Notice> optionalNotice = noticeService.findById(noticeId);

            if (optionalNotice.isPresent()) {
//                성공
                return new ResponseEntity<>(optionalNotice.get(), HttpStatus.OK);
            } else {
//                데이터 없음
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
//            서버 에러
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 삭제함수
    @DeleteMapping("/notice/deletion/{noticeId}")
    public ResponseEntity<Object> delete(@PathVariable int noticeId) {

//        프론트엔드 쪽으로 상태정보를 보내줌
        try {
//            삭제함수 호출
            boolean bSuccess = noticeService.removeById(noticeId);

            if (bSuccess == true) {
//                delete 문이 성공했을 경우
                return new ResponseEntity<>(HttpStatus.OK);
            }
//            delete 실패했을 경우( 0건 삭제가 될경우 )
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
//            DB 에러가 날경우
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
