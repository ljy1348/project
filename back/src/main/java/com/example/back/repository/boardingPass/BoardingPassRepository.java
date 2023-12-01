package com.example.back.repository.boardingPass;

import com.example.back.model.dto.boardingPass.BoardingPassDto;
import com.example.back.model.entity.boardingPass.BoardingPass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * packageName : com.example.back.repository.boardingpass
 * fileName : BoardingpassRepository
 * author : GGG
 * date : 2023-11-30
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-30         GGG          최초 생성
 */
@Repository
public interface BoardingPassRepository extends JpaRepository<BoardingPass, String> {
    @Query(value = "SELECT CHI.SEAT_NUMBER as seatNumber, " +
            "RES.SEAT_TYPE as seatType, " +
            "RES.CHECK_YN as checkYn, " +
            "RES.AIRLINE_RESERVATION_NUMBER as airlineReservationNumber, " +
            "BAG.BAG_COUNT as bagCount, " +
            "BAG.BAG_YN as bagYn " +
            "FROM TB_CHECKIN CHI, TB_RESERVATION RES, TB_BAGGAGE BAG " +
            "WHERE CHI.AIRLINE_RESERVATION_NUMBER = RES.AIRLINE_RESERVATION_NUMBER " +
            "AND CHI.CHECK_ID = BAG.CHECK_ID " +
            "AND RES.AIRLINE_RESERVATION_NUMBER = :airlineReservationNumber", nativeQuery = true)
    List<BoardingPassDto> boardingpass(@Param("airlineReservationNumber") int airlineReservationNumber);
}
