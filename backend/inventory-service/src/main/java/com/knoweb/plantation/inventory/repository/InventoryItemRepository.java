package com.knoweb.plantation.inventory.repository;

import com.knoweb.plantation.inventory.model.InventoryItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface InventoryItemRepository extends JpaRepository<InventoryItem, UUID> {
}
