package com.example.back.controller.notice;


import com.example.back.service.notice.NoticeService;
import lombok.extern.slf4j.Slf4j;
import com.example.back.model.entity.notice.Notice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


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

//    저장
    @PostMapping("/write-notice")
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
    @PutMapping("/write-notice/edit/{noticeId}")
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
    @DeleteMapping("/write-notice/delete/{noticeId}")
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
}
