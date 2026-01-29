package com.knoweb.plantation.operations.service;

import com.knoweb.plantation.operations.model.MusterLog;
import com.knoweb.plantation.operations.repository.MusterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MusterService {

    private final MusterRepository musterRepository;

    private final com.knoweb.plantation.operations.repository.DivisionRepository divisionRepository;

    public MusterLog submitMuster(MusterLog musterLog) {
        // Fix: Fetch the Division entity manually to ensure we have a managed entity
        // The frontend sends a dummy object with just ID, which causes Hibernate
        // validation to fail on other null fields.
        if (musterLog.getDivision() != null && musterLog.getDivision().getDivisionId() != null) {
            com.knoweb.plantation.operations.model.Division division = divisionRepository
                    .findById(musterLog.getDivision().getDivisionId())
                    .orElseThrow(() -> new RuntimeException("Division not found"));
            musterLog.setDivision(division);
        } else {
            throw new RuntimeException("Division ID is required");
        }

        return musterRepository.save(musterLog);
    }

    public List<MusterLog> getMusterByDate(UUID tenantId, LocalDate date) {
        return musterRepository.findByTenantIdAndDate(tenantId, date);
    }

    public MusterLog approveMuster(UUID musterId, UUID approvedBy) {
        MusterLog log = musterRepository.findById(musterId)
                .orElseThrow(() -> new RuntimeException("Muster Log not found"));

        log.setIsApproved(true);
        log.setApprovedBy(approvedBy);
        return musterRepository.save(log);
    }
}
