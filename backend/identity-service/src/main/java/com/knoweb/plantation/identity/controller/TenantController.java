package com.knoweb.plantation.identity.controller;

import com.knoweb.plantation.identity.model.Tenant;
import com.knoweb.plantation.identity.service.TenantService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/identity/tenants")
public class TenantController {

    private final TenantService tenantService;

    public TenantController(TenantService tenantService) {
        this.tenantService = tenantService;
    }

    @PostMapping
    public ResponseEntity<Tenant> createTenant(@RequestBody Tenant tenant) {
        return ResponseEntity.ok(tenantService.createTenant(tenant));
    }

    @GetMapping
    public ResponseEntity<List<Tenant>> getAllTenants() {
        return ResponseEntity.ok(tenantService.getAllTenants());
    }

    @PutMapping("/{id}/subscription")
    public ResponseEntity<Tenant> updateSubscription(
            @PathVariable UUID id,
            @RequestParam Tenant.SubscriptionPlan plan) {
        return ResponseEntity.ok(tenantService.updateSubscription(id, plan));
    }
}
