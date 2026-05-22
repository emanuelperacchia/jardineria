package com.jardineria.controller;

import com.jardineria.dto.LoginDTO;
import com.jardineria.model.User;
import com.jardineria.repository.UserRepository;
import com.jardineria.security.JwtTokenProvider;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AuthController.class)
@AutoConfigureMockMvc(addFilters = false)
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private PasswordEncoder passwordEncoder;

    @MockBean
    private JwtTokenProvider jwtTokenProvider;

    @Test
    void shouldLoginSuccessfully() throws Exception {
        User user = User.builder()
            .username("admin")
            .password("encoded-pass")
            .role("ROLE_ADMIN")
            .build();

        when(userRepository.findByUsername("admin")).thenReturn(java.util.Optional.of(user));
        when(passwordEncoder.matches("admin123", "encoded-pass")).thenReturn(true);
        when(jwtTokenProvider.generateToken("admin", "ROLE_ADMIN")).thenReturn("fake-jwt-token");

        LoginDTO login = new LoginDTO("admin", "admin123");

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(login)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.token").value("fake-jwt-token"))
            .andExpect(jsonPath("$.username").value("admin"))
            .andExpect(jsonPath("$.role").value("ROLE_ADMIN"));
    }

    @Test
    void shouldFailWithWrongPassword() throws Exception {
        User user = User.builder()
            .username("admin")
            .password("encoded-pass")
            .role("ROLE_ADMIN")
            .build();

        when(userRepository.findByUsername("admin")).thenReturn(java.util.Optional.of(user));
        when(passwordEncoder.matches("wrong", "encoded-pass")).thenReturn(false);

        LoginDTO login = new LoginDTO("admin", "wrong");

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(login)))
            .andExpect(status().isUnauthorized());
    }

    @Test
    void shouldFailWithInvalidCredentials() throws Exception {
        when(userRepository.findByUsername("nonexistent")).thenReturn(java.util.Optional.empty());

        LoginDTO login = new LoginDTO("nonexistent", "pass");

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(login)))
            .andExpect(status().isUnauthorized());
    }

    @Test
    void shouldFailWithEmptyFields() throws Exception {
        LoginDTO login = new LoginDTO("", "");

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(login)))
            .andExpect(status().isBadRequest());
    }
}
