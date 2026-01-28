package com.knoweb.plantation.operations.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Data
@Entity
@Table(name = "fields")
public class Field {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "field_id")
    private UUID fieldId;

    @Column(name = "tenant_id", nullable = false)
    private UUID tenantId;

    @ManyToOne
    @JoinColumn(name = "division_id")
    private Division division;

    @Column(name = "field_no", nullable = false)
    private String fieldNo;

    @Column(name = "crop_type")
    private String cropType; // TEA, RUBBER, etc.

    @Column(name = "area_acres")
    private BigDecimal areaAcres;

    @Column(name = "last_harvest_date")
    private LocalDate lastHarvestDate;
}
