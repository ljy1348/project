package com.example.back.service.checkin;

import com.example.back.model.dto.checkin.CheckgetDto;
import com.example.back.model.entity.checkin.Checkin;
import com.example.back.model.dto.checkin.CheckinDto;
// import com.example.back.model.dto.checkindto;
import com.example.back.model.entity.passport.Passport;
import com.example.back.repository.checkin.CheckinRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * packageName : com.example.back.service.checkin
 * fileName : CheckinService
 * author : GGG
 * date : 2023-11-27
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-27         GGG          최초 생성
 */
@Slf4j
@Service
public class CheckinService {
    @Autowired
    CheckinRepository checkinRepository; // DI

    //    전체 조회 + 페이징
    public Optional<CheckinDto> checkresnum(int airlineReservationNumber) {
        Optional <CheckinDto> optional = checkinRepository.checkresnum(airlineReservationNumber);
        return optional;
    }

    public List<CheckinDto> getSheat (int operationId) {
        return checkinRepository.getSeats(operationId);
    }


    // 전체조회 예약번호 like검색
//    public Page<Checkin> findAllByAirlineReservationNumberContaining(Integer airlineReservationNumber, Pageable pageable){
//        Page<Checkin> page = checkinRepository.findAllByAirlineReservationNumberContaining(airlineReservationNumber,pageable);
//
//        return page;
//    }


    //    저장함수(수정함수)
    public List<Checkin> save(List<Checkin> checkin) {
        log.debug("list checkin : {}", checkin);
        List<Checkin> checkin2 = checkinRepository.saveAll(checkin);

        return checkin2;
    }

    public  List<CheckgetDto> searchCheckin(int airlineReservationNumber) {
        List<CheckgetDto> checkinDtoList = checkinRepository.check(airlineReservationNumber);
        return checkinDtoList;
    }

    // 관리자 전체 조회
    public Page<Checkin> findAllAdmin(String searchTitle, String searchText, Pageable pageable) {
        if (searchTitle.equals("checkinId")) {

            return checkinRepository.findAllByCheckId(Integer.parseInt(searchText), pageable);
        } else if (searchTitle.equals("reservaionNumber")) {

            return checkinRepository.findAllByAirlineReservationNumber(Integer.parseInt(searchText), pageable);
        } else if (searchTitle.equals("passportId")) {
            return checkinRepository.findAllByPassportId(Integer.parseInt(searchText), pageable);
        } else {
            return checkinRepository.findAllBy(pageable);
        }
    }



}