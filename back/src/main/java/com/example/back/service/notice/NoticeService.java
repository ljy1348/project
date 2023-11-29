package com.example.back.service.notice;

import com.example.back.model.dto.notice.NoticeDto;
import com.example.back.model.entity.notice.Notice;

import com.example.back.repository.notice.NoticeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

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

    //    관리자 페이지 공지사항 전체 조회 + like 검색
    public Page<NoticeDto> adminNoticeIdDesc(String noticeTitle, Pageable pageable) {
        Page<NoticeDto> page = noticeRepository.adminNoticeIdDesc(noticeTitle, pageable);

        return page;
    }

    //    저장(수정)
    public Notice save(Notice notice) {
        Notice notice2 = noticeRepository.save(notice);

        return notice2;
    }

    //    삭제
    public boolean removeById(Integer noticeId) {

//      existsById : jpa 함수 - 리턴값: 있으면 true, 없으면 false
        if (noticeRepository.existsById(noticeId)) {
            noticeRepository.deleteById(noticeId); // DB 삭제(dno)
            return true;
        }
        return false;
    }

    /// title 검색
    public Page<NoticeDto> noticeIdDescTitle(String noticeTitle, Pageable pageable) {
        Page<NoticeDto> page
                = noticeRepository.noticeIdDescTitle(noticeTitle, pageable);

        return page;
    }

    // content like 검색
    public Page<NoticeDto> noticeIdDescContent(String noticeContent, Pageable pageable) {
        Page<NoticeDto> page
                = noticeRepository.noticeIdDescContent(noticeContent, pageable);

        return page;
    }


    //    상세조회(1건조회)
    public Optional<Notice> findById(int noticeId) {
        Optional<Notice> optionalNotice
                = noticeRepository.findById(noticeId);

        return optionalNotice;
    }
}
