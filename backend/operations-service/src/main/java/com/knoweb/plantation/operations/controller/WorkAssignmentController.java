package com.knoweb.plantation.operations.controller;

import com.knoweb.plantation.operations.model.WorkAssignment;
import com.knoweb.plantation.operations.repository.WorkAssignmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/operations/work-assignments")
@RequiredArgsConstructor
public class WorkAssignmentController {

    private final UUID defaultTenantId = UUID.fromString("00000000-0000-0000-0000-000000000000");
    private final WorkAssignmentRepository workAssignmentRepository;

    @GetMapping
    public ResponseEntity<List<WorkAssignment>> getWorkAssignments() {
        return ResponseEntity.ok(workAssignmentRepository.findByTenantId(defaultTenantId));
    }

    @PostMapping
    public ResponseEntity<WorkAssignment> createWorkAssignment(@RequestBody WorkAssignment assignment) {
        assignment.setTenantId(defaultTenantId);
        return ResponseEntity.ok(workAssignmentRepository.save(assignment));
    }
}
