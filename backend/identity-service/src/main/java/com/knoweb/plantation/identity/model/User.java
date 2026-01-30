package com.knoweb.plantation.identity.model;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "user_id")
    private UUID userId;

    @Column(name = "tenant_id", nullable = false)
    private UUID tenantId;

    @Column(name = "full_name")
    private String fullName;

    @Column(nullable = false)
    private String username;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    // JSONB support in JPA requires extra libs or simple string mapping for now
    // We will treat it as a string for simplicity in this phase
    @Transient
    private String divisionAccess;

    public enum Role {
        SUPER_ADMIN, MANAGER, FIELD_OFFICER, STORE_KEEPER
    }

    // Constructors
    public User() {
    }

    public User(UUID tenantId, String fullName, String username, String passwordHash, Role role) {
        this.tenantId = tenantId;
        this.fullName = fullName;
        this.username = username;
        this.passwordHash = passwordHash;
        this.role = role;
    }

    // Getters and Setters
    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public UUID getTenantId() {
        return tenantId;
    }

    public void setTenantId(UUID tenantId) {
        this.tenantId = tenantId;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getDivisionAccess() {
        return divisionAccess;
    }

    public void setDivisionAccess(String divisionAccess) {
        this.divisionAccess = divisionAccess;
    }
}
