export interface StockRequest {
    requestId: string;
    divisionId: string; // e.g., "GC Division"
    item: string;       // e.g., "U709"
    unit: string;       // e.g., "Kg"
    quantity: number;
    valueRs: number;
    availability: number; // Current stock
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    createdAt: string;
}
