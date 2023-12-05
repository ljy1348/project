package com.example.back.service.checkin;

import com.example.back.model.dto.checkin.CheckgetDto;
import com.example.back.model.entity.checkin.Checkin;
import com.example.back.model.dto.checkin.CheckinDto;
// import com.example.back.model.dto.checkindto;
import com.example.back.model.entity.passport.Passport;
import com.example.back.model.entity.reserve.NonMemberInfo;
import com.example.back.model.entity.reserve.Reservation;
import com.example.back.repository.checkin.CheckinRepository;
import com.example.back.service.reserve.NonMemberInfoService;
import com.example.back.service.reserve.ReservationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
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

    @Autowired
    NonMemberInfoService nonMemberInfoService;

    @Autowired
    ReservationService reservationService;

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


    @Transactional
    public  List<CheckgetDto> searchCheckin(int airlineReservationNumber) {
//        List<CheckgetDto> checkinDtoList = checkinRepository.check(airlineReservationNumber);

        log.info("aaaaaaaaaaaaaaaaaaaaaaaaaa : "+airlineReservationNumber);

        Optional<Reservation> reservation = reservationService.findById(airlineReservationNumber);
        log.info("aaaaaaaaaaaaaaaaaaaaaaaaaa2 : "+airlineReservationNumber);

        String userNumber = reservation.get().getUserNumber();
        String[] userArr = userNumber.split(",");
        List<Integer> list = new ArrayList<>();
        log.info("aaaaaaaaaaaaaaaaaaaaaaaaaa3 : "+airlineReservationNumber);

        for (int i = 0; i < userArr.length; i++) {
            list.add(Integer.parseInt(userArr[i]));
        }

        List<NonMemberInfo> nonMemberInfoList = nonMemberInfoService.findAllByUserNameIn(list);
        List<Checkin> checkinList = checkinRepository.findAllByAirlineReservationNumber(airlineReservationNumber);
        List<CheckgetDto> list2 = new ArrayList<>();

        if (checkinList.size() < userArr.length) {
            for (int i = 0; i < userArr.length; i++) {
                CheckgetDto checkgetDto = new CheckgetDto();
                checkgetDto.setUserName(nonMemberInfoList.get(i).getUserName());
                checkgetDto.setUserNumber(nonMemberInfoList.get(i).getUserNumber());
                checkgetDto.setAirlineReservationNumber(airlineReservationNumber);
                list2.add(checkgetDto);
            }
        } else {
            for (int i = 0; i < userArr.length; i++) {
                CheckgetDto checkgetDto = new CheckgetDto();
                checkgetDto.setUserName(nonMemberInfoList.get(i).getUserName());
                checkgetDto.setUserNumber(nonMemberInfoList.get(i).getUserNumber());
                checkgetDto.setAirlineReservationNumber(airlineReservationNumber);
                checkgetDto.setSeatNumber(checkinList.get(i).getSeatNumber());
                list2.add(checkgetDto);
            }
        }



        return list2;
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
            return checkinRepository.selectAllDesc(pageable);
        }
    }


    public void deleteByReserverNumber(int number) {
        checkinRepository.deleteByReserveNumber(number);
    }
}