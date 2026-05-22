package com.jardineria.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class ContactDTO {
    @NotBlank
    private String name;
    @Email @NotBlank
    private String email;
    private String phone;
    @NotBlank
    private String message;
    @NotBlank
    private String source;
}
