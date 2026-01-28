package com.knoweb.plantation.inventory.controller;

import com.knoweb.plantation.inventory.model.StockTransaction;
import com.knoweb.plantation.inventory.repository.StockTransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "*")
public class StockTransactionController {

    @Autowired
    private StockTransactionRepository stockTransactionRepository;

    @GetMapping
    public List<StockTransaction> getAllTransactions() {
        return stockTransactionRepository.findAll();
    }

    @PostMapping
    public StockTransaction createTransaction(@RequestBody StockTransaction transaction) {
        if (transaction.getDate() == null) {
            transaction.setDate(LocalDateTime.now());
        }
        return stockTransactionRepository.save(transaction);
    }
}
