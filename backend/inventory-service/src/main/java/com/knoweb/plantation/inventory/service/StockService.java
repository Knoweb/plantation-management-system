package com.knoweb.plantation.inventory.service;

import com.knoweb.plantation.inventory.model.InventoryItem;
import com.knoweb.plantation.inventory.model.StockTransaction;
import com.knoweb.plantation.inventory.repository.InventoryItemRepository;
import com.knoweb.plantation.inventory.repository.StockTransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class StockService {

    private final UUID defaultTenantId = UUID.fromString("00000000-0000-0000-0000-000000000000");

    @Autowired
    private StockTransactionRepository stockTransactionRepository;

    @Autowired
    private InventoryItemRepository inventoryItemRepository;

    public List<StockTransaction> getAllTransactions() {
        return stockTransactionRepository.findByTenantId(defaultTenantId);
    }

    @Transactional
    public StockTransaction createRequest(StockTransaction transaction) {
        // Default new requests to PENDING
        if (transaction.getStatus() == null) {
            transaction.setStatus("PENDING");
        }
        if (transaction.getDate() == null) {
            transaction.setDate(LocalDateTime.now());
        }

        transaction.setTenantId(defaultTenantId);

        // Ensure the item exists
        Optional<InventoryItem> itemOpt = inventoryItemRepository.findById(transaction.getItem().getId());
        if (itemOpt.isPresent()) {
            transaction.setItem(itemOpt.get());
            return stockTransactionRepository.save(transaction);
        } else {
            throw new RuntimeException("Inventory Item not found");
        }
    }

    @Transactional
    public StockTransaction approveRequest(UUID transactionId) {
        StockTransaction transaction = stockTransactionRepository.findById(transactionId)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        if (!"PENDING".equals(transaction.getStatus())) {
            throw new RuntimeException("Transaction is already processed");
        }

        InventoryItem item = transaction.getItem();

        if ("OUT".equalsIgnoreCase(transaction.getTransactionType())) {
            if (item.getQuantityOnHand() < transaction.getQuantity()) {
                throw new RuntimeException("Insufficient stock");
            }
            item.setQuantityOnHand(item.getQuantityOnHand() - transaction.getQuantity());
        } else if ("IN".equalsIgnoreCase(transaction.getTransactionType())) {
            item.setQuantityOnHand(item.getQuantityOnHand() + transaction.getQuantity());
        }

        inventoryItemRepository.save(item);

        transaction.setStatus("APPROVED");
        return stockTransactionRepository.save(transaction);
    }

    @Transactional
    public StockTransaction rejectRequest(UUID transactionId) {
        StockTransaction transaction = stockTransactionRepository.findById(transactionId)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        if (!"PENDING".equals(transaction.getStatus())) {
            throw new RuntimeException("Transaction is already processed");
        }

        transaction.setStatus("REJECTED");
        return stockTransactionRepository.save(transaction);
    }
}
