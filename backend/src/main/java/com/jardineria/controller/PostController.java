package com.jardineria.controller;

import com.jardineria.dto.PostDTO;
import com.jardineria.model.Category;
import com.jardineria.model.Post;
import com.jardineria.repository.CategoryRepository;
import com.jardineria.repository.PostRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostRepository postRepository;
    private final CategoryRepository categoryRepository;

    @GetMapping
    public List<PostDTO> getAllPublished() {
        return postRepository.findByPublishedTrueOrderByCreatedAtDesc().stream()
            .map(this::toDTO)
            .toList();
    }

    @GetMapping("/{slug}")
    public ResponseEntity<PostDTO> getBySlug(@PathVariable String slug) {
        return postRepository.findBySlugAndPublishedTrue(slug)
            .map(post -> ResponseEntity.ok(toDTO(post)))
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/category/{categoryId}")
    public List<PostDTO> getByCategory(@PathVariable Long categoryId) {
        return postRepository.findByCategoryIdAndPublishedTrue(categoryId).stream()
            .map(this::toDTO)
            .toList();
    }

    @GetMapping("/search")
    public List<PostDTO> search(@RequestParam String q) {
        return postRepository
            .findByTitleContainingIgnoreCaseOrContentContainingIgnoreCase(q, q)
            .stream()
            .map(this::toDTO)
            .toList();
    }

    @PostMapping("/admin")
    public PostDTO create(@Valid @RequestBody PostDTO dto) {
        Category category = categoryRepository.findById(dto.getCategoryId()).orElse(null);
        Post post = Post.builder()
            .title(dto.getTitle())
            .slug(dto.getSlug())
            .content(dto.getContent())
            .excerpt(dto.getExcerpt())
            .coverImageUrl(dto.getCoverImageUrl())
            .coverImagePublicId(dto.getCoverImagePublicId())
            .published(dto.getPublished())
            .category(category)
            .build();
        return toDTO(postRepository.save(post));
    }

    @PutMapping("/admin/{id}")
    public ResponseEntity<PostDTO> update(@PathVariable Long id, @Valid @RequestBody PostDTO dto) {
        return postRepository.findById(id)
            .map(post -> {
                Category category = categoryRepository.findById(dto.getCategoryId()).orElse(null);
                post.setTitle(dto.getTitle());
                post.setSlug(dto.getSlug());
                post.setContent(dto.getContent());
                post.setExcerpt(dto.getExcerpt());
                post.setCoverImageUrl(dto.getCoverImageUrl());
                post.setCoverImagePublicId(dto.getCoverImagePublicId());
                post.setPublished(dto.getPublished());
                post.setCategory(category);
                return ResponseEntity.ok(toDTO(postRepository.save(post)));
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/admin/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (postRepository.existsById(id)) {
            postRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    private PostDTO toDTO(Post post) {
        return PostDTO.builder()
            .id(post.getId())
            .title(post.getTitle())
            .slug(post.getSlug())
            .content(post.getContent())
            .excerpt(post.getExcerpt())
            .coverImageUrl(post.getCoverImageUrl())
            .coverImagePublicId(post.getCoverImagePublicId())
            .published(post.getPublished())
            .createdAt(post.getCreatedAt())
            .updatedAt(post.getUpdatedAt())
            .categoryId(post.getCategory() != null ? post.getCategory().getId() : null)
            .categoryName(post.getCategory() != null ? post.getCategory().getName() : null)
            .build();
    }
}
