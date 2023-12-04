package com.example.back.service.payment;

import com.example.back.model.dto.payment.PaymentAdminDto;
import com.example.back.model.dto.payment.TossPaymentDto;
import com.example.back.model.entity.auth.Member;
import com.example.back.model.entity.payment.Payment;
import com.example.back.model.entity.reserve.Reservation;
import com.example.back.repository.payment.PaymentRepository;
import com.example.back.repository.reserve.ReservationRepository;
import com.example.back.service.auth.UserService;
import com.example.back.service.baggage.BaggageService;
import com.example.back.service.checkin.CheckinService;
import com.example.back.service.reserve.ReservationService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Optional;

@Service
@Slf4j
public class PaymentService {
    @Autowired
    PaymentRepository paymentRepository;

    @Autowired
    ReservationService reservationService;

    @Autowired
    UserService userService;

    @Autowired
    CheckinService checkinService;

    @Autowired
    BaggageService baggageService;

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

    public Page<Payment> selectAllByMemberId(String memberId, Pageable pageable) {
        return paymentRepository.selectAllByMemberId(memberId, pageable);
    }

    public Optional<Payment> findById(int payId) {
        return paymentRepository.findById(payId);
    }

    @Transactional
    public boolean deleteById(int payId) {
        Optional<Payment> optional = paymentRepository.findById(payId);
        try {
            if (optional.isPresent()) {
                Payment payment = optional.get();
                String startNumber = payment.getStartReservationNumber();
                String finalNumber = payment.getFinalReservationNumber();

                checkinService.deleteByReserverNumber(Integer.parseInt(startNumber));
                checkinService.deleteByReserverNumber(Integer.parseInt(finalNumber));

                baggageService.deleteByReserveNumber(Integer.parseInt(startNumber));
                baggageService.deleteByReserveNumber(Integer.parseInt(finalNumber));

                log.info("항공정보 : "+startNumber + " - "+finalNumber);
                Optional<Reservation> reservation = reservationService.findById(Integer.parseInt(startNumber));
                if (reservation.get().getMemberYn().equals("Y")) {
                Optional<Member> member = userService.findById(reservation.get().getMemberId());
                if (payment.getMilePrice() > 0) member.get().setMemberMile(member.get().getMemberMile() + payment.getMilePrice());
                else member.get().setMemberMile(member.get().getMemberMile() - (int)Math.floor(payment.getProductPrice()/10));

                }
                boolean isDeletefinal = reservationService.delete(Integer.parseInt(finalNumber));
                boolean isDeleteStart = reservationService.delete(Integer.parseInt(startNumber));
                log.info("삭제 정보 : "+ isDeletefinal + " - " + isDeleteStart);

                if (isDeletefinal && isDeleteStart) {

                    paymentRepository.deleteById(payId);
                } else {
                    return false;
                }
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {


        return false;
        }
    }

    public Page<PaymentAdminDto> getAll(Pageable pageable) {
        return paymentRepository.findAllByOrderByInsertTimeDesc(pageable);

    }

    public Page<Payment> selectAllByMemberIdAndPayId(String memberId, int payId, Pageable pageable) {
        return paymentRepository.selectAllByMemberIdAndPayId(memberId, payId, pageable);
    }

    public Page<PaymentAdminDto> selectAllAndPayId(int payId, Pageable pageable) {
        return paymentRepository.findAllByPayIdOrderByInsertTimeDesc(payId, pageable);
    }




}
