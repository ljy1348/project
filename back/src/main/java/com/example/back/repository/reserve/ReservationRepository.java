package com.example.back.repository.reserve;

import com.example.back.model.entity.reserve.Reservation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * packageName : com.example.back.repository.reserve
 * fileName : ReservationRepository
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
@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Integer> {

    Page<Reservation> findAllByseatTypeContaining(String seatType, Pageable pageable);
}
