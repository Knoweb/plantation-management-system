package com.knoweb.plantation.operations.repository;

import com.knoweb.plantation.operations.model.MusterLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Repository
public interface MusterRepository extends JpaRepository<MusterLog, UUID> {

    List<MusterLog> findByTenantIdAndDate(UUID tenantId, LocalDate date);

    List<MusterLog> findByTenantIdAndDivision_DivisionId(UUID tenantId, UUID divisionId);
}
