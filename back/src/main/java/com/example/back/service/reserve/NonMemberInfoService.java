package com.example.back.service.reserve;

import com.example.back.model.entity.reserve.NonMemberInfo;
import com.example.back.repository.reserve.NonMemberInfoRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * packageName : com.example.back.service.reserve
 * fileName : NonMemberInfoService
 * author : rkdtk
 * date : 2023-11-27
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-27         rkdtk          최초 생성
 */
@Service
public class NonMemberInfoService {

    @Autowired
    NonMemberInfoRepository  nonMemberInfoRepository; // DI

    public Page<NonMemberInfo> findAllByuserNameContaining(
            String userName,
            Pageable pageable){
        Page<NonMemberInfo> page = nonMemberInfoRepository.findAllByuserNameContaining(userName,pageable);
        return page;
    }


    //    저장 함수(수정함수)
    public NonMemberInfo save(NonMemberInfo nonMemberInfo) {

        NonMemberInfo nonMemberInfo2 = nonMemberInfoRepository.save(nonMemberInfo);

        return nonMemberInfo2;
    }
}
