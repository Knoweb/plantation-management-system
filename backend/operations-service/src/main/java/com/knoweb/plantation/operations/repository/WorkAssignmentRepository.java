package com.knoweb.plantation.operations.repository;

import com.knoweb.plantation.operations.model.WorkAssignment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface WorkAssignmentRepository extends JpaRepository<WorkAssignment, UUID> {
    List<WorkAssignment> findByTenantIdAndDate(UUID tenantId, LocalDate date);

    List<WorkAssignment> findByTenantId(UUID tenantId);
}
