package com.example.back.repository.baggage;

import com.example.back.model.entity.baggage.Baggage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * packageName : com.example.back.repository.checkin
 * fileName : BaggageRepository
 * author : GGG
 * date : 2023-11-29
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-29         GGG          최초 생성
 */
@Repository
public interface BaggageRepository extends JpaRepository<Baggage, Integer> {
    List<Baggage> findAllByBagNumberContaining(Integer bagNumber);

    Optional<Baggage> findByAirlineReservationNumber(String airlineReservationNumber);

    Page<Baggage> findAllByAirlineReservationNumber(String airlineReservationNumber, Pageable pageable);

    Page<Baggage> findAllByOrderByBagNumberDesc(Pageable pageable);

    @Query(value = "select * from tb_baggage order by bag_number desc", nativeQuery = true)
    Page<Baggage> selectAllByOrderByBagNumberDesc(Pageable pageable);

    @Transactional
    @Modifying
    @Query(value = "update tb_baggage set delete_yn='Y' where airline_reservation_number = :reserveNumber", nativeQuery = true)
    void deleteByReserveNumber(@Param("reserveNumber")int reserveNumber);

}
