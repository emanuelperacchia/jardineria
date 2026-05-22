package com.jardineria.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import java.time.LocalDateTime;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class GalleryImageDTO {
    private Long id;
    @NotBlank
    private String title;
    private String description;
    @NotBlank
    private String imageUrl;
    private String publicId;
    private Integer displayOrder;
    private LocalDateTime createdAt;
    private Long categoryId;
    private String categoryName;
}
