export interface InventoryItem {
    id?: string;
    name: string;
    type: 'FERTILIZER' | 'CHEMICAL' | 'TOOL' | 'OTHER';
    unit: 'KG' | 'L' | 'UNIT' | string;
    quantityOnHand: number;
    reorderLevel: number;
    unitPrice: number;
}

export interface StockTransaction {
    id?: string;
    item: InventoryItem;
    transactionType: 'IN' | 'OUT';
    quantity: number;
    date: string;
    reference: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
}
