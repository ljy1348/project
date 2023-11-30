package com.example.back.controller.customer;

import com.example.back.model.entity.Customer.Customer;
import com.example.back.model.entity.notice.Notice;
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


    @GetMapping("/question-board")
    public ResponseEntity<Object> findAllByTitleContaining(
            @RequestParam(defaultValue = "") String title,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size
    ){
        try {

            Pageable pageable = PageRequest.of(page, size);


            Page<Customer> empPage
                    = customerService.findAllByTitleContaining(title, pageable);


            Map<String , Object> response = new HashMap<>();
            response.put("question", empPage.getContent());
            response.put("currentPage", empPage.getNumber()); // 현재페이지번호
            response.put("totalItems", empPage.getTotalElements()); // 총건수(개수)
            response.put("totalPages", empPage.getTotalPages()); // 총페이지수

            if (empPage.isEmpty() == false) {
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

    // 상세조회
    @GetMapping("/question-board/{titleId}")
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
