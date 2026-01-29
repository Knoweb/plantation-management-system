package com.knoweb.plantation.inventory.repository;

import com.knoweb.plantation.inventory.model.StockTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

import java.util.List;

public interface StockTransactionRepository extends JpaRepository<StockTransaction, UUID> {
    List<StockTransaction> findByTenantId(UUID tenantId);
}
