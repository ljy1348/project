package com.example.back.repository.payment;

import com.example.back.model.dto.payment.PaymentAdminDto;
import com.example.back.model.entity.payment.Payment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Integer> {

    @Query(value = "select pay.* from TB_PAY_INFORMATION pay, TB_RESERVATION re, TB_MEMBERS_INFO mem\n" +
            "where re.member_id = mem.member_id \n" +
            "and pay.START_RESERVATION_NUMBER = re.AIRLINE_RESERVATION_NUMBER \n" +
            "and mem.member_id = :memberId and pay.delete_yn = 'N' order by pay.pay_id desc", countQuery = "select count(pay.pay_id) from TB_PAY_INFORMATION pay, TB_RESERVATION re, TB_MEMBERS_INFO mem\n" +
            "where re.member_id = mem.member_id \n" +
            "and pay.START_RESERVATION_NUMBER = re.AIRLINE_RESERVATION_NUMBER \n" +
            "and mem.member_id = :memberId and pay.delete_yn = 'N'", nativeQuery = true)
    Page<Payment> selectAllByMemberId(@Param("memberId") String memberId, Pageable pageable);

    @Query(value = "select pay.PAY_ID as payId, pay.CERTIFIED_ID as certifiedId\n" +
            ", pay.PRODUCT_CODE as productCode, pay.product_price as productPrice,\n" +
            "pay.PRODUCT_COUNT as productCount, pay.MILE_PRICE as milePrice, \n" +
            "pay.OPERATION_ID as operationId, pay.START_RESERVATION_NUMBER as startReservationNumber,\n" +
            "pay.DELETE_YN as deleteYn, pay.FINAL_RESERVATION_NUMBER as finalReservationNumber\n" +
            ", re.member_id as memberId \n" +
            "from TB_PAY_INFORMATION pay, TB_RESERVATION re \n" +
            "where pay.START_RESERVATION_NUMBER = re.AIRLINE_RESERVATION_NUMBER order by pay.INSERT_TIME desc", countQuery = "select count(pay.pay_id) " +
            "from TB_PAY_INFORMATION pay, TB_RESERVATION re \n" +
            "where pay.START_RESERVATION_NUMBER = re.AIRLINE_RESERVATION_NUMBER", nativeQuery = true)
    Page<PaymentAdminDto> findAllByOrderByInsertTimeDesc(Pageable pageable);

    @Query(value = "select pay.* from TB_PAY_INFORMATION pay, TB_RESERVATION re, TB_MEMBERS_INFO mem\n" +
            "where re.member_id = mem.member_id \n" +
            "and pay.START_RESERVATION_NUMBER = re.AIRLINE_RESERVATION_NUMBER \n" +
            "and mem.member_id = :memberId and pay.delete_yn = 'N' and pay.pay_id = :payId order by pay.pay_id desc", countQuery = "select count(pay.pay_id) from TB_PAY_INFORMATION pay, TB_RESERVATION re, TB_MEMBERS_INFO mem\n" +
            "where re.member_id = mem.member_id \n" +
            "and pay.START_RESERVATION_NUMBER = re.AIRLINE_RESERVATION_NUMBER \n" +
            "and mem.member_id = :memberId and pay.delete_yn = 'N' and pay.pay_id = :payId ", nativeQuery = true)
    Page<Payment> selectAllByMemberIdAndPayId(@Param("memberId") String memberId,@Param("payId") int payId, Pageable pageable);

    @Query(value = "select pay.PAY_ID as payId, pay.CERTIFIED_ID as certifiedId\n" +
            ", pay.PRODUCT_CODE as productCode, pay.product_price as productPrice,\n" +
            "pay.PRODUCT_COUNT as productCount, pay.MILE_PRICE as milePrice, \n" +
            "pay.OPERATION_ID as operationId, pay.START_RESERVATION_NUMBER as startReservationNumber,\n" +
            "pay.DELETE_YN as deleteYn, pay.FINAL_RESERVATION_NUMBER as finalReservationNumber\n" +
            ", re.member_id as memberId \n" +
            "from TB_PAY_INFORMATION pay, TB_RESERVATION re \n" +
            "where pay.START_RESERVATION_NUMBER = re.AIRLINE_RESERVATION_NUMBER and pay.pay_id = :payId order by pay.INSERT_TIME desc", countQuery = "select count(pay.pay_id) " +
            "from TB_PAY_INFORMATION pay, TB_RESERVATION re \n" +
            "where pay.START_RESERVATION_NUMBER = re.AIRLINE_RESERVATION_NUMBER", nativeQuery = true)
    Page<PaymentAdminDto> findAllByPayIdOrderByInsertTimeDesc(@Param("payId") int payId, Pageable pageable);
}
