package com.example.back.service;

import lombok.Getter;
import lombok.Setter;
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
@Getter
@Setter

@Service
public class EmailService implements Runnable {

    @Autowired
    private JavaMailSender emailSender;

    private String to;
    private String subject;
    private String text;

    public EmailService() {
        // 기본 생성자는 스프링 빈으로 사용될 때 필요합니다.
    }

    public void prepareMessage(String to, String subject, String text) {
        this.to = to;
        this.subject = subject;
        this.text = text;
    }

    @Override
    public void run() {
        log.info("메일 보내기 실행");
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("cloug91@gmail.com");
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        try {
            emailSender.send(message);
        } catch (Exception e) {
            log.info("메일 보내기 실패 : " + e.getMessage());
        }
    }
}