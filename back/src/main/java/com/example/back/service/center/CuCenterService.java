package com.example.back.service.center;

import com.example.back.model.entity.center.CuCenter;
import com.example.back.repository.center.CuCenterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class CuCenterService {

    @Autowired
    CuCenterRepository cuCenterRepository;


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
