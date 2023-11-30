package com.example.back.repository.passport;

import com.example.back.model.entity.passport.Passport;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * packageName : com.example.back.repository.checkin
 * fileName : PassportRespository
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
@Repository
public interface PassportRepository extends JpaRepository<Passport, String> {
    List<Passport> findAllByPassportIdContaining(String passportId);
}

