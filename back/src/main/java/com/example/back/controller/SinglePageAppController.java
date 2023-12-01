package com.example.back.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * packageName : com.example.back.controller
 * fileName : SinglePageAppController
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
@Controller
public class SinglePageAppController {

    @RequestMapping(value = "/{path:[^\\.]*}", method = RequestMethod.GET)
    public String redirect() {
        return "forward:/index.html";
    }
}
