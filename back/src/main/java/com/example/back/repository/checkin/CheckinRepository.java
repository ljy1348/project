package com.example.back.repository.checkin;


import com.example.back.model.checkin.Checkin;
import com.example.back.model.dto.checkin.checkindto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;


/**
 * packageName : com.example.back.repository.checkin
 * fileName : CheckinRepository
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
public interface CheckinRepository extends JpaRepository<Checkin, String> {
    @Query(value = "SELECT " +
            "       RES.AIRLINE_RESERVATION_NUMBER as airlineReservationNumber " +
            "      ,RES.ADULT_COUNT as adultCount " +
            "      ,RES.CHILD_COUNT as childCount " +
            "      ,RES.CHECK_YN as checkYn " +
            "      ,OPR.OPERATION_ID as operationId " +
            "      ,OPR.START_AIRPORT as startAirport " +
            "      ,OPR.FINAL_AIRPORT as finalAirport " +
            "      FROM TB_RESERVATION RES, " +
            "           TB_OPERATION_INFO OPR " +
            "     WHERE RES.OPERATION_ID = OPR.OPERATION_ID " +
            "     AND RES.AIRLINE_RESERVATION_NUMBER = :airlineReservationNumber "
            , nativeQuery = true)
    Optional<checkindto> checkresnum(@Param("airlineReservationNumber")int airlineReservationNumber);
}