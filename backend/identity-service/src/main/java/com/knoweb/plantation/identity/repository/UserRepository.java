package com.knoweb.plantation.identity.repository;

import com.knoweb.plantation.identity.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    // Find user by username AND tenant (Multi-tenant login)
    Optional<User> findByUsernameAndTenantId(String username, UUID tenantId);

    // Optional: Global search for Super Admin (if they are tenant-less or special)
    // For now, even Super Admin might belong to a "Master Tenant" or have null
    // tenant_id
    Optional<User> findByUsername(String username);
}
