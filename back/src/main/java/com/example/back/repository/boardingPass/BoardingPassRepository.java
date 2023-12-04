package com.example.back.repository.boardingPass;

import com.example.back.model.dto.boardingPass.BoardingPassDto;
import com.example.back.model.dto.checkin.CheckinDto;
import com.example.back.model.entity.boardingPass.BoardingPass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

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
    @Query(value = "SELECT " +
            "       RES.AIRLINE_RESERVATION_NUMBER as airlineReservationNumber " +
            "      ,RES.SEAT_TYPE as seatType " +
            "      ,CHI.SEAT_NUMBER as seatNumber " +
            " FROM TB_RESERVATION RES, " +
            "      TB_CHECKIN CHI " +
            " WHERE RES.AIRLINE_RESERVATION_NUMBER = CHI.AIRLINE_RESERVATION_NUMBER " +
            " AND RES.AIRLINE_RESERVATION_NUMBER = :airlineReservationNumber "
            , nativeQuery = true)
    List<BoardingPassDto> boardingpass(@Param("airlineReservationNumber") int airlineReservationNumber);

//    @Query(value = "SELECT " +
//            "       RES.AIRLINE_RESERVATION_NUMBER as airlineReservationNumber " +
//            "      ,RES.SEAT_TYPE as seatType " +
//            "      ,CHI.SEAT_NUMBER as seatNumber " +
//            " FROM TB_RESERVATION RES, " +
//            "      CHECKIN CHI " +
//            " WHERE RES.AIRLINE_RESERVATION_NUMBER = CHI.AIRLINE_RESERVATION_NUMBER " +
//            " AND RES.AIRLINE_RESERVATION_NUMBER = :airlineReservationNumber "
//            , nativeQuery = true)
//    List<BoardingPass> findByAirlineReservationNumber(@Param("airlineReservationNumber") int airlineReservationNumber);



}




