package com.example.back.model.dto.reserve;

/**
 * packageName : com.example.back.model.dto.reserve
 * fileName : ReservationDto
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
public interface ReservationDto {
    public Integer getAirlineReservationNumber();

    public String getAdultCount();

    public String getChildCount();

    public String getMileUseYn();

    public String getSeatType();

    public String getMemberYn();

    public String getCheckYn();

    public String getMemberId();

    public String getUserNumber();

    public String getOperationId();

    public String getMemberName();

    public String getMemberEname();
}
