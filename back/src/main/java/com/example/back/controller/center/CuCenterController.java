package com.example.back.controller.center;


import com.example.back.model.entity.center.CuCenter;
import com.example.back.service.center.CuCenterService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/cuCenter")
public class CuCenterController {

    @Autowired
    CuCenterService cuCenterService;

    //    저장 함수
    @PostMapping("/cu-center")
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
