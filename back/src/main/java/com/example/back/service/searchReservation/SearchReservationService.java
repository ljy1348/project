package com.example.back.service.searchReservation;


import com.example.back.model.dto.searchReservation.OprResDto;
import com.example.back.model.dto.reserve.ReservationDto;
import com.example.back.model.entity.reserve.Reservation;

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
    
    
//    ID 검색
    public List<ReservationDto> getAll(String memberId) {
        List<ReservationDto> list = searchReservationRepository.getAll(memberId);

        return list;
    }
    
//    예약번호 검색
    public List<Reservation> findAllByAirlineReservationNumberAndMemberId(int airlineReservationNumber, String memberId) {
        List<Reservation> list = searchReservationRepository.findAllByAirlineReservationNumberAndMemberId(airlineReservationNumber, memberId);

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
    public Optional<Reservation> findById(int id) {
        return searchReservationRepository.findById(id);
    }


}
