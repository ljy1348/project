package com.example.back.repository.checkin;


import com.example.back.model.dto.checkin.CheckgetDto;
import com.example.back.model.entity.checkin.Checkin;
import com.example.back.model.dto.checkin.CheckinDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
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
    Optional<CheckinDto> airnumber(@Param("airlineReservationNumber")int airlineReservationNumber);

    @Query(value = "select ch.seat_number as seatNumber from TB_CHECKIN ch, TB_RESERVATION re where re.AIRLINE_RESERVATION_NUMBER = ch.AIRLINE_RESERVATION_NUMBER " +
            "and re.operation_id = :operationId", nativeQuery = true)
    List<CheckinDto> getSeats(@Param("operationId") int operationId);

    @Query(value = "SELECT " +
            "       RES.AIRLINE_RESERVATION_NUMBER as airlineReservationNumber " +
            "      ,RES.ADULT_COUNT as adultCount " +
            "      ,RES.CHILD_COUNT as childCount " +
            "      ,RES.CHECK_YN as checkYn " +
            "      ,OPR.OPERATION_ID as operationId " +
            "      ,OPR.START_AIRPORT as startAirport " +
            "      ,OPR.FINAL_AIRPORT as finalAirport " +
            "      FROM TB_RESERVATION RES, " +
            "           OPERATION_INFO OPR " +
            "     WHERE RES.OPERATION_ID = OPR.OPERATION_ID " +
            "     AND RES.AIRLINE_RESERVATION_NUMBER = :airlineReservationNumber "
            , nativeQuery = true)
    Optional<CheckinDto> checkresnum(@Param("airlineReservationNumber")int airlineReservationNumber);


    @Query(value = "SELECT * FROM ( " +
            "    SELECT  " +
            "        chk.seat_number AS seatNumber, " +
            "        nmn.user_name AS userName, " +
            "        nmn.user_number AS userNumber, " +
            "        chk.airline_reservation_number AS airlineReservationNumber, " +
            "        ROW_NUMBER() OVER (PARTITION BY nmn.user_number ORDER BY chk.airline_reservation_number) as rn, " +
            "        DENSE_RANK() OVER (ORDER BY nmn.user_number) as dr " +
            "    FROM  " +
            "        tb_reservation res " +
            "        LEFT JOIN tb_checkin chk ON res.airline_reservation_number = chk.airline_reservation_number " +
            "        JOIN ( " +
            "            WITH id_values AS ( " +
            "                SELECT REGEXP_SUBSTR(( " +
            "                    SELECT user_number FROM tb_reservation  " +
            "                    WHERE airline_reservation_number = :airlineReservationNumber " +
            "                    ), '[^,]+', 1, LEVEL) AS id " +
            "                FROM dual " +
            "                CONNECT BY REGEXP_SUBSTR(( " +
            "                    SELECT user_number FROM tb_reservation  " +
            "                    WHERE airline_reservation_number = :airlineReservationNumber " +
            "                    ), '[^,]+', 1, LEVEL) IS NOT NULL " +
            "            ) " +
            "            SELECT * " +
            "            FROM tb_non_members_info " +
            "            WHERE user_number IN (SELECT id FROM id_values) " +
            "        ) nmn ON res.user_number LIKE '%' || nmn.user_number || '%' and res.member_id = :memberId" +
            ")  " +
            "WHERE rn = dr "
            , nativeQuery = true)
    List<CheckgetDto> check(@Param("airlineReservationNumber")int airlineReservationNumber, String memberId);

    Page<Checkin> findAllByCheckId(int checkId, Pageable pageable);
    Page<Checkin> findAllByAirlineReservationNumber(int airlineReservationNumber, Pageable pageable);
    Page<Checkin> findAllByPassportId(int passportId, Pageable pageable);
    Page<Checkin> findAllByOrderByInsertTime(Pageable pageable);

    @Query(value = "select * from tb_checkin order by insert_time desc", nativeQuery = true)
    Page<Checkin> selectAllDesc(Pageable pageable);

    List<Checkin> findAllByAirlineReservationNumber(int airlineReservationNumber);



    @Transactional
    @Modifying
    @Query(value = "update tb_checkin set delete_yn='Y' where airline_reservation_number = :reserveNumber", nativeQuery = true)
    void deleteByReserveNumber(@Param("reserveNumber") int reserveNumber);
}
