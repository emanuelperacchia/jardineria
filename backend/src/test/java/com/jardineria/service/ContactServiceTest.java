package com.jardineria.service;

import com.jardineria.dto.ContactDTO;
import com.jardineria.model.ContactMessage;
import com.jardineria.repository.ContactMessageRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ContactServiceTest {

    @Mock
    private ContactMessageRepository repository;

    @Mock
    private JavaMailSender mailSender;

    @InjectMocks
    private ContactService contactService;

    @Captor
    private ArgumentCaptor<ContactMessage> messageCaptor;

    @Captor
    private ArgumentCaptor<SimpleMailMessage> mailCaptor;

    @BeforeEach
    void setUp() {
        ReflectionTestUtils.setField(contactService, "emailTo", "admin@test.com");
        ReflectionTestUtils.setField(contactService, "emailFrom", "no-reply@test.com");
    }

    @Test
    void shouldSaveContactAndSendEmail() {
        ContactDTO dto = ContactDTO.builder()
            .name("Juan Pérez")
            .email("juan@example.com")
            .phone("353-1234567")
            .message("Hola, quiero un presupuesto")
            .source("web")
            .build();

        contactService.processContact(dto);

        verify(repository).save(messageCaptor.capture());
        ContactMessage saved = messageCaptor.getValue();
        assertEquals("Juan Pérez", saved.getName());
        assertEquals("juan@example.com", saved.getEmail());
        assertEquals("353-1234567", saved.getPhone());
        assertEquals("Hola, quiero un presupuesto", saved.getMessage());
        assertEquals("web", saved.getSource());

        verify(mailSender).send(mailCaptor.capture());
        SimpleMailMessage mail = mailCaptor.getValue();
        assertEquals("admin@test.com", mail.getTo()[0]);
        assertTrue(mail.getSubject().contains("Juan Pérez"));
        assertTrue(mail.getText().contains("juan@example.com"));
    }

    @Test
    void shouldSaveContactWithoutPhone() {
        ContactDTO dto = ContactDTO.builder()
            .name("María García")
            .email("maria@example.com")
            .phone(null)
            .message("Consulta sin teléfono")
            .source("web")
            .build();

        contactService.processContact(dto);

        verify(repository).save(messageCaptor.capture());
        assertNull(messageCaptor.getValue().getPhone());
    }

    @Test
    void shouldSaveContactEvenIfEmailFails() {
        ContactDTO dto = ContactDTO.builder()
            .name("Test")
            .email("test@example.com")
            .message("Mensaje")
            .source("web")
            .build();

        doThrow(new RuntimeException("SMTP error")).when(mailSender).send(any(SimpleMailMessage.class));

        assertThrows(RuntimeException.class, () -> contactService.processContact(dto));
        verify(repository).save(any(ContactMessage.class));
    }
}
