package com.example.back.service.searchReservation;

import com.example.back.model.dto.TestDto;
import com.example.back.model.searchReservation.SearchReservation;
import com.example.back.repository.searchReservation.SearchReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * packageName : com.example.back.service.searchReservation
 * fileName : SearchReservationService
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
@Service
public class SearchReservationService {

    @Autowired
    SearchReservationRepository searchReservationRepository; // DI

    //    예약 번호(airlineReservationNumber) like 검색
    public List<SearchReservation> findAllByAirlineReservationNumberContaining(String airlineReservationNumber) {
        List<SearchReservation> list = searchReservationRepository.findAllByAirlineReservationNumberContaining(airlineReservationNumber);

        return list;
    }

    public List<TestDto> test(String airlineReservationNumber) {
        List<TestDto> list = searchReservationRepository.findAll(airlineReservationNumber);

        return list;
    }

    //    회원 ID(userId) like 검색
    public List<SearchReservation> findAllByUserIdContaining(String userId) {
        List<SearchReservation> list = searchReservationRepository.findAllByUserIdContaining(userId);

        return list;
    }

    //    상세 조회
    public Optional<SearchReservation> findByAirlineReservationNumber(String airlineReservationNumber) {
        Optional<SearchReservation> optionalSearchReservation = searchReservationRepository.findById(airlineReservationNumber);

        return optionalSearchReservation;
    }
}
