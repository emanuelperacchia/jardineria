package com.jardineria.repository;

import com.jardineria.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {
    Optional<Post> findBySlugAndPublishedTrue(String slug);
    List<Post> findByPublishedTrueOrderByCreatedAtDesc();
    List<Post> findByCategoryIdAndPublishedTrue(Long categoryId);
    List<Post> findByTitleContainingIgnoreCaseOrContentContainingIgnoreCase(String title, String content);
}
