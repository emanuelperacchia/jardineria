package com.jardineria.repository;

import com.jardineria.model.Post;
import com.jardineria.model.Category;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class PostRepositoryTest {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    private Category category;
    private Post publishedPost;
    private Post draftPost;

    @BeforeEach
    void setUp() {
        category = categoryRepository.save(
            Category.builder().name("Test").slug("test").displayOrder(1).build()
        );

        publishedPost = postRepository.save(Post.builder()
            .title("Post Público")
            .slug("post-publico")
            .content("Contenido público")
            .published(true)
            .category(category)
            .build());

        draftPost = postRepository.save(Post.builder()
            .title("Borrador")
            .slug("borrador")
            .content("Contenido borrador")
            .published(false)
            .build());
    }

    @Test
    void shouldFindPublishedPosts() {
        List<Post> result = postRepository.findByPublishedTrueOrderByCreatedAtDesc();
        assertEquals(1, result.size());
        assertEquals("Post Público", result.get(0).getTitle());
    }

    @Test
    void shouldFindPublishedPostBySlug() {
        Optional<Post> result = postRepository.findBySlugAndPublishedTrue("post-publico");
        assertTrue(result.isPresent());
        assertEquals("Post Público", result.get().getTitle());
    }

    @Test
    void shouldNotFindDraftBySlug() {
        Optional<Post> result = postRepository.findBySlugAndPublishedTrue("borrador");
        assertFalse(result.isPresent());
    }

    @Test
    void shouldFindPostsByCategory() {
        List<Post> result = postRepository.findByCategoryIdAndPublishedTrue(category.getId());
        assertEquals(1, result.size());
    }

    @Test
    void shouldSearchPostsByTitle() {
        List<Post> result = postRepository.findByTitleContainingIgnoreCaseOrContentContainingIgnoreCase("público", "público");
        assertEquals(1, result.size());
    }

    @Test
    void shouldSearchPostsByContent() {
        List<Post> result = postRepository.findByTitleContainingIgnoreCaseOrContentContainingIgnoreCase("borrador", "borrador");
        assertEquals(1, result.size());
    }
}
