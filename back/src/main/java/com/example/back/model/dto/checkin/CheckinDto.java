package com.example.back.model.dto.checkin;

/**
 * packageName : com.example.back.model.dto
 * fileName : checkin
 * author : GGG
 * date : 2023-11-27
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-27         GGG          최초 생성
 */
public interface CheckinDto {
    String getCheckId();

    Integer getAirlineReservationNumber();
    String getAdultCount();
    String getChildCount();
    String getCheckYn();
    Integer getOperationId();
    String getStartAirport();
    String getFinalAirport();



}