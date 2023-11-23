package com.example.back.model.dto;

/**
 * packageName : com.example.back.model.dto
 * fileName : OprResDto
 * author : GGG
 * date : 2023-11-22
 * description : 예약 정보 + 운항 정보 조인
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-22         GGG          최초 생성
 */
public interface OprResDto {

//    Reservation 에서 Operation 정보를 가져오는 Dto
    Integer getAirlineReservationNumber();

    String getAdultCount();

    String getChildCount();

    String getMileUseYn();

    String getSeatType();

    String getMemberYn();

    String getMemberId();

    String getUserNumber();

    Integer getOperationId();

    String getAirline();

    String getFlightName();

    String getStartAirport();

    String getFinalAirport();

    String getStartTime();

    String getFinalTime();

    String getStartDate();

    String getFinalDate();

    String getDomesticInternational();

    Integer getPrice();

    String getMemberName();
}
