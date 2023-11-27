package com.example.back.service.notice;

import com.example.back.model.entity.notice.Notice;
import com.example.back.repository.notice.NoticeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * packageName : com.example.back.service.notice
 * fileName : NoticeService
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
@Service
public class NoticeService {

    @Autowired
    NoticeRepository noticeRepository;

//    noticeId 내림차순 전체 조회
    public List<Notice> noticeIdDesc() {
        List<Notice> list = noticeRepository.noticeIdDesc();

        return list;
    }

//    noticeTitle like 검색
    public List<Notice> findAllByNoticeTitleContaining(String noticeTitle) {
        List<Notice> list = noticeRepository.findAllByNoticeTitleContaining(noticeTitle);

        return list;
    }
}
