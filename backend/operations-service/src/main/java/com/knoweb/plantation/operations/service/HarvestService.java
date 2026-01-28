package com.knoweb.plantation.operations.service;

import com.knoweb.plantation.operations.model.HarvestLog;
import com.knoweb.plantation.operations.repository.HarvestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class HarvestService {

    private final HarvestRepository harvestRepository;

    public HarvestLog recordHarvest(HarvestLog harvestLog) {
        // Business Logic: Calculate Yield Per Worker
        if (harvestLog.getWorkerCount() != null && harvestLog.getWorkerCount() > 0) {
            BigDecimal quantity = harvestLog.getQuantityKg();
            BigDecimal deduction = harvestLog.getDeductionKg() != null ? harvestLog.getDeductionKg() : BigDecimal.ZERO;
            BigDecimal netWeight = quantity.subtract(deduction);

            BigDecimal yield = netWeight.divide(BigDecimal.valueOf(harvestLog.getWorkerCount()), 2,
                    RoundingMode.HALF_UP);
            harvestLog.setYieldPerWorker(yield);
        }

        return harvestRepository.save(harvestLog);
    }

    public List<HarvestLog> getDailyCrop(UUID tenantId, LocalDate date) {
        return harvestRepository.findByTenantIdAndDate(tenantId, date);
    }
}
