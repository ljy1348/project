package com.example.back.repository.center;

import com.example.back.model.entity.center.Notice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Integer> {
    // title like 검색
    Page<Notice> findAllByNoticeTitleContaining(String title, Pageable pageable);

    // content like 검색
    Page<Notice> findAllByNoticeContentContaining(String content, Pageable pageable);
}
