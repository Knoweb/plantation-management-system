package com.knoweb.plantation.operations.controller;

import com.knoweb.plantation.operations.model.HarvestLog;
import com.knoweb.plantation.operations.service.HarvestService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/operations/harvest")
@RequiredArgsConstructor
public class HarvestController {

    private final java.util.UUID defaultTenantId = java.util.UUID.fromString("00000000-0000-0000-0000-000000000000");

    private final HarvestService harvestService;

    @PostMapping
    public ResponseEntity<HarvestLog> recordHarvest(@RequestBody HarvestLog harvestLog) {
        harvestLog.setTenantId(defaultTenantId);
        return ResponseEntity.ok(harvestService.recordHarvest(harvestLog));
    }

    @GetMapping
    public ResponseEntity<List<HarvestLog>> getDailyCrop(
            @RequestParam(required = false) UUID tenantId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(harvestService.getDailyCrop(defaultTenantId, date));
    }
}
