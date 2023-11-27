package com.example.back.service.reserve;

import com.example.back.model.entity.reserve.OperationInfo;
import com.example.back.repository.reserve.OperationInfoRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Date;

import java.util.List;
import java.util.Optional;


/**
 * packageName : com.example.back.service.reserve
 * fileName : OperationInfoService
 * author : GGG
 * date : 2023-11-22
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-22         GGG          최초 생성
 */
@Slf4j
@Service
public class OperationInfoService {

    @Autowired
    OperationInfoRepository operationInfoRepository;

    //    question like 검색
    public Page<OperationInfo> selectOperationInfo(String startAirport, String finalAirport, String operationDate, Date sysdate, Pageable pageable){

        Page<OperationInfo> operationInfoList = operationInfoRepository.selectOperationInfo(operationDate,finalAirport,startAirport,sysdate,pageable);

        return operationInfoList;
    }


    //    상세 조회(1건조회)
    public Optional<OperationInfo> findById(int OperationId) {
        Optional<OperationInfo> optionalOperationInfo = operationInfoRepository.findById(OperationId);

        return optionalOperationInfo;
    }

    public Page<OperationInfo> findOperation(String search, String select, Pageable pageable) {
        if (select.equals("operationId")) {
            Integer id;
            if (search.equals("")) id = 0;
            else id = Integer.parseInt(search);
            if (id == 0) return operationInfoRepository.findAllByOrderByOperationId(pageable);
            return operationInfoRepository.findAllByOperationIdEqualsOrderByOperationId(id, pageable);
        } else if (select.equals("startAirport")) {
            return operationInfoRepository.findAllByStartAirportContainingOrderByOperationId(search, pageable);
        } else if (select.equals("finalAirport")) {
            return operationInfoRepository.findAllByFinalAirportContainingOrderByOperationId(search, pageable);
        } else if (select.equals("airline")) {
            return operationInfoRepository.findAllByAirlineContainingOrderByOperationId(search, pageable);
        } else if (select.equals("flightName")) {
            return operationInfoRepository.findAllByFlightNameContainingOrderByOperationId(search, pageable);
        }

            return operationInfoRepository.findAllByOrderByOperationId(pageable);

    }

    public OperationInfo save(OperationInfo operationInfo) {
        return operationInfoRepository.save(operationInfo);
    }

    public boolean delete(int dataId) {
        if (operationInfoRepository.existsById(dataId)) {
            operationInfoRepository.deleteById(dataId);
            return true;
        } else {
            return false;
        }
    }

}
