package com.knoweb.plantation.operations.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.UUID;

@Data
@Entity
@Table(name = "work_assignments")
public class WorkAssignment {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "assignment_id")
    private UUID assignmentId;

    @Column(name = "tenant_id", nullable = false)
    private UUID tenantId;

    @Column(nullable = false)
    private LocalDate date;

    @ManyToOne
    @JoinColumn(name = "field_id")
    private Field field;

    @Column(nullable = false)
    private String activity; // e.g. "Fertilizer", "Pruning"

    @Column(name = "gang_name")
    private String gangName; // e.g. "Gang A"

    @Column(nullable = false)
    private String status; // SCHEDULED, COMPLETED, CANCELLED
}
