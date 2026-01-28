-- =============================================
-- SaaS Plantation Management System - Schema
-- Database: PostgreSQL
-- Pattern: Discriminator Column (tenant_id)
-- =============================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. SAAS TENANT MANAGEMENT
CREATE TABLE tenants (
    tenant_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_name VARCHAR(100) NOT NULL,
    sub_domain VARCHAR(50) UNIQUE NOT NULL, -- e.g., 'dunwatta'.pms.com
    subscription_status VARCHAR(20) DEFAULT 'ACTIVE', -- ACTIVE, SUSPENDED
    config_json JSONB, -- Stores specific crop types enabled (e.g., {"cinnamon": false})
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. USER MANAGEMENT (RBAC)
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(tenant_id) ON DELETE CASCADE,
    full_name VARCHAR(100),
    username VARCHAR(50) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) CHECK (role IN ('SUPER_ADMIN', 'MANAGER', 'FIELD_OFFICER', 'STORE_KEEPER')),
    division_access JSONB, -- List of division IDs this user can access
    UNIQUE(tenant_id, username) -- Username must be unique per tenant
);

-- 3. MASTER DATA: DIVISIONS & FIELDS
CREATE TABLE divisions (
    division_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(tenant_id) ON DELETE CASCADE,
    name VARCHAR(50) NOT NULL, -- e.g., 'Glassaugh Division'
    code VARCHAR(10) -- e.g., 'GC'
);

CREATE TABLE fields (
    field_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(tenant_id) ON DELETE CASCADE,
    division_id UUID REFERENCES divisions(division_id),
    field_no VARCHAR(20) NOT NULL,
    crop_type VARCHAR(20) CHECK (crop_type IN ('TEA', 'RUBBER', 'CINNAMON', 'COCONUT')),
    area_acres DECIMAL(10,2),
    last_harvest_date DATE
);

-- 4. OPERATIONS: MUSTER (ATTENDANCE)
CREATE TABLE muster_logs (
    muster_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(tenant_id) ON DELETE CASCADE,
    date DATE NOT NULL,
    division_id UUID REFERENCES divisions(division_id),
    field_officer_id UUID REFERENCES users(user_id),
    
    -- JSONB for flexibility: [{"worker_id": 1, "task": "PLUCKING", "status": "PRESENT"}]
    attendance_data JSONB NOT NULL, 
    
    is_approved BOOLEAN DEFAULT FALSE,
    approved_by UUID REFERENCES users(user_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. OPERATIONS: HARVEST (CROP BOOK)
CREATE TABLE harvest_logs (
    harvest_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(tenant_id) ON DELETE CASCADE,
    date DATE NOT NULL,
    field_id UUID REFERENCES fields(field_id),
    
    quantity_kg DECIMAL(10,2) NOT NULL,
    deduction_kg DECIMAL(10,2) DEFAULT 0, -- Bag weight / Water
    net_weight_kg DECIMAL(10,2) GENERATED ALWAYS AS (quantity_kg - deduction_kg) STORED,
    
    worker_count INT, -- Derived from Muster
    yield_per_worker DECIMAL(10,2), -- Calculated KPI
    
    weather_condition VARCHAR(50), -- 'Sunny', 'Rainy' (Auto-filled by Agent)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. INVENTORY: ITEMS & TRANSACTIONS
CREATE TABLE inventory_items (
    item_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(tenant_id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL, -- 'Urea Fertilizer'
    category VARCHAR(50), -- 'FERTILIZER', 'TOOLS'
    unit VARCHAR(10), -- 'KG', 'LITER'
    reorder_level DECIMAL(10,2) DEFAULT 100 -- Trigger for AI Agent
);

CREATE TABLE stock_transactions (
    txn_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(tenant_id) ON DELETE CASCADE,
    item_id UUID REFERENCES inventory_items(item_id),
    txn_type VARCHAR(10) CHECK (txn_type IN ('GRN', 'ISSUE', 'RETURN')),
    quantity DECIMAL(10,2) NOT NULL,
    reference_doc VARCHAR(50), -- GRN Number or Requisition ID
    performed_by UUID REFERENCES users(user_id),
    txn_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. INDEXING FOR PERFORMANCE (CRITICAL FOR SAAS)
CREATE INDEX idx_harvest_tenant_date ON harvest_logs(tenant_id, date);
CREATE INDEX idx_muster_tenant_date ON muster_logs(tenant_id, date);
CREATE INDEX idx_stock_tenant_item ON stock_transactions(tenant_id, item_id);