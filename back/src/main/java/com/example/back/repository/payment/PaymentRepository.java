package com.example.back.repository.payment;

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
            "and mem.member_id = :memberId order by pay.pay_id desc", countQuery = "select count(pay.pay_id) from TB_PAY_INFORMATION pay, TB_RESERVATION re, TB_MEMBERS_INFO mem\n" +
            "where re.member_id = mem.member_id \n" +
            "and pay.START_RESERVATION_NUMBER = re.AIRLINE_RESERVATION_NUMBER \n" +
            "and mem.member_id = :memberId", nativeQuery = true)
    Page<Payment> selectAllByMemberId(@Param("memberId") String memberId, Pageable pageable);
}
