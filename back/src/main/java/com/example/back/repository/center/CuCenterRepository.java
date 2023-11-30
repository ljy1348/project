package com.example.back.repository.center;

import com.example.back.model.entity.center.CuCenter;


import com.example.back.model.entity.notice.Notice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CuCenterRepository extends JpaRepository<CuCenter, Integer> {
    // title like 검색
    Page<CuCenter> findAllByCustomerCenterContaining(String title, Pageable pageable);

}
