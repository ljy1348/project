package com.example.back.model.dto;

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
public interface checkindto {
    String getCheckId();
    String seatNumber();
    String getAdultCount();
    String getChildCount();
    Integer getAirlineReservationNumber();
    String getCheckYn();
    String getMemberYn();

}
