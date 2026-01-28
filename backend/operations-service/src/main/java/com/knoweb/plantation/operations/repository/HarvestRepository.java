package com.knoweb.plantation.operations.repository;

import com.knoweb.plantation.operations.model.HarvestLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Repository
public interface HarvestRepository extends JpaRepository<HarvestLog, UUID> {

    List<HarvestLog> findByTenantIdAndDate(UUID tenantId, LocalDate date);

    List<HarvestLog> findByTenantIdAndField_FieldId(UUID tenantId, UUID fieldId);
}
