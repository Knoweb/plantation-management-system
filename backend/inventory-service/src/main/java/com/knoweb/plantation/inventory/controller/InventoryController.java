package com.knoweb.plantation.inventory.controller;

import com.knoweb.plantation.inventory.model.InventoryItem;
import com.knoweb.plantation.inventory.repository.InventoryItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/inventory")
@CrossOrigin(origins = "*") // Allow frontend access
public class InventoryController {

    private final UUID defaultTenantId = UUID.fromString("00000000-0000-0000-0000-000000000000");

    @Autowired
    private InventoryItemRepository inventoryItemRepository;

    @GetMapping
    public List<InventoryItem> getAllItems() {
        return inventoryItemRepository.findByTenantId(defaultTenantId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<InventoryItem> getItemById(@PathVariable UUID id) {
        Optional<InventoryItem> item = inventoryItemRepository.findById(id);
        return item.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public InventoryItem createItem(@RequestBody InventoryItem item) {
        item.setTenantId(defaultTenantId);
        return inventoryItemRepository.save(item);
    }

    @PutMapping("/{id}")
    public ResponseEntity<InventoryItem> updateItem(@PathVariable UUID id, @RequestBody InventoryItem itemDetails) {
        Optional<InventoryItem> optionalItem = inventoryItemRepository.findById(id);

        if (optionalItem.isPresent()) {
            InventoryItem item = optionalItem.get();
            item.setName(itemDetails.getName());
            item.setType(itemDetails.getType());
            item.setUnit(itemDetails.getUnit());
            item.setQuantityOnHand(itemDetails.getQuantityOnHand());
            item.setReorderLevel(itemDetails.getReorderLevel());
            item.setUnitPrice(itemDetails.getUnitPrice());

            InventoryItem updatedItem = inventoryItemRepository.save(item);
            return ResponseEntity.ok(updatedItem);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable UUID id) {
        if (inventoryItemRepository.existsById(id)) {
            inventoryItemRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
