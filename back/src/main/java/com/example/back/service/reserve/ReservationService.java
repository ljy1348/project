package com.example.back.service.reserve;

import com.example.back.model.entity.reserve.Reservation;
import com.example.back.repository.reserve.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * packageName : com.example.back.service.reserve
 * fileName : ReservationService
 * author : GGG
 * date : 2023-11-27
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-27         GGG          최초 생성
 */
@Service
public class ReservationService {
    @Autowired
    ReservationRepository reservationRepository; // DI

    //    question like 검색
    public Page<Reservation> findAllByseatTypeContaining(String seatType, Pageable pageable){
        Page<Reservation> page = reservationRepository.findAllByseatTypeContaining(seatType,pageable);

        return page;
    }


    //  전체 조회
    public Page<Reservation> findAll(Pageable pageable){
        Page<Reservation> page = reservationRepository.findAll(pageable);
        return page;
    }



    //    저장 함수(수정함수)
    public Reservation save(Reservation reservation) {

        Reservation reservation2 = reservationRepository.save(reservation);

        return reservation2;
    }


}