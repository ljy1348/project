package com.example.back.controller.auth;

import com.example.back.model.entity.auth.Member;
import com.example.back.service.auth.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

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
}
