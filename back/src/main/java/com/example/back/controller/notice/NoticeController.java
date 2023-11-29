package com.example.back.controller.notice;



import com.example.back.model.dto.notice.NoticeDto;
import com.example.back.service.notice.NoticeService;
import lombok.extern.slf4j.Slf4j;
import com.example.back.model.entity.notice.Notice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

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
    public ResponseEntity<Object> getNoticeAll(
            @RequestParam(defaultValue = "noticeTitle") String searchSelect,
            @RequestParam(defaultValue = "") String searchKeyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size
    ) {
        try {
            Pageable pageable = PageRequest.of(page, size);

            Page<NoticeDto> noticePage; // customer 페이지 정의

            if(searchSelect.equals("noticeTitle")) {
                //            fullName like 검색
                noticePage = noticeService.noticeIdDescTitle(searchKeyword, pageable);
            } else {
                //            email like 검색
                noticePage = noticeService.noticeIdDescContent(searchKeyword, pageable);
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

//    관리자 페이지 공지사항 전체 조회 + like 검색
    @GetMapping("/admin")
    public ResponseEntity<Object> adminNoticeIdDesc(
            @RequestParam(defaultValue = "") String noticeTitle,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size
    ){
        try {
            Pageable pageable = PageRequest.of(page, size);
//            전체 조회 + like 검색
            Page<NoticeDto> noticePage = noticeService.adminNoticeIdDesc(noticeTitle, pageable);

//          리액트 전송 : 부서배열 , 페이징정보 [자료구조 : Map<키이름, 값>]
            Map<String , Object> response = new HashMap<>();
            response.put("notice", noticePage.getContent()); // 부서배열
            response.put("currentPage", noticePage.getNumber()); // 현재페이지번호
            response.put("totalItems", noticePage.getTotalElements()); // 총건수(개수)
            response.put("totalPages", noticePage.getTotalPages()); // 총페이지수

            if (response.isEmpty() == false) {
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

//    저장
    @PostMapping("/admin/write-notice")
    public ResponseEntity<Object> createNotice(
            @RequestBody Notice notice
    ) {
        try {
            Notice notice2 = noticeService.save(notice);

            return new ResponseEntity<>(notice2, HttpStatus.OK);
        } catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//    수정
    @PutMapping("/admin/write-notice/edit/{noticeId}")
    public ResponseEntity<Object> updateNotice(
            @PathVariable int noticeId,
            @RequestBody Notice notice
    ) {
        try {

            Notice notice2 = noticeService.save(notice);

            return new ResponseEntity<>(notice2, HttpStatus.OK);

        } catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

//    삭제
    @DeleteMapping("/admin/write-notice/delete/{noticeId}")
    public ResponseEntity<Object> deleteNotice(
            @PathVariable int noticeId
    ) {
        try {
            boolean bSuccess = noticeService.removeById(noticeId);
            if (bSuccess == true) {
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

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
}
