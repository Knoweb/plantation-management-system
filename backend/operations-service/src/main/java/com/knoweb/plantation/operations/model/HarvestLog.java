package com.knoweb.plantation.operations.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.Generated;
import org.hibernate.annotations.GenerationTime;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity
@Table(name = "harvest_logs")
public class HarvestLog {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "harvest_id")
    private UUID harvestId;

    @Column(name = "tenant_id", nullable = false)
    private UUID tenantId;

    @Column(nullable = false)
    private LocalDate date;

    @ManyToOne
    @JoinColumn(name = "field_id")
    private Field field;

    @Column(name = "quantity_kg", nullable = false)
    private BigDecimal quantityKg;

    @Column(name = "deduction_kg")
    private BigDecimal deductionKg = BigDecimal.ZERO;

    // Generated Column Handling
    // We mark it as updatable=false, insertable=false and let the DB handle it,
    // OR we calculate it in Java.
    // Ideally, for @Generated(ALWAYS), we just map it as read-only.
    @Column(name = "net_weight_kg", insertable = false, updatable = false)
    private BigDecimal netWeightKg;

    @Column(name = "worker_count")
    private Integer workerCount;

    @Column(name = "yield_per_worker")
    private BigDecimal yieldPerWorker;

    @Column(name = "weather_condition")
    private String weatherCondition;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
}
