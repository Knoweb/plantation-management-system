package com.knoweb.plantation.inventory.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.UUID;

@Entity
@Table(name = "inventory_items")
public class InventoryItem {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @jakarta.persistence.Column(name = "tenant_id", nullable = false)
    private UUID tenantId;

    private String name;
    private String type; // FERTILIZER, CHEMICAL, TOOL
    private String unit; // KG, L, UNIT

    private Double quantityOnHand;
    private Double reorderLevel;
    private Double unitPrice;

    public InventoryItem() {
    }

    public InventoryItem(UUID id, UUID tenantId, String name, String type, String unit, Double quantityOnHand,
            Double reorderLevel,
            Double unitPrice) {
        this.id = id;
        this.tenantId = tenantId;
        this.name = name;
        this.type = type;
        this.unit = unit;
        this.quantityOnHand = quantityOnHand;
        this.reorderLevel = reorderLevel;
        this.unitPrice = unitPrice;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getTenantId() {
        return tenantId;
    }

    public void setTenantId(UUID tenantId) {
        this.tenantId = tenantId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public Double getQuantityOnHand() {
        return quantityOnHand;
    }

    public void setQuantityOnHand(Double quantityOnHand) {
        this.quantityOnHand = quantityOnHand;
    }

    public Double getReorderLevel() {
        return reorderLevel;
    }

    public void setReorderLevel(Double reorderLevel) {
        this.reorderLevel = reorderLevel;
    }

    public Double getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(Double unitPrice) {
        this.unitPrice = unitPrice;
    }
}
