package com.example.back.service.center;

import com.example.back.model.entity.center.CuCenter;
import com.example.back.model.entity.notice.Notice;
import com.example.back.repository.center.CuCenterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


@Service
public class CuCenterService {

    @Autowired
    CuCenterRepository cuCenterRepository;

    // title 검색
    public Page<CuCenter> findAllByCustomerCenterContaining(String title, Pageable pageable) {
        Page<CuCenter> page
                = cuCenterRepository.findAllByCustomerCenterContaining(title, pageable);

        return page;
    }


    // 저장 함수
    public CuCenter save(CuCenter cuCenter) {
        CuCenter cuCenter1 = cuCenterRepository.save(cuCenter);

        return cuCenter1;
    }

    //    삭제함수
    public boolean removeById(int titleId) {
        if(cuCenterRepository.existsById(titleId)) { // titleId 있는지 확인
            cuCenterRepository.deleteById(titleId); // 삭제 진행
            return true;
        }
        return false;
    }
}
