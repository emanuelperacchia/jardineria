package com.jardineria.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import java.time.LocalDateTime;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class PostDTO {
    private Long id;
    @NotBlank
    private String title;
    private String slug;
    private String content;
    private String excerpt;
    private String coverImageUrl;
    private String coverImagePublicId;
    private Boolean published;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Long categoryId;
    private String categoryName;
}
