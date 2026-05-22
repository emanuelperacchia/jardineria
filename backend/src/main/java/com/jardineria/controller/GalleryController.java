package com.jardineria.controller;

import com.jardineria.dto.GalleryImageDTO;
import com.jardineria.model.Category;
import com.jardineria.model.GalleryImage;
import com.jardineria.repository.CategoryRepository;
import com.jardineria.repository.GalleryImageRepository;
import com.jardineria.service.CloudinaryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/images")
@RequiredArgsConstructor
public class GalleryController {

    private final GalleryImageRepository imageRepository;
    private final CategoryRepository categoryRepository;
    private final CloudinaryService cloudinaryService;

    @GetMapping
    public List<GalleryImageDTO> getAll() {
        return imageRepository.findAllByOrderByDisplayOrderAsc().stream()
            .map(this::toDTO)
            .toList();
    }

    @GetMapping("/category/{categoryId}")
    public List<GalleryImageDTO> getByCategory(@PathVariable Long categoryId) {
        return imageRepository.findByCategoryIdOrderByDisplayOrderAsc(categoryId).stream()
            .map(this::toDTO)
            .toList();
    }

    @PostMapping("/admin/upload")
    public GalleryImageDTO upload(@RequestParam("file") MultipartFile file,
                                  @RequestParam("title") String title,
                                  @RequestParam(value = "description", required = false) String description,
                                  @RequestParam("categoryId") Long categoryId,
                                  @RequestParam(value = "displayOrder", defaultValue = "0") Integer displayOrder) throws IOException {

        Map uploadResult = cloudinaryService.uploadImage(file);
        String imageUrl = (String) uploadResult.get("secure_url");
        String publicId = (String) uploadResult.get("public_id");

        Category category = categoryRepository.findById(categoryId).orElse(null);

        GalleryImage image = GalleryImage.builder()
            .title(title)
            .description(description)
            .imageUrl(imageUrl)
            .publicId(publicId)
            .displayOrder(displayOrder)
            .category(category)
            .build();

        return toDTO(imageRepository.save(image));
    }

    @DeleteMapping("/admin/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) throws IOException {
        return imageRepository.findById(id)
            .map(image -> {
                try {
                    cloudinaryService.deleteImage(image.getPublicId());
                } catch (IOException e) {
                    throw new RuntimeException("Error al eliminar imagen de Cloudinary", e);
                }
                imageRepository.deleteById(id);
                return ResponseEntity.noContent().<Void>build();
            })
            .orElse(ResponseEntity.notFound().build());
    }

    private GalleryImageDTO toDTO(GalleryImage img) {
        return GalleryImageDTO.builder()
            .id(img.getId())
            .title(img.getTitle())
            .description(img.getDescription())
            .imageUrl(img.getImageUrl())
            .publicId(img.getPublicId())
            .displayOrder(img.getDisplayOrder())
            .createdAt(img.getCreatedAt())
            .categoryId(img.getCategory() != null ? img.getCategory().getId() : null)
            .categoryName(img.getCategory() != null ? img.getCategory().getName() : null)
            .build();
    }
}
