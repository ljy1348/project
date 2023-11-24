package com.example.back.controller.auth;

import com.example.back.model.entity.auth.ERole;
import com.example.back.model.entity.auth.Member;
import com.example.back.security.services.UserDetailsImpl;
import com.example.back.service.auth.UserService;
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
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

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

}
