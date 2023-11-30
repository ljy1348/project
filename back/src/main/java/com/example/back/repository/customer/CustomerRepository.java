package com.example.back.repository.customer;

import com.example.back.model.entity.Customer.Customer;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * packageName : com.example.back.repository.Customer
 * fileName : CustomerRepository
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
public interface CustomerRepository extends JpaRepository <Customer, Integer> {
    Page<Customer> findAllByTitleContaining(String title, Pageable pageable);
}
