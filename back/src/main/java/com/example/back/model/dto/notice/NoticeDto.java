package com.example.back.model.dto.notice;

import javax.swing.plaf.PanelUI;

/**
 * packageName : com.example.back.model.dto.notice
 * fileName : NoticeDto
 * author : GGG
 * date : 2023-11-28
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-28         GGG          최초 생성
 */
public interface NoticeDto {
    public Integer getNoticeId();

    public String getNoticeTitle();

    public String getNoticeContent();

    public String getNoticeWriter();

    public String getMemberId();

    public String getInsertTime();

    public String getUpdateTime();

    public String getMemberName();
}
