package com.knoweb.plantation.operations.repository;

import com.knoweb.plantation.operations.model.Division;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

import java.util.List;

@Repository
public interface DivisionRepository extends JpaRepository<Division, UUID> {
    List<Division> findByTenantId(UUID tenantId);
}
