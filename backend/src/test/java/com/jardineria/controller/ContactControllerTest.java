package com.jardineria.controller;

import com.jardineria.dto.ContactDTO;
import com.jardineria.model.ContactMessage;
import com.jardineria.repository.ContactMessageRepository;
import com.jardineria.security.JwtTokenProvider;
import com.jardineria.service.ContactService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ContactController.class)
@AutoConfigureMockMvc(addFilters = false)
class ContactControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private ContactService contactService;

    @MockBean
    private ContactMessageRepository repository;

    @MockBean
    private JwtTokenProvider jwtTokenProvider;

    @Test
    void shouldSendContactMessage() throws Exception {
        doNothing().when(contactService).processContact(any(ContactDTO.class));

        ContactDTO dto = ContactDTO.builder()
            .name("Juan")
            .email("juan@test.com")
            .message("Hola")
            .source("web")
            .build();

        mockMvc.perform(post("/api/contact")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
            .andExpect(status().isOk());
    }

    @Test
    void shouldFailContactWithoutRequiredFields() throws Exception {
        ContactDTO dto = ContactDTO.builder().name("").email("").message("").source("").build();

        mockMvc.perform(post("/api/contact")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
            .andExpect(status().isBadRequest());
    }

    @Test
    void shouldFailWithInvalidEmail() throws Exception {
        ContactDTO dto = ContactDTO.builder()
            .name("Juan")
            .email("no-es-email")
            .message("Mensaje")
            .source("web")
            .build();

        mockMvc.perform(post("/api/contact")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
            .andExpect(status().isBadRequest());
    }

    @Test
    void shouldListMessages() throws Exception {
        when(repository.findAllByOrderByCreatedAtDesc()).thenReturn(List.of(
            ContactMessage.builder().id(1L).name("Juan").email("juan@test.com")
                .message("Mensaje").source("web").read(false)
                .createdAt(LocalDateTime.now()).build()
        ));

        mockMvc.perform(get("/api/contact/admin"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$[0].name").value("Juan"))
            .andExpect(jsonPath("$[0].read").value(false));
    }

    @Test
    void shouldMarkMessageAsRead() throws Exception {
        ContactMessage msg = ContactMessage.builder().id(1L).name("Juan").email("juan@test.com")
            .message("Mensaje").source("web").read(false).createdAt(LocalDateTime.now()).build();
        when(repository.findById(1L)).thenReturn(Optional.of(msg));
        when(repository.save(any(ContactMessage.class))).thenReturn(msg);

        mockMvc.perform(put("/api/contact/admin/1/read"))
            .andExpect(status().isOk());
    }

    @Test
    void shouldReturn404ForMissingMessage() throws Exception {
        when(repository.findById(99L)).thenReturn(Optional.empty());

        mockMvc.perform(put("/api/contact/admin/99/read"))
            .andExpect(status().isNotFound());
    }
}
