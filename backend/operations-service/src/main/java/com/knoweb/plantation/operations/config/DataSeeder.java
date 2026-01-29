package com.knoweb.plantation.operations.config;

import com.knoweb.plantation.operations.model.Division;
import com.knoweb.plantation.operations.model.Field;
import com.knoweb.plantation.operations.model.HarvestLog;
import com.knoweb.plantation.operations.model.MusterLog;
import com.knoweb.plantation.operations.repository.DivisionRepository;
import com.knoweb.plantation.operations.repository.FieldRepository;
import com.knoweb.plantation.operations.repository.HarvestRepository;
import com.knoweb.plantation.operations.repository.MusterRepository;
import com.knoweb.plantation.operations.repository.WorkAssignmentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initDatabase(
            DivisionRepository divisionRepository,
            FieldRepository fieldRepository,
            MusterRepository musterRepository,
            HarvestRepository harvestRepository,
            WorkAssignmentRepository workAssignmentRepository) {
        return args -> {
            System.out.println("Seeding Database...");
            UUID tenantId = UUID.fromString("00000000-0000-0000-0000-000000000000"); // Matches Frontend

            // 1. Create Divisions
            Division upperDiv;
            Division lowerDiv;

            if (divisionRepository.count() == 0) {
                upperDiv = new Division();
                upperDiv.setName("Upper Division");
                upperDiv.setCode("DIV-UP");
                upperDiv.setTenantId(tenantId);
                upperDiv = divisionRepository.save(upperDiv);

                lowerDiv = new Division();
                lowerDiv.setName("Lower Division");
                lowerDiv.setCode("DIV-LOW");
                lowerDiv.setTenantId(tenantId);
                lowerDiv = divisionRepository.save(lowerDiv);
            } else {
                // Fetch existing for reference
                upperDiv = divisionRepository.findAll().stream().filter(d -> d.getCode().equals("DIV-UP")).findFirst()
                        .orElse(null);
                lowerDiv = divisionRepository.findAll().stream().filter(d -> d.getCode().equals("DIV-LOW")).findFirst()
                        .orElse(null);
            }

            // 2. Create Fields
            Field field1 = null;
            Field field3 = null;

            if (fieldRepository.count() == 0 && upperDiv != null && lowerDiv != null) {
                field1 = new Field();
                field1.setFieldNo("F-001");
                field1.setCropType("TEA");
                field1.setAreaAcres(new BigDecimal("10.5"));
                field1.setDivision(upperDiv);
                field1.setTenantId(tenantId);
                field1 = fieldRepository.save(field1);

                Field field2 = new Field();
                field2.setFieldNo("F-002");
                field2.setCropType("TEA");
                field2.setAreaAcres(new BigDecimal("8.0"));
                field2.setDivision(upperDiv);
                field2.setTenantId(tenantId);
                field2 = fieldRepository.save(field2);

                field3 = new Field();
                field3.setFieldNo("F-101");
                field3.setCropType("RUBBER");
                field3.setAreaAcres(new BigDecimal("15.2"));
                field3.setDivision(lowerDiv);
                field3.setTenantId(tenantId);
                field3 = fieldRepository.save(field3);
            } else {
                if (fieldRepository.count() > 0) {
                    field1 = fieldRepository.findAll().stream().filter(f -> f.getFieldNo().equals("F-001")).findFirst()
                            .orElse(null);
                    field3 = fieldRepository.findAll().stream().filter(f -> f.getFieldNo().equals("F-101")).findFirst()
                            .orElse(null);
                }
            }

            // 3. Create Muster Logs
            if (musterRepository.count() == 0 && upperDiv != null) {
                MusterLog muster1 = new MusterLog();
                muster1.setTenantId(tenantId);
                muster1.setDate(LocalDate.now());
                muster1.setDivision(upperDiv);
                muster1.setFieldOfficerId(UUID.randomUUID());
                muster1.setAttendanceData(
                        "[{\"empId\":\"EMP001\",\"status\":\"PRESENT\"}, {\"empId\":\"EMP002\",\"status\":\"ABSENT\"}]");
                muster1.setIsApproved(false);
                musterRepository.save(muster1);
            }

            // 4. Create Harvest Logs
            if (harvestRepository.count() == 0 && field1 != null) {
                HarvestLog harvest1 = new HarvestLog();
                harvest1.setTenantId(tenantId);
                harvest1.setDate(LocalDate.now());
                harvest1.setField(field1);
                harvest1.setQuantityKg(new BigDecimal("250.50"));
                harvest1.setDeductionKg(new BigDecimal("5.00"));
                harvest1.setWorkerCount(12);
                harvest1.setYieldPerWorker(new BigDecimal("20.8"));
                harvest1.setWeatherCondition("Sunny");
                harvestRepository.save(harvest1);
            }

            // 5. Create Work Assignments
            if (workAssignmentRepository.count() == 0 && field1 != null && field3 != null) {
                com.knoweb.plantation.operations.model.WorkAssignment wa1 = new com.knoweb.plantation.operations.model.WorkAssignment();
                wa1.setTenantId(tenantId);
                wa1.setDate(LocalDate.now());
                wa1.setField(field1);
                wa1.setActivity("Fertilizer Application");
                wa1.setGangName("Gang Alpha");
                wa1.setStatus("SCHEDULED");
                workAssignmentRepository.save(wa1);

                com.knoweb.plantation.operations.model.WorkAssignment wa2 = new com.knoweb.plantation.operations.model.WorkAssignment();
                wa2.setTenantId(tenantId);
                wa2.setDate(LocalDate.now().plusDays(1));
                wa2.setField(field3);
                wa2.setActivity("Taping");
                wa2.setGangName("Gang Beta");
                wa2.setStatus("SCHEDULED");
                workAssignmentRepository.save(wa2);
            }

            System.out.println("Seeding Completed Successfully!");
        };
    }
}
