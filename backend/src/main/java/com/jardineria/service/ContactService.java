package com.jardineria.service;

import com.jardineria.dto.ContactDTO;
import com.jardineria.model.ContactMessage;
import com.jardineria.repository.ContactMessageRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ContactService {

    private final ContactMessageRepository repository;
    private final JavaMailSender mailSender;

    @Value("${jardineria.contact.email-to}")
    private String emailTo;

    @Value("${jardineria.contact.email-from}")
    private String emailFrom;

    public void processContact(ContactDTO dto) {
        ContactMessage message = ContactMessage.builder()
            .name(dto.getName())
            .email(dto.getEmail())
            .phone(dto.getPhone())
            .message(dto.getMessage())
            .source(dto.getSource())
            .build();

        repository.save(message);
        sendEmailNotification(message);
    }

    private void sendEmailNotification(ContactMessage msg) {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setFrom(emailFrom);
        mail.setTo(emailTo);
        mail.setSubject("Nuevo contacto desde " + msg.getSource() + " - " + msg.getName());
        mail.setText("""
            Nombre: %s
            Email: %s
            Teléfono: %s
            Origen: %s
            Mensaje:
            %s
            """.formatted(msg.getName(), msg.getEmail(), msg.getPhone(), msg.getSource(), msg.getMessage()));

        mailSender.send(mail);
    }
}
