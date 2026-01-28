package com.knoweb.plantation.operations.model;

import io.hypersistence.utils.hibernate.type.json.JsonType;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.Type;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity
@Table(name = "muster_logs")
public class MusterLog {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "muster_id")
    private UUID musterId;

    @Column(name = "tenant_id", nullable = false)
    private UUID tenantId;

    @Column(nullable = false)
    private LocalDate date;

    @ManyToOne
    @JoinColumn(name = "division_id")
    private Division division;

    @Column(name = "field_officer_id")
    private UUID fieldOfficerId;

    // The Critical JSONB Field
    // Mapped as String for simplicity, or we can map to a List<AttendanceDto> POJO
    // Using String (raw JSON) offers maximum flexibility for now.
    @Type(JsonType.class)
    @Column(name = "attendance_data", columnDefinition = "jsonb")
    private String attendanceData;

    @Column(name = "is_approved")
    private Boolean isApproved = false;

    @Column(name = "approved_by")
    private UUID approvedBy;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
}
