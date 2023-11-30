package com.example.back.service.customer;

import com.example.back.model.entity.Customer.Customer;

import com.example.back.repository.customer.CustomerRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * packageName : com.example.back.service.customer
 * fileName : CustomerService
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
public class CustomerService {
    @Autowired
    CustomerRepository customerRepository;

    // 전체 조회
    public Page<Customer> findAll(Pageable pageable) {
        Page<Customer> page
                = customerRepository.findAll(pageable);

        return page;
    }

    public Page<Customer> findAllByTitleContaining(String title, Pageable pageable) {
        Page<Customer> page
                = customerRepository.findAllByTitleContaining(title, pageable);

        return page;
    }


    // 저장 함수
    public Customer save(Customer customer) {
        Customer customer1 = customerRepository.save(customer);

        return customer1;
    }

    //    상세조회(1건조회)
    public Optional<Customer> findById(int titleId) {
        Optional<Customer> optionalCustomer
                = customerRepository.findById(titleId);

        return optionalCustomer;
    }

    //    삭제함수
    public boolean removeById(int titleId) {
        if(customerRepository.existsById(titleId)) { // titleId 있는지 확인
            customerRepository.deleteById(titleId); // 삭제 진행
            return true;
        }
        return false;
    }
}