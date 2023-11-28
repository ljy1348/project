package com.example.back.repository.searchReservation;

import com.example.back.model.dto.OprResDto;
import com.example.back.model.dto.reserve.ReservationDto;
import com.example.back.model.entity.reserve.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * packageName : com.example.back.repository.SearchReservation
 * fileName : SearchReservationRepository
 * author : GGG
 * date : 2023-11-17
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-17         GGG          최초 생성
 */
@Repository
public interface SearchReservationRepository extends JpaRepository<Reservation, Integer> {
    
//    ID 조회 함수
    @Query(value = "SELECT RES.AIRLINE_RESERVATION_NUMBER as airlineReservationNumber " +
            "     , RES.ADULT_COUNT as adultCount " +
            "     , RES.CHILD_COUNT as childCount " +
            "     , RES.MILE_USE_YN as mileUseYn " +
            "     , RES.SEAT_TYPE as seatType " +
            "     , RES.MEMBER_YN as memberYn " +
            "     , RES.CHECK_YN as checkYn " +
            "     , RES.MEMBER_ID as memberId " +
            "     , RES.USER_NUMBER as userNumber " +
            "     , RES.OPERATION_ID as operationId " +
            "     , MEM.MEMBER_NAME as memberName " +
            "     , MEM.MEMBER_ENAME as memberEname " +
            "FROM TB_RESERVATION RES, TB_MEMBERS_INFO MEM " +
            "WHERE RES.MEMBER_ID = MEM.MEMBER_ID  " +
            "AND RES.MEMBER_ID = :memberId "
            , countQuery = "SELECT COUNT(*) " +
            "FROM TB_RESERVATION " +
            "WHERE MEMBER_ID =  :memberId ", nativeQuery = true)
    List<ReservationDto> getAll(@Param("memberId")String memberId);

//    예약번호 + ID 검색 함수
    List<Reservation> findAllByAirlineReservationNumberAndMemberId(int airlineReservationNumber, String memberId);

//    상세 조회
    @Query(value = "SELECT RES.AIRLINE_RESERVATION_NUMBER as airlineReservationNumber " +
            "     , RES.ADULT_COUNT as adultCount " +
            "     , RES.CHILD_COUNT as childCount " +
            "     , RES.MILE_USE_YN as mileUseYn " +
            "     , RES.SEAT_TYPE as seatType " +
            "     , RES.MEMBER_YN as memberYn " +
            "     , RES.CHECK_YN as checkYn " +
            "     , RES.MEMBER_ID as memberId " +
            "     , RES.USER_NUMBER as userNumber " +
            "     , RES.OPERATION_ID as operationId " +
            "     , OPR.AIRLINE as airline " +
            "     , OPR.FLIGHT_NAME as flightName " +
            "     , OPR.START_AIRPORT as startAirport " +
            "     , OPR.FINAL_AIRPORT as finalAirport " +
            "     , OPR.START_TIME as startTime " +
            "     , OPR.FINAL_TIME as finalTime " +
            "     , OPR.START_DATE as startDate " +
            "     , OPR.FINAL_DATE as finalDate " +
            "     , OPR.DOMESTIC_INTERNATIONAL as domesticInternational " +
            "     , OPR.PRICE as price " +
            "     , MEM.MEMBER_NAME as memberName " +
            "FROM TB_RESERVATION RES, TB_OPERATION_INFO OPR, TB_MEMBERS_INFO MEM " +
            "WHERE RES.OPERATION_ID = OPR.OPERATION_ID AND RES.MEMBER_ID = MEM.MEMBER_ID " +
            "AND RES.AIRLINE_RESERVATION_NUMBER LIKE '%' || :airlineReservationNumber || '%' ", countQuery = "SELECT COUNT(*)" +
            "FROM TB_RESERVATION RES, TB_OPERATION_INFO OPR, TB_MEMBERS_INFO MEM " +
            "WHERE RES.OPERATION_ID = OPR.OPERATION_ID AND RES.MEMBER_ID = MEM.MEMBER_ID " +
            "AND RES.AIRLINE_RESERVATION_NUMBER LIKE '%' || :airlineReservationNumber || '%' ", nativeQuery = true)
    Optional<OprResDto> searchReservation(@Param("airlineReservationNumber") int airlineReservationNumber);


}
