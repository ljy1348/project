package com.example.back.service.checkin;

import com.example.back.model.entity.checkin.Passport;
import com.example.back.repository.checkin.PassportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * packageName : com.example.back.service.checkin
 * fileName : PassportService
 * author : GGG
 * date : 2023-11-29
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-29         GGG          최초 생성
 */
@Service
public class PassportService {
    @Autowired
    PassportRepository passportRepository; // DI

    //    전체 조회 + 페이징
    public List<Passport> findAll() {
        return passportRepository.findAll();
    }


    //    저장함수(수정함수)
    public Passport save(Passport passport) {

        Passport passport2 = passportRepository.save(passport);

        return passport2;
    }
    
}
