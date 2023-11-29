package com.example.back.service.reserve;

import com.example.back.model.entity.reserve.Reservation;
import com.example.back.repository.reserve.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

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


    public boolean delete(int id) {
        if (reservationRepository.existsById(id)) {
            reservationRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    //    상세조회(1건조회)
    public Optional<Reservation> findById(int airlineReservaitonNumber) {
        Optional<Reservation> optionalDept
                = reservationRepository.findById(airlineReservaitonNumber);

        return optionalDept;
    }


}
