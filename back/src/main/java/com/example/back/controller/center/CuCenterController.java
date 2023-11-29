package com.example.back.controller.center;


import com.example.back.model.entity.center.CuCenter;

import com.example.back.model.entity.reserve.NonMemberInfo;
import com.example.back.service.center.CuCenterService;
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

@Slf4j
@RestController
@RequestMapping("/api/addquestion-board")
public class CuCenterController {

    @Autowired
    CuCenterService cuCenterService;

    // 전체 조회
    @GetMapping("/addquestion-board")
    public ResponseEntity<Object> find(@RequestParam(defaultValue = "title") String title,
                                       @RequestParam(defaultValue = "0") int page,
                                       @RequestParam(defaultValue = "3") int size) {
        try {
//            페이지 변수 저장(page: 현재페이지번호, size: 1페이지당 개수)
//            함수 매개변수: Pageable(위의 값을 넣기)
//            사용법 : Pageable pageable = PageRequest.of(현재페이지번호,1페이지당 개수)
            Pageable pageable = PageRequest.of(page, size);

//          전체조회(dname="") + like 검색(dname="S")
            Page<CuCenter> cuCenterPage = cuCenterService.findAllByCuCenterTitleContaining(title, pageable);

//          리엑트 전송 : 부서배열, 페이징 정보[자료구조 : Map<키이름, 값>]
            Map<String, Object> response = new HashMap<>();
            response.put("cuCenter", cuCenterPage.getContent());
            response.put("currentPage", cuCenterPage.getNumber()); // 현재 페이지 번호
            response.put("totalItems", cuCenterPage.getTotalElements()); // 총건수 ( 개수 )
            response.put("totalPages", cuCenterPage.getTotalPages()); // 총페이지 수
            if (cuCenterPage.isEmpty() == false) {
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

    //    저장 함수
    @PostMapping("/addquestion-board")
    public ResponseEntity<Object> create(@RequestBody CuCenter cuCenter) {

        try {
            CuCenter cuCenter1 = cuCenterService.save(cuCenter); // db 저장

            return new ResponseEntity<>(cuCenter1, HttpStatus.OK);
        } catch (Exception e) {
//            DB 에러가 났을경우 : INTERNAL_SERVER_ERROR 프론트엔드로 전송
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    //    수정 함수
    @PutMapping("/cu-center/{titleId}")
    public ResponseEntity<Object> update(
            @PathVariable int titleId,
            @RequestBody CuCenter cuCenter) {

        try {
            CuCenter cuCenter1 = cuCenterService.save(cuCenter); // db 수정

            return new ResponseEntity<>(cuCenter1, HttpStatus.OK);
        } catch (Exception e) {
//            DB 에러가 났을경우 : INTERNAL_SERVER_ERROR 프론트엔드로 전송
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 삭제함수
    @DeleteMapping("/cu-notice/deletion/{titleId}")
    public ResponseEntity<Object> delete(@PathVariable int titleId) {

//        프론트엔드 쪽으로 상태정보를 보내줌
        try {
//            삭제함수 호출
            boolean bSuccess = cuCenterService.removeById(titleId);

            if (bSuccess == true) {
//                delete 문이 성공했을 경우
                return new ResponseEntity<>(HttpStatus.OK);
            }
//            delete 실패했을 경우( 0건 삭제가 될경우 )
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
//            DB 에러가 날경우
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
