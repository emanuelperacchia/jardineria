package com.jardineria.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class CategoryDTO {
    private Long id;
    @NotBlank
    private String name;
    private String slug;
    private String description;
    private Integer displayOrder;
}
