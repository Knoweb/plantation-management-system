package com.knoweb.plantation.operations.controller;

import com.knoweb.plantation.operations.model.Field;
import com.knoweb.plantation.operations.repository.FieldRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/operations/fields")
@RequiredArgsConstructor
public class FieldController {

    private final java.util.UUID defaultTenantId = java.util.UUID.fromString("00000000-0000-0000-0000-000000000000");

    private final FieldRepository fieldRepository;

    @GetMapping
    public ResponseEntity<List<Field>> getAllFields() {
        return ResponseEntity.ok(fieldRepository.findByTenantId(defaultTenantId));
    }
}
