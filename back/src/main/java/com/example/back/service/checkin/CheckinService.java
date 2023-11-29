package com.example.back.service.checkin;

import com.example.back.model.dto.checkindto;
import com.example.back.repository.checkin.CheckinRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
@Service
public class CheckinService {
    @Autowired
    CheckinRepository checkinRepository; // DI

    //    전체 조회 + 페이징
    public Optional<checkindto> airnumber(int airlineReservationNumber) {
        Optional <checkindto> optional = checkinRepository.airnumber(airlineReservationNumber);

        return optional;
    }


}