package com.example.back.repository.reserve;

import com.example.back.model.entity.reserve.NonMemberInfo;
import com.example.back.model.entity.reserve.OperationInfo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * packageName : com.example.back.repository.reserve
 * fileName : NonMemberInfoRepository
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
@Repository
public interface NonMemberInfoRepository extends JpaRepository<NonMemberInfo, Integer> {

    Page<NonMemberInfo> findAllByuserNameContaining(String userName, Pageable pageable);

    List<NonMemberInfo> findAllByUserNumberIn(List<Integer> userName);
}
