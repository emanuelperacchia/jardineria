package com.jardineria.config;

import com.jardineria.model.Category;
import com.jardineria.model.User;
import com.jardineria.repository.CategoryRepository;
import com.jardineria.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.count() > 0) return;

        userRepository.save(User.builder()
            .username("admin")
            .email("admin@jardineria.com")
            .password(passwordEncoder.encode("admin123"))
            .role("ROLE_ADMIN")
            .build());

        if (categoryRepository.count() > 0) return;

        String[][] defaultCategories = {
            {"Corte de césped", "corte-de-cesped", "Corte profesional con bordeadora y desmalezadora", "1"},
            {"Poda de arbustos", "poda-de-arbustos", "Poda de formación y mantenimiento de setos y plantas ornamentales", "2"},
            {"Limpieza de canteros", "limpieza-de-canteros", "Remoción de malezas y acondicionamiento de tierra", "3"},
        };

        for (String[] cat : defaultCategories) {
            categoryRepository.save(Category.builder()
                .name(cat[0])
                .slug(cat[1])
                .description(cat[2])
                .displayOrder(Integer.parseInt(cat[3]))
                .build());
        }
    }
}
