package com.jardineria.controller;

import com.jardineria.dto.PostDTO;
import com.jardineria.model.Post;
import com.jardineria.repository.CategoryRepository;
import com.jardineria.repository.PostRepository;
import com.jardineria.security.JwtTokenProvider;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(PostController.class)
@AutoConfigureMockMvc(addFilters = false)
class PostControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private PostRepository postRepository;

    @MockBean
    private CategoryRepository categoryRepository;

    @MockBean
    private JwtTokenProvider jwtTokenProvider;

    @Test
    void shouldListPublishedPosts() throws Exception {
        when(postRepository.findByPublishedTrueOrderByCreatedAtDesc()).thenReturn(List.of(
            Post.builder().id(1L).title("Primer post").slug("primer-post").content("Contenido").published(true)
                .createdAt(LocalDateTime.now()).build()
        ));

        mockMvc.perform(get("/api/posts"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$[0].title").value("Primer post"));
    }

    @Test
    void shouldGetPostBySlug() throws Exception {
        when(postRepository.findBySlugAndPublishedTrue("mi-post")).thenReturn(
            Optional.of(Post.builder().id(1L).title("Mi Post").slug("mi-post").content("Contenido").published(true)
                .createdAt(LocalDateTime.now()).build())
        );

        mockMvc.perform(get("/api/posts/mi-post"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.title").value("Mi Post"));
    }

    @Test
    void shouldReturn404ForMissingPost() throws Exception {
        when(postRepository.findBySlugAndPublishedTrue("no-existe")).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/posts/no-existe"))
            .andExpect(status().isNotFound());
    }

    @Test
    void shouldSearchPosts() throws Exception {
        when(postRepository.findByTitleContainingIgnoreCaseOrContentContainingIgnoreCase("cesped", "cesped"))
            .thenReturn(List.of(
                Post.builder().id(1L).title("Corte de césped").slug("corte").content("Info").published(true)
                    .createdAt(LocalDateTime.now()).build()
            ));

        mockMvc.perform(get("/api/posts/search?q=cesped"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$[0].title").value("Corte de césped"));
    }

    @Test
    void shouldCreatePost() throws Exception {
        Post saved = Post.builder().id(1L).title("Nuevo").slug("nuevo").content("Contenido").published(false)
            .createdAt(LocalDateTime.now()).build();
        when(postRepository.save(any(Post.class))).thenReturn(saved);

        PostDTO dto = PostDTO.builder().title("Nuevo").slug("nuevo").content("Contenido").published(false).build();

        mockMvc.perform(post("/api/posts/admin")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.title").value("Nuevo"));
    }

    @Test
    void shouldUpdatePost() throws Exception {
        Post existing = Post.builder().id(1L).title("Viejo").slug("viejo").content("Viejo contenido").published(false)
            .createdAt(LocalDateTime.now()).build();
        when(postRepository.findById(1L)).thenReturn(Optional.of(existing));
        when(postRepository.save(any(Post.class))).thenAnswer(i -> i.getArgument(0));

        PostDTO dto = PostDTO.builder().title("Actualizado").slug("actualizado").content("Nuevo contenido").published(true).build();

        mockMvc.perform(put("/api/posts/admin/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.title").value("Actualizado"))
            .andExpect(jsonPath("$.published").value(true));
    }

    @Test
    void shouldFailCreateWithoutTitle() throws Exception {
        PostDTO dto = PostDTO.builder().content("Contenido").build();

        mockMvc.perform(post("/api/posts/admin")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
            .andExpect(status().isBadRequest());
    }
}
