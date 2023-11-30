package com.example.back.service.passport;

import com.example.back.model.entity.passport.Passport;
import com.example.back.repository.passport.PassportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
    public List<Passport> save(List<Passport> passport) {
        List<Passport> passport2 = passportRepository.saveAll(passport);

        return passport2;
    }
    
}
