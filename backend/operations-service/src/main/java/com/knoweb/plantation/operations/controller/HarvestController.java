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

    private final HarvestService harvestService;

    @PostMapping
    public ResponseEntity<HarvestLog> recordHarvest(@RequestBody HarvestLog harvestLog) {
        return ResponseEntity.ok(harvestService.recordHarvest(harvestLog));
    }

    @GetMapping
    public ResponseEntity<List<HarvestLog>> getDailyCrop(
            @RequestParam UUID tenantId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(harvestService.getDailyCrop(tenantId, date));
    }
}
