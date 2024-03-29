package com.example.back.service.reserve;

import com.example.back.model.entity.reserve.NonMemberInfo;
import com.example.back.repository.reserve.NonMemberInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
        Page<NonMemberInfo> nonMemberInfoPage = nonMemberInfoRepository.findAllByuserNameContaining(userName,pageable);
        return nonMemberInfoPage;
    }


    //    저장 함수(수정함수)
    public NonMemberInfo save(NonMemberInfo nonMemberInfo) {

        NonMemberInfo nonMemberInfo2 = nonMemberInfoRepository.save(nonMemberInfo);

        return nonMemberInfo2;
    }

    public Optional<NonMemberInfo> findById(int id) {
        return nonMemberInfoRepository.findById(id);
    }

    public List<NonMemberInfo> findAllByUserNameIn(List<Integer> userName) {
        return nonMemberInfoRepository.findAllByUserNumberIn(userName);
    }
}
