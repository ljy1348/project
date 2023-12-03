package com.example.back.controller.auth;

import com.example.back.model.dto.payment.PaymentAdminDto;
import com.example.back.model.entity.auth.ERole;
import com.example.back.model.entity.auth.Member;
import com.example.back.model.entity.baggage.Baggage;
import com.example.back.model.entity.checkin.Checkin;
import com.example.back.model.entity.notice.Notice;
import com.example.back.model.entity.payment.Payment;
import com.example.back.model.entity.reserve.OperationInfo;
import com.example.back.security.services.UserDetailsImpl;
import com.example.back.service.auth.UserService;
import com.example.back.service.baggage.BaggageService;
import com.example.back.service.checkin.CheckinService;
import com.example.back.service.notice.NoticeService;
import com.example.back.service.payment.PaymentService;
import com.example.back.service.reserve.OperationInfoService;
import com.fasterxml.jackson.databind.annotation.NoClass;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * packageName : com.example.back.controller.auth
 * fileName : AdminController
 * author : GGG
 * date : 2023-11-22
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-22         GGG          최초 생성
 */
@Slf4j
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    UserService userService;

    @Autowired
    OperationInfoService operationInfoService;

    @Autowired
    NoticeService noticeService;

    @Autowired
    PaymentService paymentService;

    @Autowired
    CheckinService checkinService;

    @Autowired
    BaggageService baggageService;


//    회원 관리
    @GetMapping("/member")
    public ResponseEntity<?> findAll(@RequestParam String search, @RequestParam String select, Pageable pageable) {
        Page<Member> page = userService.findAll(search, select, pageable);

        Map<String, Object> map = new HashMap<>();
        map.put("member", page.getContent());
        map.put("totalPages", page.getTotalPages());

        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    @DeleteMapping("/member")
    public ResponseEntity<?> deleteId(@RequestParam String selectId) {
        log.info(selectId);
            log.info("a");
        try {
           boolean idCheck = userService.existsById(selectId);
            if (idCheck) {
                userService.removeById(selectId);
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

        } catch (Exception e) {
            return new ResponseEntity<>("에러",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Transactional
    @PutMapping("/member")
    public ResponseEntity<String> findById(@RequestBody Member user) {
        try {



            Optional<Member> optionalUser = userService.findById(user.getMemberId());
            if (optionalUser.isPresent()) {
                Member user1 = optionalUser.get();
                user1.setMemberEname(user.getMemberEname());
                user1.setMemberName(user.getMemberName());
                user1.setMemberAdd(user.getMemberAdd());
                user1.setMemberEmail(user.getMemberEmail());
                user1.setMemberDate(user.getMemberDate());
                user1.setMemberPhone(user.getMemberPhone());
                user1.setMemberSex(user.getMemberSex());
                user1.setMemberMile(user.getMemberMile());
                return new ResponseEntity<>("수정되었습니다.",HttpStatus.OK);
            }
            else
                return new ResponseEntity<>("수정에 실패하였습니다.",HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

//    항공기 관리
    @GetMapping("/operation")
    public ResponseEntity<?> findOperation(@RequestParam(defaultValue = "") String search, @RequestParam String select, Pageable pageable) {
    Page<OperationInfo> page = operationInfoService.findOperation(search, select, pageable);



    Map<String, Object> map = new HashMap<>();
    map.put("data", page.getContent());
    map.put("totalPages", page.getTotalPages());

    return new ResponseEntity<>(map, HttpStatus.OK);
//    } catch(Exception e) {
//    return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//    }
}

    @PostMapping("/operation")
    public ResponseEntity<?> createOperation(@RequestBody OperationInfo operationInfo) {
        try {
            SimpleDateFormat inputFormat = new SimpleDateFormat("yyyy-MM-dd");

            // 입력된 문자열을 Date 객체로 파싱
            String startDateStr = inputFormat.format(operationInfo.getStartDate());
            String finalDateStr = inputFormat.format(operationInfo.getFinalDate());
            operationInfo.setStartDate(inputFormat.parse(startDateStr));
            operationInfo.setFinalDate(inputFormat.parse(finalDateStr));
        OperationInfo operationInfo1 = operationInfoService.save(operationInfo);
        return new ResponseEntity<>(HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }

    @GetMapping("/operation/{dataId}")
    public ResponseEntity<?> findOperation(@PathVariable int dataId) {
        try {


        Optional<OperationInfo> operationInfo = operationInfoService.findById(dataId);

        if (operationInfo.isPresent()) {

        return new ResponseEntity<>(operationInfo, HttpStatus.OK);
        } else {

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/operation/{dataId}")
    public ResponseEntity<?> deleteOperation(@PathVariable int dataId) {
        try {

        boolean result = operationInfoService.delete(dataId);
        if (result) return new ResponseEntity<>(HttpStatus.OK);
        else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 고객센터
    // 공지사항
    @GetMapping("/board/notice")
    public ResponseEntity<?> noticeIdDesc() {
        try {
            List<Notice> list = noticeService.noticeIdDesc();

            return new ResponseEntity<>(list, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/board/notice")
    public ResponseEntity<?> save(@RequestBody Notice notice) {
        try {
            Notice notice1 = noticeService.save(notice);

            return new ResponseEntity<>(notice1, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//    결제 조회
    @GetMapping("/payment")
    public ResponseEntity<?> paymentGetAll(Pageable pageable) {
        try {
            Page<PaymentAdminDto> page = paymentService.getAll(pageable);

            Map<String, Object> map = new HashMap<>();
            map.put("content", page.getContent());
            map.put("totalPages", page.getTotalPages());

            return new ResponseEntity<>(map, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/payment/{payId}")
    public ResponseEntity<?> paymentGetAll(@PathVariable int payId ,Pageable pageable) {
        try {
            Page<PaymentAdminDto> page = paymentService.selectAllAndPayId(payId, pageable);

            Map<String, Object> map = new HashMap<>();
            map.put("content", page.getContent());
            map.put("totalPages", page.getTotalPages());

            return new ResponseEntity<>(map, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/checkin")
    public ResponseEntity<?> checkinGetAll(String searchTitle, String searchText, Pageable pageable) {
        try {
        Page<Checkin> checkinPage = checkinService.findAllAdmin(searchTitle, searchText, pageable);

        Map<String, Object> map = new HashMap<>();
        map.put("content", checkinPage.getContent());
        map.put("totalPages", checkinPage.getTotalPages());

        return new ResponseEntity<>(map, HttpStatus.OK);

        } catch (Exception e) {
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        }


    }

    // 수하물
    @GetMapping("/bag")
    public ResponseEntity<?> bagGetAll(Pageable pageable) {
        try {
            Page<Baggage> page = baggageService.findByAll(pageable);

            Map<String, Object> map = new HashMap<>();
            map.put("content", page.getContent());
            map.put("totalPages", page.getTotalPages());

            return new ResponseEntity<>(map, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
