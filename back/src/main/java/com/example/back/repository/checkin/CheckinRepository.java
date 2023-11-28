package com.example.back.repository.checkin;


import com.example.back.model.entity.checkin.Checkin;
import com.example.back.model.dto.checkindto;
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
    @Query(value = "SELECT CHI.CHECK_ID as checkId " +
            "     , RES.CHECK_YN as checkYn " +
            "     , RES.ADULT_COUNT as adultCount " +
            "     , RES.CHILD_COUNT as childCount " +
            "      , RES.MEMBER_Yn as memberYn "  +
            "     , RES.AIRLINE_RESERVATION_NUMBER as airlineReservationNumber " +
            "FROM TB_CHECKIN CHI, TB_RESERVATION RES " +
            "WHERE CHI.AIRLINE_RESERVATION_NUMBER = RES.AIRLINE_RESERVATION_NUMBER " +
            "AND RES.AIRLINE_RESERVATION_NUMBER LIKE '%' || :airlineReservationNumber || '%' ", countQuery = "SELECT COUNT(*) "+
            "FROM TB_CHECKIN CHI, TB_RESERVATION RES " +
            "WHERE CHI.AIRLINE_RESERVATION_NUMBER = RES.AIRLINE_RESERVATION_NUMBER " +
            "AND RES.AIRLINE_RESERVATION_NUMBER LIKE '%' || :airlineReservationNumber || '%' ", nativeQuery = true)
        //    dname like : 쿼리메소드 + 페이징(리턴:Page, 매개변수:Pageable)
    Optional<checkindto> airnumber(@Param("airlineReservationNumber")int airlineReservationNumber);
}
