package com.example.back.service.searchReservation;

import com.example.back.model.dto.OprResDto;
import com.example.back.model.searchReservation.SearchReservation;
import com.example.back.repository.searchReservation.SearchReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Collections;
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
    public List<SearchReservation> findAllByAirlineReservationNumberContaining(int airlineReservationNumber) {
        List<SearchReservation> list = searchReservationRepository.findAllByAirlineReservationNumberContaining(airlineReservationNumber);

        return list;
    }

//    상세 조회
    public List<OprResDto> searchReservation(int airlineReservationNumber) {
        List<OprResDto> list = searchReservationRepository.searchReservation(airlineReservationNumber);

        return list;
    }


}
