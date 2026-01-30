package com.knoweb.plantation.identity.service;

import com.knoweb.plantation.identity.dto.LoginRequest;
import com.knoweb.plantation.identity.dto.LoginResponse;
import com.knoweb.plantation.identity.model.Tenant;
import com.knoweb.plantation.identity.model.User;
import com.knoweb.plantation.identity.repository.TenantRepository;
import com.knoweb.plantation.identity.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AuthService {

    private final TenantRepository tenantRepository;
    private final UserRepository userRepository;

    public AuthService(TenantRepository tenantRepository, UserRepository userRepository) {
        this.tenantRepository = tenantRepository;
        this.userRepository = userRepository;
    }

    public LoginResponse login(LoginRequest request) {
        // 1. Find Tenant by Domain
        Tenant tenant = tenantRepository.findByDomain(request.getDomain())
                .orElseThrow(() -> new RuntimeException("Invalid Company Domain"));

        // 2. Find User in that Tenant
        User user = userRepository.findByUsernameAndTenantId(request.getUsername(), tenant.getTenantId())
                .orElseThrow(() -> new RuntimeException("Invalid Username or Password"));

        // 3. Validate Password (Simple check for now, upgrade to BCrypt later)
        if (!user.getPasswordHash().equals(request.getPassword())) {
            throw new RuntimeException("Invalid Username or Password");
        }

        // 4. Generate 'Token' (Simple UUID for now)
        String token = UUID.randomUUID().toString();

        return new LoginResponse(
                token,
                tenant.getTenantId(),
                user.getUserId(),
                user.getRole().name(),
                user.getFullName());
    }
}
