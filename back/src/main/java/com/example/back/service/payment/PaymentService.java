package com.example.back.service.payment;

import com.example.back.model.dto.payment.TossPaymentDto;
import com.example.back.model.entity.payment.Payment;
import com.example.back.repository.payment.PaymentRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Service
@Slf4j
public class PaymentService {
    @Autowired
    PaymentRepository paymentRepository;

    public Payment create(Payment payment) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.tosspayments.com/v1/payments/confirm"))
                .header("Authorization", "Basic dGVzdF9nc2tfZG9jc19PYVB6OEw1S2RtUVhrelJ6M3k0N0JNdzY6")
                .header("Content-Type", "application/json")
                .method("POST", HttpRequest.BodyPublishers.ofString("{\"paymentKey\":\""+payment.getCertifiedId()+"\",\"amount\":50000,\"orderId\":\""+payment.getProductCode()+"\"}"))
                .build();
        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
        log.info("aaaaaaaaaaaaaa : =====================");
        System.out.println(response.body());
        TossPaymentDto tossPaymentDto = objectMapper.readValue(response.body(), TossPaymentDto.class);
        log.info("aaaaaaaaaaaaaa : =====================");

        System.out.println("aaaaa : "+tossPaymentDto.totalAmount);
        } catch (Exception e) {
        log.info("====================================== : "+e.getMessage());
        }


        return paymentRepository.save(payment);
    }
}
