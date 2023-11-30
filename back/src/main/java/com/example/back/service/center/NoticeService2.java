package com.example.back.service.center;

import com.example.back.model.entity.notice.Notice;
import com.example.back.repository.center.NoticeRepository2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class NoticeService2 {

    @Autowired
    NoticeRepository2 noticeRepository; // DI

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


    //    상세조회(1건조회)
    public Optional<Notice> findById(int noticeId) {
        Optional<Notice> optionalNotice
                = noticeRepository.findById(noticeId);

        return optionalNotice;
    }


}
