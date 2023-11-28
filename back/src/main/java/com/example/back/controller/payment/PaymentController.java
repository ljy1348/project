package com.example.back.controller.payment;

import com.example.back.model.entity.payment.Payment;
import com.example.back.service.payment.PaymentService;
import lombok.extern.slf4j.Slf4j;
import oracle.ucp.proxy.annotation.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/payment")
public class PaymentController {
    @Autowired
    PaymentService paymentService;

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

            paymentService.create(payment);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }



    }
}
