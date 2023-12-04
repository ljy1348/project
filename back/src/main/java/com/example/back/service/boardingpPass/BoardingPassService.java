package com.example.back.service.boardingpPass;

import com.example.back.model.dto.boardingPass.BoardingPassDto;
import com.example.back.model.entity.boardingPass.BoardingPass;
import com.example.back.repository.boardingPass.BoardingPassRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * packageName : com.example.back.service.boardingpass
 * fileName : BoardingpassService
 * author : GGG
 * date : 2023-11-30
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-30         GGG          최초 생성
 */
@Service
public class BoardingPassService {
    @Autowired
    BoardingPassRepository boardingpassRepository;

    public List<BoardingPassDto> boardingpass(int airlineReservationNumber) {
        return boardingpassRepository.boardingpass(airlineReservationNumber);
    }

    //    상세조회(1건조회)
//    public List<BoardingPass> findByAirlineReservationNumber(int airlineReservationNumber) {
//        List<BoardingPass> listBoardingPassDto
//                = boardingpassRepository.findByAirlineReservationNumber(airlineReservationNumber);
//
//        return listBoardingPassDto;
//    }

}