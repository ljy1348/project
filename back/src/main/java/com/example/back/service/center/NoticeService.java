package com.example.back.service.center;

import com.example.back.model.entity.center.Notice;
import com.example.back.repository.center.NoticeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class NoticeService {

    @Autowired
    NoticeRepository noticeRepository; // DI

    // title 검색
    public Page<Notice> findAllByNoticeTitleContaining(String title, Pageable pageable) {
        Page<Notice> page
                = noticeRepository.findAllByNoticeTitleContaining(title, pageable);

        return page;
    }

    // content like 검색
    public Page<Notice> findAllByNoticeContentContaining(String content, Pageable pageable) {
        Page<Notice> page
                = noticeRepository.findAllByNoticeContentContaining(content, pageable);

        return page;
    }

    //    저장함수(수정함수)
    public Notice save(Notice notice) {

        Notice notice2 = noticeRepository.save(notice);

        return notice2;
    }

    //    상세조회(1건조회)
    public Optional<Notice> findById(int noticeId) {
        Optional<Notice> optionalNotice
                = noticeRepository.findById(noticeId);

        return optionalNotice;
    }

    //    삭제함수
    public boolean removeById(int noticeId) {
        if(noticeRepository.existsById(noticeId)) { // noticeId 있는지 확인
            noticeRepository.deleteById(noticeId); // 삭제 진행
            return true;
        }
        return false;
    }
}
