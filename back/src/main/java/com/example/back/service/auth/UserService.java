package com.example.back.service.auth;

import com.example.back.model.entity.auth.Member;
import com.example.back.repository.auth.MemberRepository;
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
    MemberRepository memberRepository;

    //    전체 조회 + 페이징
    public Page<Member> findAll(String search, String select, Pageable pageable) {
        Page<Member> page;
        if (select.equals("email")) page = memberRepository.findAllByMemberEmailContaining(search, pageable);
        else if (select.equals("id")) page = memberRepository.findAllByMemberIdContainingOrderByMemberId(search, pageable);
        else if (select.equals("name")) page = memberRepository.findAllByMemberNameContaining(search, pageable);
        else if (select.equals("ename")) page = memberRepository.findAllByMemberEnameContaining(search, pageable);
        else page = memberRepository.findAll(pageable);

        return page;
    }

    //    dname like 조회 + 페이징
    public Page<Member> findAllByUsernameContaining(String username, Pageable pageable) {
        Page<Member> page
                = memberRepository.findAllByMemberNameContaining(username, pageable);

        return page;
    }

    //    저장함수(수정함수)
    public Member save(Member user) {

        Member user1 = memberRepository.save(user);

        return user1;
    }

    //    상세조회(1건조회)
    public Optional<Member> findById(String email) {
        Optional<Member> optionalUser
                = memberRepository.findById(email);
        return optionalUser;
    }

    //    삭제함수
    public boolean removeById(String email) {
        if(memberRepository.existsById(email)) { // dno 있는지 확인
            memberRepository.deleteById(email); // 삭제 진행
            return true;
        }
        return false;
    }

    // 이메일이 있는지 확인하는 함수
    public boolean existsById(String email) {
        boolean bResult = memberRepository.existsById(email);
        return bResult;
    }
}
