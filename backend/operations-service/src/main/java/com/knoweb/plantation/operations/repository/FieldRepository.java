package com.knoweb.plantation.operations.repository;

import com.knoweb.plantation.operations.model.Field;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

import java.util.List;

@Repository
public interface FieldRepository extends JpaRepository<Field, UUID> {
    List<Field> findByTenantId(UUID tenantId);
}
