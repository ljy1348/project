package com.example.back.repository.baggage;

import com.example.back.model.entity.baggage.Baggage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

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
}
