package com.knoweb.plantation.operations.controller;

import com.knoweb.plantation.operations.model.MusterLog;
import com.knoweb.plantation.operations.service.MusterService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/operations/muster")
@RequiredArgsConstructor
public class MusterController {

    private final MusterService musterService;

    @PostMapping
    public ResponseEntity<MusterLog> submitMuster(@RequestBody MusterLog musterLog) {
        return ResponseEntity.ok(musterService.submitMuster(musterLog));
    }

    @GetMapping
    public ResponseEntity<List<MusterLog>> getMusterLogs(
            @RequestParam UUID tenantId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(musterService.getMusterByDate(tenantId, date));
    }

    @PutMapping("/{musterId}/approve")
    public ResponseEntity<MusterLog> approveMuster(
            @PathVariable UUID musterId,
            @RequestParam UUID approvedBy) {
        return ResponseEntity.ok(musterService.approveMuster(musterId, approvedBy));
    }
}
