package com.knoweb.plantation.operations.config;

import com.knoweb.plantation.operations.model.Division;
import com.knoweb.plantation.operations.model.Field;
import com.knoweb.plantation.operations.model.HarvestLog;
import com.knoweb.plantation.operations.model.MusterLog;
import com.knoweb.plantation.operations.repository.DivisionRepository;
import com.knoweb.plantation.operations.repository.FieldRepository;
import com.knoweb.plantation.operations.repository.HarvestRepository;
import com.knoweb.plantation.operations.repository.MusterRepository;
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
            HarvestRepository harvestRepository) {
        return args -> {
            if (divisionRepository.count() > 0) {
                System.out.println("Database already seeded. Skipping.");
                return;
            }

            System.out.println("Seeding Database...");

            UUID tenantId = UUID.fromString("00000000-0000-0000-0000-000000000000"); // Matches Frontend

            // 1. Create Divisions
            Division upperDiv = new Division();
            upperDiv.setName("Upper Division");
            upperDiv.setCode("DIV-UP");
            upperDiv.setTenantId(tenantId);
            upperDiv = divisionRepository.save(upperDiv);

            Division lowerDiv = new Division();
            lowerDiv.setName("Lower Division");
            lowerDiv.setCode("DIV-LOW");
            lowerDiv.setTenantId(tenantId);
            lowerDiv = divisionRepository.save(lowerDiv);

            // 2. Create Fields
            Field field1 = new Field();
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

            Field field3 = new Field();
            field3.setFieldNo("F-101");
            field3.setCropType("RUBBER");
            field3.setAreaAcres(new BigDecimal("15.2"));
            field3.setDivision(lowerDiv);
            field3.setTenantId(tenantId);
            field3 = fieldRepository.save(field3);

            // 3. Create Muster Logs
            MusterLog muster1 = new MusterLog();
            muster1.setTenantId(tenantId);
            muster1.setDate(LocalDate.now());
            muster1.setDivision(upperDiv);
            muster1.setFieldOfficerId(UUID.randomUUID());
            muster1.setAttendanceData(
                    "[{\"empId\":\"EMP001\",\"status\":\"PRESENT\"}, {\"empId\":\"EMP002\",\"status\":\"ABSENT\"}]");
            muster1.setIsApproved(false);
            musterRepository.save(muster1);

            // 4. Create Harvest Logs
            HarvestLog harvest1 = new HarvestLog();
            harvest1.setTenantId(tenantId);
            harvest1.setDate(LocalDate.now());
            harvest1.setField(field1);
            harvest1.setQuantityKg(new BigDecimal("250.50")); // Raw weight
            // netWeightKg and deductionKg are handled by DB/User, here we set defaults if
            // needed
            // For now, let's set them explicitly as we can't rely on DB generated columns
            // for insert in this specific setup if we want it to work instantly
            harvest1.setDeductionKg(new BigDecimal("5.00"));
            // harvest1.setNetWeightKg(new BigDecimal("245.50")); // Read-only in Java now
            harvest1.setWorkerCount(12);
            harvest1.setYieldPerWorker(new BigDecimal("20.8"));
            harvest1.setWeatherCondition("Sunny");
            harvestRepository.save(harvest1);

            HarvestLog harvest2 = new HarvestLog();
            harvest2.setTenantId(tenantId);
            harvest2.setDate(LocalDate.now().minusDays(1));
            harvest2.setField(field2);
            harvest2.setQuantityKg(new BigDecimal("180.00"));
            harvest2.setDeductionKg(new BigDecimal("2.00"));
            harvest2.setWorkerCount(10);
            harvest2.setYieldPerWorker(new BigDecimal("18.0"));
            harvest2.setWeatherCondition("Rainy");
            harvestRepository.save(harvest2);

            System.out.println("Seeding Completed Successfully!");
        };
    }
}
