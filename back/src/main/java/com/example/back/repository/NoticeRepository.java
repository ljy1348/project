package com.example.back.repository;

import com.example.back.model.entity.notice.Notice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * packageName : repository.notice
 * fileName : NoticeRepository
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
@Repository
public interface NoticeRepository extends JpaRepository<Notice, Integer> {

    //    전체 조회 내림차순
    @Query(value = "SELECT * " +
            "FROM TB_NOTICE " +
            "ORDER BY NOTICE_ID DESC ", countQuery = "SELECT COUNT(*) * " +
            "FROM TB_NOTICE " +
            "ORDER BY NOTICE_ID DESC ", nativeQuery = true)
    List<Notice> noticeIdDesc();

    //    전체 조회 + like 검색
    List<Notice> findAllByNoticeTitleContaining(String noticeTitle);
}
