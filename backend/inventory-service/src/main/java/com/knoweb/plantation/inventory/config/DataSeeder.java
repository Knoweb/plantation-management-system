package com.knoweb.plantation.inventory.config;

import com.knoweb.plantation.inventory.model.InventoryItem;
import com.knoweb.plantation.inventory.repository.InventoryItemRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.util.Arrays;
import java.util.UUID;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initDatabase(InventoryItemRepository itemRepository) {
        return args -> {
            if (itemRepository.count() == 0) {
                UUID defaultTenantId = UUID.fromString("00000000-0000-0000-0000-000000000000");

                InventoryItem urea = new InventoryItem();
                urea.setTenantId(defaultTenantId);
                urea.setName("Urea 46%");
                urea.setType("FERTILIZER");
                urea.setUnit("KG");
                urea.setQuantityOnHand(1500.0);
                urea.setReorderLevel(500.0);
                urea.setUnitPrice(120.0);

                InventoryItem dolomite = new InventoryItem();
                dolomite.setTenantId(defaultTenantId);
                dolomite.setName("Dolomite");
                dolomite.setType("FERTILIZER");
                dolomite.setUnit("KG");
                dolomite.setQuantityOnHand(800.0);
                dolomite.setReorderLevel(1000.0); // Already below reorder level (Alert test)
                dolomite.setUnitPrice(45.0);

                InventoryItem roundup = new InventoryItem();
                roundup.setTenantId(defaultTenantId);
                roundup.setName("Roundup");
                roundup.setType("CHEMICAL");
                roundup.setUnit("L");
                roundup.setQuantityOnHand(200.0);
                roundup.setReorderLevel(50.0);
                roundup.setUnitPrice(2500.0);

                InventoryItem shears = new InventoryItem();
                shears.setTenantId(defaultTenantId);
                shears.setName("Pruning Shears");
                shears.setType("TOOL");
                shears.setUnit("UNIT");
                shears.setQuantityOnHand(50.0);
                shears.setReorderLevel(10.0);
                shears.setUnitPrice(1500.0);

                itemRepository.saveAll(Arrays.asList(urea, dolomite, roundup, shears));
                System.out.println("Inventory Data Seeded!");
            }
        };
    }
}
