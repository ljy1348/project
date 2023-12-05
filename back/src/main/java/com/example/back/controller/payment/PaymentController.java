package com.example.back.controller.payment;

import com.example.back.model.dto.payment.PaymentMemberDto;
import com.example.back.model.entity.auth.Member;
import com.example.back.model.entity.payment.Payment;
import com.example.back.model.entity.reserve.NonMemberInfo;
import com.example.back.model.entity.reserve.Reservation;
import com.example.back.service.EmailService;
import com.example.back.service.auth.UserService;
import com.example.back.service.payment.PaymentService;
import com.example.back.service.reserve.NonMemberInfoService;
import com.example.back.service.searchReservation.SearchReservationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/api/payment")
@Scope("prototype")
public class PaymentController {
    @Autowired
    PaymentService paymentService;

    @Autowired
    SearchReservationService searchReservationService;

    @Autowired
    UserService userService;

    @Autowired
    EmailService emailService;

    @Autowired
    NonMemberInfoService nonMemberInfoService;

    @PostMapping("")
    public ResponseEntity<?> create(
            @RequestParam String orderId,
            @RequestParam String paymentKey,
            @RequestParam int amount
    ) {
        try {
            Payment payment = new Payment();
            payment.setCertifiedId(paymentKey);
            payment.setProductCode(orderId);
            String[] tempStr = orderId.split("-");
            payment.setProductPrice(amount);
            payment.setStartReservationNumber(tempStr[0]);
            payment.setFinalReservationNumber(tempStr[1]);

            String reserveName = "";
            String userMail = "";

            Optional<Reservation> searchReservation1 = searchReservationService.findById(Integer.parseInt(tempStr[1]));
            if (searchReservation1.get().getMemberYn().equals("Y")) {
            Optional<Member> member = userService.findById(searchReservation1.get().getMemberId());
            member.get().setMemberMile(member.get().getMemberMile() + (int)Math.floor(amount/10));
            reserveName = member.get().getMemberName();
            userMail = member.get().getMemberEmail();
            } else if(!searchReservation1.get().getUserNumber().isEmpty()) {
                String[] userNumber = searchReservation1.get().getUserNumber().split(",");
                Optional<NonMemberInfo> nonMemberInfoOptional = nonMemberInfoService.findById(Integer.parseInt(userNumber[0]));
                reserveName = nonMemberInfoOptional.get().getUserName();
                userMail = nonMemberInfoOptional.get().getUserEmail();
            }

            Payment payment1 = paymentService.create(payment);

            String emailMsg = "출발 예약 번호 : "+tempStr[0]+"\n도착 예약 번호 : "+tempStr[1]+"\n결제 번호 : "+payment1.getPayId()
            + "\n결제 금액 : "+amount+"원\n예약자 성함 : "+reserveName;

//            emailService.sendSimpleMessage(userMail,"GreenAir 결제 및 예약 내역입니다.",
//                    emailMsg);

            emailService.prepareMessage(userMail, "GreenAir 결제 및 예약 내역입니다.", emailMsg);
            new Thread(emailService).start();

            return new ResponseEntity<>(payment1, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @Transactional
    @PostMapping("/mile")
    public ResponseEntity<?> createMile(
            @RequestParam String orderId,
            @RequestParam String paymentKey,
            @RequestParam int amount
    ) {
        try {
            Payment payment = new Payment();
            payment.setCertifiedId(paymentKey);
            payment.setProductCode(orderId);
            String[] tempStr = orderId.split("-");
            payment.setProductPrice(0);
            payment.setMilePrice(amount);
            payment.setStartReservationNumber(tempStr[0]);
            payment.setFinalReservationNumber(tempStr[1]);


            Optional<Reservation> searchReservation1 = searchReservationService.findById(Integer.parseInt(tempStr[0]));
            Optional<Reservation> searchReservation2 = searchReservationService.findById(Integer.parseInt(tempStr[1]));

            Optional<Member> member = userService.findById(searchReservation1.get().getMemberId());

            member.get().setMemberMile(member.get().getMemberMile() - amount);

            searchReservation1.get().setMileUseYn("Y");
            searchReservation2.get().setMileUseYn("Y");

            Payment payment1 = paymentService.create(payment);

            String emailMsg = "출발 예약 번호 : "+tempStr[0]+"\n도착 예약 번호 : "+tempStr[1]+"\n결제 번호 : "+payment1.getPayId()
                    + "\n결제 금액 : "+amount+"마일리지\n예약자 성함 : "+member.get().getMemberName();

            emailService.prepareMessage(member.get().getMemberEmail(), "GreenAir 결제 및 예약 내역입니다.", emailMsg);
            new Thread(emailService).start();

            return new ResponseEntity<>(payment1, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


    @GetMapping("/{memberId}")
    public ResponseEntity<?> getMemberId(@PathVariable String memberId, Pageable pageable) {
        try {

        Page<PaymentMemberDto> payments = paymentService.selectAllByMemberId(memberId, pageable);

            Map<String, Object> map = new HashMap<>();
            map.put("content", payments.getContent());
            map.put("totalPages", payments.getTotalPages());
            return new ResponseEntity<>(map, HttpStatus.OK);

        } catch (Exception e) {
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }

    @DeleteMapping("/{payId}")
    public ResponseEntity<?> deleteByPayId(@PathVariable int payId) {
        try {
            log.info("페이 아이디 : "+String.valueOf(payId));
            boolean check = paymentService.deleteById(payId);
            if (check) {

            return new ResponseEntity<>(HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{memberId}/{payId}")
    public ResponseEntity<?> selectAllMemberIdAndPayId (@PathVariable String memberId, @PathVariable int payId, Pageable pageable) {
        try {

            Page<PaymentMemberDto> payments = paymentService.selectAllByMemberIdAndPayId(memberId, payId, pageable);

            Map<String, Object> map = new HashMap<>();
            map.put("content", payments.getContent());
            map.put("totalPages", payments.getTotalPages());
            return new ResponseEntity<>(map, HttpStatus.OK);

        } catch (Exception e) {
            log.info(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
