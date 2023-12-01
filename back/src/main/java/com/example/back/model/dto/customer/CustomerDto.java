package com.example.back.model.dto.customer;

/**
 * packageName : com.example.back.model.dto.customer
 * fileName : CustomerDto
 * author : GGG
 * date : 2023-12-01
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-12-01         GGG          최초 생성
 */
public interface CustomerDto {

    public Integer getTitleId();

    public String getTitle();

    public String getContent();

    public String getAnswerYn();

    public Integer getParentBid();

    public String getAnswer();

    public String getMemberId();

    public String getInsertTime();

    public String getMemberName();
}
