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

    public MusterLog submitMuster(MusterLog musterLog) {
        // Here we could validate the JSON structure or check if Division exists
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
