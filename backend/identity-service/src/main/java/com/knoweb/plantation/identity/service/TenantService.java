package com.knoweb.plantation.identity.service;

import com.knoweb.plantation.identity.model.Tenant;
import com.knoweb.plantation.identity.repository.TenantRepository;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service

public class TenantService {

    private final TenantRepository tenantRepository;

    public TenantService(TenantRepository tenantRepository) {
        this.tenantRepository = tenantRepository;
    }

    public Tenant createTenant(Tenant tenant) {
        if (tenantRepository.findByDomain(tenant.getDomain()).isPresent()) {
            throw new RuntimeException("Domain already exists: " + tenant.getDomain());
        }
        tenant.setStatus(Tenant.TenantStatus.ACTIVE);
        return tenantRepository.save(tenant);
    }

    public List<Tenant> getAllTenants() {
        return tenantRepository.findAll();
    }

    public Tenant updateSubscription(UUID tenantId, Tenant.SubscriptionPlan plan) {
        Tenant tenant = tenantRepository.findById(tenantId)
                .orElseThrow(() -> new RuntimeException("Tenant not found"));
        tenant.setSubscriptionPlan(plan);
        return tenantRepository.save(tenant);
    }
}
