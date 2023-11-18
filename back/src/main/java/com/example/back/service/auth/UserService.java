package com.example.back.service.auth;

import com.example.back.model.entity.auth.User;
import com.example.back.repository.auth.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * packageName : com.example.simpledms.service.auth
 * fileName : UserService
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
@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    //    전체 조회 + 페이징
    public Page<User> findAll(Pageable pageable) {
        Page<User> page = userRepository.findAll(pageable);

        return page;
    }

    //    dname like 조회 + 페이징
    public Page<User> findAllByUsernameContaining(String username, Pageable pageable) {
        Page<User> page
                = userRepository.findAllByUserIdContaining(username, pageable);

        return page;
    }

    //    저장함수(수정함수)
    public User save(User user) {

        User user1 = userRepository.save(user);

        return user1;
    }

    //    상세조회(1건조회)
    public Optional<User> findById(String email) {
        Optional<User> optionalUser
                = userRepository.findById(email);

        return optionalUser;
    }

    //    삭제함수
    public boolean removeById(String email) {
        if(userRepository.existsById(email)) { // dno 있는지 확인
            userRepository.deleteById(email); // 삭제 진행
            return true;
        }
        return false;
    }

    // 이메일이 있는지 확인하는 함수
    public boolean existsById(String email) {
        boolean bResult = userRepository.existsById(email);
        return bResult;
    }
}
