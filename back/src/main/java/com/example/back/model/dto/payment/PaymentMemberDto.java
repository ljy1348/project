package com.example.back.model.dto.payment;

/**
 * packageName : com.example.back.model.dto.payment
 * fileName : PaymentMemberDto
 * author : GGG
 * date : 2023-12-05
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-12-05         GGG          최초 생성
 */
public interface PaymentMemberDto {
    public int getPayId();
    public String getCertifiedId();
    public String getProductCode();
    public int getProductPrice();
    public int getMilePrice();
    public String getStartReservationNumber();
    public String getFinalReservationNumber();

    public String getStartCheckYn();
    public String getFinalCheckYn();
}
