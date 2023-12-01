package com.example.back.controller.customer;

import com.example.back.model.dto.customer.CustomerDto;
import com.example.back.model.entity.Customer.Customer;
import com.example.back.model.entity.notice.Notice;
import com.example.back.model.entity.reserve.Reservation;
import com.example.back.service.customer.CustomerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * packageName : com.example.back.controller.Customer
 * fileName : CustomerController
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

@Slf4j
@RestController
@RequestMapping("/api/tour")
public class CustomerController {

    @Autowired
    CustomerService customerService; // DI

//    전체 조회 - 회원ID 기준
    @GetMapping("/question-board/{memberId}")
    public ResponseEntity<Object> getCustomerAll(
            @PathVariable String memberId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ){
        try {

            Pageable pageable = PageRequest.of(page, size);
            Page<CustomerDto> customerPage;

            if (memberId.equals("admin")) {
                customerPage
                        = customerService.findAllBy(pageable);

            } else {
            customerPage
                    = customerService.getCustomerAll(memberId, pageable);

            }



            Map<String , Object> response = new HashMap<>();
            response.put("question", customerPage.getContent());
            response.put("currentPage", customerPage.getNumber()); // 현재페이지번호
            response.put("totalItems", customerPage.getTotalElements()); // 총건수(개수)
            response.put("totalPages", customerPage.getTotalPages()); // 총페이지수

            if (customerPage.isEmpty() == false) {
//                성공
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
//                데이터 없음
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        }catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//    ID 기준 제목 검색
@GetMapping("/question-board")
public ResponseEntity<Object> getSearchReservation(
        @RequestParam(defaultValue = "0") int titleId,
        @RequestParam(defaultValue = "") String memberId,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size
){
    try {
        Pageable pageable = PageRequest.of(page, size);


        Page<CustomerDto> customerPage
                = customerService.findAllByTitleIdAndMemberId(titleId, memberId, pageable);


        Map<String , Object> response = new HashMap<>();
        response.put("question", customerPage.getContent());
        response.put("currentPage", customerPage.getNumber()); // 현재페이지번호
        response.put("totalItems", customerPage.getTotalElements()); // 총건수(개수)
        response.put("totalPages", customerPage.getTotalPages()); // 총페이지수
//            전체 조회 + like 검색

        if (customerPage.isEmpty() == false) {
//                성공
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
//                데이터 없음
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

    } catch (Exception e) {
        log.debug(e.getMessage());
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

    // 상세조회
    @GetMapping("/question-board/see/{titleId}")
    public ResponseEntity<Object> findById(@PathVariable int titleId) {

        try {
//            상세조회 실행
            Optional<Customer> optionalCustomer = customerService.findById(titleId);

            if (optionalCustomer.isPresent()) {
//                성공
                return new ResponseEntity<>(optionalCustomer.get(), HttpStatus.OK);
            } else {
//                데이터 없음
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
//            서버 에러
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    //    저장 함수
    @PostMapping("/question-board")
    public ResponseEntity<Object> create(@RequestBody Customer customer) {

        try {
            Customer customer1 = customerService.save(customer); // db 저장

            return new ResponseEntity<>(customer1, HttpStatus.OK);
        } catch (Exception e) {

            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 삭제 함수
    @DeleteMapping("/question-board/deletion/{titleId}")
    public ResponseEntity<Object> delete(@PathVariable int titleId) {


        try {

            boolean bSuccess = customerService.removeById(titleId);

            if (bSuccess == true) {

                return new ResponseEntity<>(HttpStatus.OK);
            }

            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {

            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
