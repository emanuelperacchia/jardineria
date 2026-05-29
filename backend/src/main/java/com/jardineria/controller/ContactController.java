package com.jardineria.controller;

import com.jardineria.dto.ContactDTO;
import com.jardineria.model.ContactMessage;
import com.jardineria.repository.ContactMessageRepository;
import com.jardineria.service.ContactService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ContactController {

    private final ContactService contactService;
    private final ContactMessageRepository repository;

    @PostMapping("/api/contact")
    public ResponseEntity<Void> send(@Valid @RequestBody ContactDTO dto) {
        contactService.processContact(dto);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/api/admin/contact")
    public List<ContactMessage> getAll() {
        return repository.findAllByOrderByCreatedAtDesc();
    }

    @PutMapping("/api/admin/contact/{id}/read")
    public ResponseEntity<Void> markAsRead(@PathVariable Long id) {
        return repository.findById(id)
            .map(msg -> {
                msg.setRead(true);
                repository.save(msg);
                return ResponseEntity.ok().<Void>build();
            })
            .orElse(ResponseEntity.notFound().build());
    }
}
