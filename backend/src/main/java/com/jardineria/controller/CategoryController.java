package com.jardineria.controller;

import com.jardineria.dto.CategoryDTO;
import com.jardineria.model.Category;
import com.jardineria.repository.CategoryRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryRepository categoryRepository;

    @GetMapping
    public List<CategoryDTO> getAll() {
        return categoryRepository.findAll().stream()
            .map(this::toDTO)
            .toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoryDTO> getById(@PathVariable Long id) {
        return categoryRepository.findById(id)
            .map(cat -> ResponseEntity.ok(toDTO(cat)))
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/admin")
    public CategoryDTO create(@Valid @RequestBody CategoryDTO dto) {
        Category category = Category.builder()
            .name(dto.getName())
            .slug(dto.getSlug())
            .description(dto.getDescription())
            .displayOrder(dto.getDisplayOrder())
            .build();
        return toDTO(categoryRepository.save(category));
    }

    @PutMapping("/admin/{id}")
    public ResponseEntity<CategoryDTO> update(@PathVariable Long id, @Valid @RequestBody CategoryDTO dto) {
        return categoryRepository.findById(id)
            .map(cat -> {
                cat.setName(dto.getName());
                cat.setSlug(dto.getSlug());
                cat.setDescription(dto.getDescription());
                cat.setDisplayOrder(dto.getDisplayOrder());
                return ResponseEntity.ok(toDTO(categoryRepository.save(cat)));
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/admin/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (categoryRepository.existsById(id)) {
            categoryRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    private CategoryDTO toDTO(Category cat) {
        return CategoryDTO.builder()
            .id(cat.getId())
            .name(cat.getName())
            .slug(cat.getSlug())
            .description(cat.getDescription())
            .displayOrder(cat.getDisplayOrder())
            .build();
    }
}
