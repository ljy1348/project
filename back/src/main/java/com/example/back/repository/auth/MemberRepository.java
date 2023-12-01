package com.example.back.repository.auth;

import com.example.back.model.entity.auth.ERole;
import com.example.back.model.entity.auth.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

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
public interface MemberRepository extends JpaRepository<Member, String> {
    Page<Member> findAllByMemberIdContainingOrderByMemberId(String memberId, Pageable pageable);
    Page<Member> findAllByMemberNameContaining(String memberName, Pageable pageable);
    Page<Member> findAllByMemberAuth(ERole memberAuth, Pageable pageable);

    Page<Member> findAllByMemberEmailContaining(String memberEmail, Pageable pageable);
    Page<Member> findAllByMemberEnameContaining(String memberEname, Pageable pageable);

    Optional<Member> findByMemberIdAndMemberEmail(String memberId, String memberEmail);

}
