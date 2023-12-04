package com.example.back.service.baggage;

import com.example.back.model.entity.baggage.Baggage;
import com.example.back.repository.baggage.BaggageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public Optional<Baggage> findById(int id) {
        return baggageRepository.findById(id);
    }

    public Optional<Baggage> findByReserveId(String reserveNumber) {

        return baggageRepository.findByAirlineReservationNumber(reserveNumber);
    }

    public Page<Baggage> findByAll(String searchText, Pageable pageable) {
        if (searchText.equals(""))
        return baggageRepository.selectAllByOrderByBagNumberDesc(pageable);
        else return baggageRepository.findAllByAirlineReservationNumber(searchText,pageable);
    }

    public void deleteByReserveNumber(int reserveNumber) {
        baggageRepository.deleteByReserveNumber(reserveNumber);
    }

}