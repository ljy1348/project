package com.example.back.repository.searchReservation;

import com.example.back.model.searchReservation.SearchReservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

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
public interface SearchReservationRepository extends JpaRepository<SearchReservation, String> {
//    예약 번호(airlineReservationNumber) like 검색
    List<SearchReservation> findAllByAirlineReservationNumberContaining(String airlineReservationNumber);
//    회원 ID(userId) like 검색
    List<SearchReservation> findAllByUserIdContaining(String userId);


}
