package com.example.back.repository.notice;


import com.example.back.model.dto.notice.NoticeDto;
import com.example.back.model.entity.notice.Notice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * packageName : com.example.back.repository.notice
 * fileName : Notice
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
            "ORDER BY NOTICE_ID DESC ", countQuery = "SELECT COUNT(*) " +
            "FROM TB_NOTICE " +
            "ORDER BY NOTICE_ID DESC ", nativeQuery = true)
    List<Notice> noticeIdDesc();

//    관리자 페이지 공지사항 전체 조회 + like 검색
    @Query(value = "SELECT NTC.NOTICE_ID as noticeId " +
            "     , NTC.NOTICE_TITLE as noticeTitle " +
            "     , NTC.NOTICE_CONTENT as noticeContent " +
            "     , NTC.NOTICE_WRITER as noticeWriter " +
            "     , NTC.MEMBER_ID as memberId " +
            "     , NTC.INSERT_TIME as insertTime " +
            "     , NTC.UPDATE_TIME as updateTime " +
            "     , MEM.MEMBER_NAME as memberName " +
            "FROM TB_NOTICE NTC, TB_MEMBERS_INFO MEM " +
            "WHERE NTC.MEMBER_ID = MEM.MEMBER_ID " +
            "AND NOTICE_TITLE LIKE '%' || :noticeTitle || '%' " +
            "ORDER BY NOTICE_ID DESC "
            , countQuery = "SELECT COUNT(*) " +
            "FROM TB_NOTICE NTC, TB_MEMBERS_INFO MEM " +
            "WHERE NTC.MEMBER_ID = MEM.MEMBER_ID " +
            "AND NOTICE_TITLE LIKE '%' || :noticeTitle || '%' " +
            "ORDER BY NOTICE_ID DESC ", nativeQuery = true)
    Page<NoticeDto> adminNoticeIdDesc(@Param("noticeTitle") String noticeTitle, Pageable pageable);

    // title like 검색
    @Query(value = "SELECT NTC.NOTICE_ID as noticeId " +
            "     , NTC.NOTICE_TITLE as noticeTitle " +
            "     , NTC.NOTICE_CONTENT as noticeContent " +
            "     , NTC.NOTICE_WRITER as noticeWriter " +
            "     , NTC.MEMBER_ID as memberId " +
            "     , NTC.INSERT_TIME as insertTime " +
            "     , NTC.UPDATE_TIME as updateTime " +
            "     , MEM.MEMBER_NAME as memberName " +
            "FROM TB_NOTICE NTC, TB_MEMBERS_INFO MEM " +
            "WHERE NTC.MEMBER_ID = MEM.MEMBER_ID " +
            "AND NOTICE_TITLE LIKE '%' || :noticeTitle || '%' " +
            "ORDER BY NOTICE_ID DESC ", countQuery = "SELECT COUNT(*)" +
            "FROM TB_NOTICE NTC, TB_MEMBERS_INFO MEM " +
            "WHERE NTC.MEMBER_ID = MEM.MEMBER_ID " +
            "AND NOTICE_TITLE LIKE '%' || :noticeTitle || '%' " +
            "ORDER BY NOTICE_ID DESC ", nativeQuery = true)
    Page<NoticeDto> noticeIdDescTitle(@Param("noticeTitle") String noticeTitle, Pageable pageable);

    // content like 검색
    @Query(value = "SELECT NTC.NOTICE_ID as noticeId " +
            "     , NTC.NOTICE_TITLE as noticeTitle " +
            "     , NTC.NOTICE_CONTENT as noticeContent " +
            "     , NTC.NOTICE_WRITER as noticeWriter " +
            "     , NTC.MEMBER_ID as memberId " +
            "     , NTC.INSERT_TIME as insertTime " +
            "     , NTC.UPDATE_TIME as updateTime " +
            "     , MEM.MEMBER_NAME as memberName " +
            "FROM TB_NOTICE NTC, TB_MEMBERS_INFO MEM " +
            "WHERE NTC.MEMBER_ID = MEM.MEMBER_ID " +
            "AND NOTICE_CONTENT LIKE '%' || :noticeContent || '%' " +
            "ORDER BY NOTICE_ID DESC ", countQuery = "SELECT COUNT(*)" +
            "FROM TB_NOTICE NTC, TB_MEMBERS_INFO MEM " +
            "WHERE NTC.MEMBER_ID = MEM.MEMBER_ID " +
            "AND NOTICE_CONTENT LIKE '%' || :noticeContent || '%' " +
            "ORDER BY NOTICE_ID DESC ", nativeQuery = true)
    Page<NoticeDto> noticeIdDescContent(@Param("noticeContent") String noticeContent, Pageable pageable);


}
