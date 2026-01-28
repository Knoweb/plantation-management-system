package com.knoweb.plantation.operations.controller;

import com.knoweb.plantation.operations.model.Division;
import com.knoweb.plantation.operations.repository.DivisionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/operations/divisions")
@RequiredArgsConstructor
public class DivisionController {

    private final DivisionRepository divisionRepository;

    @GetMapping
    public ResponseEntity<List<Division>> getAllDivisions() {
        return ResponseEntity.ok(divisionRepository.findAll());
    }
}
