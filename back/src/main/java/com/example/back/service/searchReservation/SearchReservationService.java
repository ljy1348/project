package com.example.back.service.searchReservation;


import com.example.back.model.dto.OprResDto;

import com.example.back.model.entity.searchReservation.SearchReservation;
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
    
//    전체 조회 + like 검색
    public List<SearchReservation> findAllByAirlineReservationNumber(int airlineReservationNumber) {
        List<SearchReservation> list = searchReservationRepository.findAllByAirlineReservationNumber(airlineReservationNumber);
            return list;
    }

    public List<SearchReservation> findAllByAirlineReservationNumberAndMemberId(int airlineReservationNumber, String memberId) {
        List<SearchReservation> list = searchReservationRepository.findAllByAirlineReservationNumberAndMemberId(airlineReservationNumber, memberId);

        return list;
    }

//    상세 조회

    public Optional<OprResDto> searchReservation(int airlineReservationNumber) {
        Optional<OprResDto> optionalOprResDto = searchReservationRepository.searchReservation(airlineReservationNumber);

        return optionalOprResDto;
    }

    public Optional<OprResDto> jySearchReservation(int airlineReservationNumber) {
        Optional<OprResDto> optionalOprResDto = searchReservationRepository.searchById(airlineReservationNumber);

        return optionalOprResDto;
    }

    // 아이디로 단건 찾기 - 주영
    public Optional<SearchReservation> findById(int id) {
        return searchReservationRepository.findById(id);
    }


}
