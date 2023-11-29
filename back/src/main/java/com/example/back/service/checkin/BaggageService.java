package com.example.back.service.checkin;

import com.example.back.model.entity.checkin.Baggage;
import com.example.back.repository.checkin.BaggageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * packageName : com.example.back.service.checkin
 * fileName : BaggageService
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
@Service
public class BaggageService {
    @Autowired
    BaggageRepository baggageRepository;
    //    전체 조회 + 페이징
    public List<Baggage> findAll() {
        return baggageRepository.findAll();
    }


    //    저장함수(수정함수)
    public Baggage save(Baggage baggage) {

        Baggage baggage2 = baggageRepository.save(baggage);

        return baggage2;
    }

}