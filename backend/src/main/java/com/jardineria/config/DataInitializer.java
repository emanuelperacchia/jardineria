package com.jardineria.config;

import com.jardineria.model.Category;
import com.jardineria.model.User;
import com.jardineria.repository.CategoryRepository;
import com.jardineria.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import java.util.UUID;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${jardineria.admin.default-password:#{null}}")
    private String defaultPassword;

    @Override
    public void run(String... args) {
        if (userRepository.count() > 0) return;

        String passwordToUse = defaultPassword;
        if (passwordToUse == null || passwordToUse.trim().isEmpty()) {
            passwordToUse = UUID.randomUUID().toString().substring(0, 12);
            log.warn("⚠️ [SEGURIDAD] Admin creado con contraseña temporal generada dinámicamente: {}", passwordToUse);
        } else {
            log.info("ℹ️ Admin creado usando la contraseña configurada en variables de entorno.");
        }

        userRepository.save(User.builder()
            .username("admin")
            .email("admin@jardineria.com")
            .password(passwordEncoder.encode(passwordToUse))
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
