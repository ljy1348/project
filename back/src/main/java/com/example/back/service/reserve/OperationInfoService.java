package com.example.back.service.reserve;

import com.example.back.model.entity.reserve.OperationInfo;
import com.example.back.repository.reserve.OperationInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

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
@Service
public class OperationInfoService {

    @Autowired
    OperationInfoRepository operationInfoRepository;

    //    question like 검색
    public Page<OperationInfo> selectOperationInfo(String startAirport, String finalAirport, String operationDate, Date sysdate, Pageable pageable){

        Page<OperationInfo> operationInfoList = operationInfoRepository.selectOperationInfo(operationDate,finalAirport,startAirport,sysdate,pageable);

        return operationInfoList;
    }

}
