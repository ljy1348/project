package com.example.back.repository.auth;

import com.example.back.model.entity.auth.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * packageName : com.example.simpledms.repository.auth
 * fileName : UserRepository
 * author : GGG
 * date : 2023-11-14
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-14         GGG          최초 생성
 */
public interface UserRepository extends JpaRepository<User, String> {
    Page<User> findAllByUsernameContaining(String username, Pageable pageable);
}
