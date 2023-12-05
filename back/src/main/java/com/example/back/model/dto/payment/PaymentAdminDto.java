package com.example.back.model.dto.payment;

/**
 * packageName : com.example.back.model.dto.payment
 * fileName : PaymentAdminDto
 * author : GGG
 * date : 2023-11-29
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-29         GGG          최초 생성
 */
public interface PaymentAdminDto {
    public int getPayId();
    public String getCertifiedId();
    public String getProductCode();
    public int getProductPrice();
    public int getProductCount();
    public int getOperationId();
    public int getMilePrice();
    public String getStartReservationNumber();
    public String getFinalReservationNumber();
    public String getMemberId();
    public String getDeleteYn();

    public String getUserName();
    public String getStartAirport();
    public String getFinalAirport();
}
