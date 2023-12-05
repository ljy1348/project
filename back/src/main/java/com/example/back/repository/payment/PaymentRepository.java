package com.example.back.repository.payment;

import com.example.back.model.dto.payment.PaymentAdminDto;
import com.example.back.model.dto.payment.PaymentMemberDto;
import com.example.back.model.entity.payment.Payment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Integer> {

    @Query(value = "select pay.pay_id as payId\n" +
            ", pay.start_reservation_number as startReservationNumber\n" +
            ", pay.final_reservation_number as finalReservationNumber\n" +
            ", pay.mile_price as milePrice\n" +
            ", pay.product_price as productPrice\n" +
            ", re.CHECK_YN as startCheckYn, re2.check_yn as finalCheckYn from TB_PAY_INFORMATION pay, TB_RESERVATION re, TB_MEMBERS_INFO mem, TB_RESERVATION re2\n" +
            "            where re.member_id = mem.member_id \n" +
            "            and pay.START_RESERVATION_NUMBER = re.AIRLINE_RESERVATION_NUMBER \n" +
            "            and pay.final_reservation_number = re2.airline_reservation_number\n" +
            "            and mem.member_id = :memberId and pay.delete_yn = 'N' order by pay.pay_id desc", countQuery = "select count(pay.pay_id) from TB_PAY_INFORMATION pay, TB_RESERVATION re, TB_MEMBERS_INFO mem\n" +
            "where re.member_id = mem.member_id \n" +
            "and pay.START_RESERVATION_NUMBER = re.AIRLINE_RESERVATION_NUMBER \n" +
            "and mem.member_id = :memberId and pay.delete_yn = 'N'", nativeQuery = true)
    Page<PaymentMemberDto> selectAllByMemberId(@Param("memberId") String memberId, Pageable pageable);

    @Query(value = "select pay.PAY_ID as payId, pay.CERTIFIED_ID as certifiedId\n" +
            "            , pay.PRODUCT_CODE as productCode, pay.product_price as productPrice,\n" +
            "            pay.PRODUCT_COUNT as productCount, pay.MILE_PRICE as milePrice, \n" +
            "            pay.OPERATION_ID as operationId, pay.START_RESERVATION_NUMBER as startReservationNumber,\n" +
            "            pay.DELETE_YN as deleteYn, pay.FINAL_RESERVATION_NUMBER as finalReservationNumber\n" +
            "            , re.member_id as memberId \n" +
            "            , nmi.user_name as userName\n" +
            "            , opi.start_airport as startAirport\n" +
            "            , opi.final_airport as finalAirport\n" +
            "            from TB_PAY_INFORMATION pay, (SELECT operation_id, member_id, AIRLINE_RESERVATION_NUMBER, REGEXP_SUBSTR(user_number, '[^,]+', 1, 1) AS user_number\n" +
            "FROM tb_reservation) re , TB_NON_MEMBERS_INFO nmi, operation_info opi\n" +
            "            where pay.START_RESERVATION_NUMBER = re.AIRLINE_RESERVATION_NUMBER and nmi.user_number = re.user_number \n" +
            "            and opi.OPERATION_ID = re.OPERATION_ID \n" +
            "            order by pay.INSERT_TIME desc", countQuery = "select count(pay.pay_id) " +
            "from TB_PAY_INFORMATION pay, (SELECT member_id, AIRLINE_RESERVATION_NUMBER, REGEXP_SUBSTR(user_number, '[^,]+', 1, 1) AS user_number\n" +
            "FROM tb_reservation) re , TB_NON_MEMBERS_INFO nmi\n" +
            "            where pay.START_RESERVATION_NUMBER = re.AIRLINE_RESERVATION_NUMBER and nmi.user_number = re.user_number order by pay.INSERT_TIME desc", nativeQuery = true)
    Page<PaymentAdminDto> findAllByOrderByInsertTimeDesc(Pageable pageable);

    @Query(value = "select pay.pay_id as payId\n" +
            ", pay.start_reservation_number as startReservationNumber\n" +
            ", pay.final_reservation_number as finalReservationNumber\n" +
            ", pay.mile_price as milePrice\n" +
            ", pay.product_price as productPrice\n" +
            ", re.CHECK_YN as startCheckYn, re2.check_yn as finalCheckYn from TB_PAY_INFORMATION pay, TB_RESERVATION re, TB_MEMBERS_INFO mem, TB_RESERVATION re2\n" +
            "            where re.member_id = mem.member_id \n" +
            "            and pay.START_RESERVATION_NUMBER = re.AIRLINE_RESERVATION_NUMBER \n" +
            "            and pay.final_reservation_number = re2.airline_reservation_number\n" +
            "            and mem.member_id = :memberId and pay.delete_yn = 'N' and (pay.start_reservation_number = :payId or pay.final_reservation_number = :payId) order by pay.pay_id desc\n" +
            "     ", nativeQuery = true)
    Page<PaymentMemberDto> selectAllByMemberIdAndPayId(@Param("memberId") String memberId,@Param("payId") int payId, Pageable pageable);

    @Query(value = "select pay.PAY_ID as payId, pay.CERTIFIED_ID as certifiedId\n" +
            ", pay.PRODUCT_CODE as productCode, pay.product_price as productPrice,\n" +
            "pay.PRODUCT_COUNT as productCount, pay.MILE_PRICE as milePrice, \n" +
            "pay.OPERATION_ID as operationId, pay.START_RESERVATION_NUMBER as startReservationNumber,\n" +
            "pay.DELETE_YN as deleteYn, pay.FINAL_RESERVATION_NUMBER as finalReservationNumber\n" +
            ", re.member_id as memberId \n" +
            "from TB_PAY_INFORMATION pay, TB_RESERVATION re \n" +
            "where pay.START_RESERVATION_NUMBER = re.AIRLINE_RESERVATION_NUMBER and (pay.start_reservation_number = :payId or pay.final_reservation_number = :payId) order by pay.INSERT_TIME desc", countQuery = "select count(pay.pay_id) " +
            "from TB_PAY_INFORMATION pay, TB_RESERVATION re \n" +
            "where pay.START_RESERVATION_NUMBER = re.AIRLINE_RESERVATION_NUMBER", nativeQuery = true)
    Page<PaymentAdminDto> findAllByPayIdOrderByInsertTimeDesc(@Param("payId") int payId, Pageable pageable);
}
