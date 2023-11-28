package com.example.back.repository.center;

import com.example.back.model.entity.center.CuCenter;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CuCenterRepository extends JpaRepository<CuCenter, Integer> {


}
