package com.example.back.controller.notice;

import com.example.back.model.entity.notice.Notice;
import com.example.back.service.notice.NoticeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * packageName : com.example.back.controller.notice
 * fileName : NoticeController
 * author : GGG
 * date : 2023-11-24
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-24         GGG          최초 생성
 */
@Slf4j
@RestController
@RequestMapping("/api/tour")
public class NoticeController {

    @Autowired
    NoticeService noticeService;

    //    전체 조회 + like 검색
    @GetMapping("/notice")
    public ResponseEntity<Object> getNoticeAll(){
        try {
//            전체 조회 + like 검색
            List<Notice> list = noticeService.noticeIdDesc();

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

////    전체 조회 + like 검색
//    @GetMapping("/notice")
//    public ResponseEntity<Object> getNoticeAll(
//            @RequestParam(defaultValue = "") String noticeTitle){
//        try {
////            전체 조회 + like 검색
//            List<Notice> list = noticeService.findAllByNoticeTitleContaining(noticeTitle);
//
//            if (list.isEmpty() == false) {
////                성공
//                return new ResponseEntity<>(list, HttpStatus.OK);
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
}
