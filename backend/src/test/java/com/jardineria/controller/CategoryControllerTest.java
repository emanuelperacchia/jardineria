package com.jardineria.controller;

import com.jardineria.dto.CategoryDTO;
import com.jardineria.model.Category;
import com.jardineria.repository.CategoryRepository;
import com.jardineria.security.JwtTokenProvider;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(CategoryController.class)
@AutoConfigureMockMvc(addFilters = false)
class CategoryControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private CategoryRepository categoryRepository;

    @MockBean
    private JwtTokenProvider jwtTokenProvider;

    @Test
    void shouldListAllCategories() throws Exception {
        when(categoryRepository.findAll()).thenReturn(List.of(
            Category.builder().id(1L).name("Corte de césped").slug("corte-de-cesped").displayOrder(1).build(),
            Category.builder().id(2L).name("Poda").slug("poda").displayOrder(2).build()
        ));

        mockMvc.perform(get("/api/categories"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.length()").value(2))
            .andExpect(jsonPath("$[0].name").value("Corte de césped"));
    }

    @Test
    void shouldGetCategoryById() throws Exception {
        when(categoryRepository.findById(1L)).thenReturn(
            Optional.of(Category.builder().id(1L).name("Corte").slug("corte").displayOrder(1).build())
        );

        mockMvc.perform(get("/api/categories/1"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.name").value("Corte"));
    }

    @Test
    void shouldReturn404ForMissingCategory() throws Exception {
        when(categoryRepository.findById(99L)).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/categories/99"))
            .andExpect(status().isNotFound());
    }

    @Test
    void shouldCreateCategory() throws Exception {
        Category saved = Category.builder().id(1L).name("Nueva").slug("nueva").displayOrder(3).build();
        when(categoryRepository.save(any(Category.class))).thenReturn(saved);

        CategoryDTO dto = CategoryDTO.builder().name("Nueva").slug("nueva").displayOrder(3).build();

        mockMvc.perform(post("/api/categories/admin")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.id").value(1))
            .andExpect(jsonPath("$.name").value("Nueva"));
    }

    @Test
    void shouldUpdateCategory() throws Exception {
        Category existing = Category.builder().id(1L).name("Vieja").slug("vieja").displayOrder(1).build();
        when(categoryRepository.findById(1L)).thenReturn(Optional.of(existing));
        when(categoryRepository.save(any(Category.class))).thenAnswer(i -> i.getArgument(0));

        CategoryDTO dto = CategoryDTO.builder().name("Actualizada").slug("actualizada").displayOrder(2).build();

        mockMvc.perform(put("/api/categories/admin/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.name").value("Actualizada"));
    }

    @Test
    void shouldDeleteCategory() throws Exception {
        when(categoryRepository.existsById(1L)).thenReturn(true);

        mockMvc.perform(delete("/api/categories/admin/1"))
            .andExpect(status().isNoContent());
    }

    @Test
    void shouldFailCreateWithoutName() throws Exception {
        CategoryDTO dto = CategoryDTO.builder().slug("no-name").build();

        mockMvc.perform(post("/api/categories/admin")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
            .andExpect(status().isBadRequest());
    }
}
