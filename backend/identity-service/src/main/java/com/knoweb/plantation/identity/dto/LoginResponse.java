package com.knoweb.plantation.identity.dto;

import java.util.UUID;

public class LoginResponse {
    private String token; // For now acts as a session ID
    private UUID tenantId;
    private UUID userId;
    private String role;
    private String fullName;

    public LoginResponse(String token, UUID tenantId, UUID userId, String role, String fullName) {
        this.token = token;
        this.tenantId = tenantId;
        this.userId = userId;
        this.role = role;
        this.fullName = fullName;
    }

    // Getters
    public String getToken() {
        return token;
    }

    public UUID getTenantId() {
        return tenantId;
    }

    public UUID getUserId() {
        return userId;
    }

    public String getRole() {
        return role;
    }

    public String getFullName() {
        return fullName;
    }
}
