package com.example.back.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

/**
 * packageName : com.example.back.service
 * fileName : EmailService
 * author : GGG
 * date : 2023-11-30
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-30         GGG          최초 생성
 */
@Slf4j
@Service
public class EmailService {

    @Autowired
    private JavaMailSender emailSender;

    public void sendSimpleMessage(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("cloug91@gmail.com");
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        try {

        emailSender.send(message);
        } catch (Exception e) {
            log.info("메일 보내기 실패 : "+e);
        }
    }
}