package com.knoweb.plantation.inventory.controller;

import com.knoweb.plantation.inventory.model.StockTransaction;
import com.knoweb.plantation.inventory.repository.StockTransactionRepository;
import com.knoweb.plantation.inventory.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/transactions")
public class StockTransactionController {

    @Autowired
    private StockService stockService;

    @GetMapping
    public List<StockTransaction> getAllTransactions() {
        return stockService.getAllTransactions();
    }

    @PostMapping
    public StockTransaction createTransaction(@RequestBody StockTransaction transaction) {
        return stockService.createRequest(transaction);
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<StockTransaction> approveTransaction(@PathVariable UUID id) {
        try {
            return ResponseEntity.ok(stockService.approveRequest(id));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<StockTransaction> rejectTransaction(@PathVariable UUID id) {
        try {
            return ResponseEntity.ok(stockService.rejectRequest(id));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
