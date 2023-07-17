package com.ftiland.travelrental.common.utils.mail;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MailService {

    private final JavaMailSender mailSender;

    private final String subject = "[PlayPack] %s님의 예약요청";
    private final String text = "%s님께서 고객님의 [%s] 상품에 대여예약요청하셨습니다.";

    public void sendMail(String to, String memberName, String productTitle) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(String.format(subject, memberName));
        message.setText(String.format(text, memberName, productTitle));
        mailSender.send(message);
    }
}
