package com.jardineria.controller;

import com.jardineria.dto.AuthResponse;
import com.jardineria.dto.LoginDTO;
import com.jardineria.model.User;
import com.jardineria.repository.UserRepository;
import com.jardineria.security.AuthException;
import com.jardineria.security.JwtTokenProvider;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginDTO dto) {
        User user = userRepository.findByUsername(dto.getUsername())
            .orElseThrow(() -> new AuthException("Credenciales inválidas"));

        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new AuthException("Credenciales inválidas");
        }

        String token = jwtTokenProvider.generateToken(user.getUsername(), user.getRole());
        return ResponseEntity.ok(AuthResponse.builder()
            .token(token)
            .username(user.getUsername())
            .role(user.getRole())
            .build());
    }
}
