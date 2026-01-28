import type { StockRequest } from '../model/stock';

const MOCK_STOCK_REQUESTS: StockRequest[] = [
    {
        requestId: 'R001',
        divisionId: 'GC Division',
        item: 'U709 (Fertilizer)',
        unit: 'Kg',
        quantity: 300,
        valueRs: 39000,
        availability: 12400,
        status: 'PENDING',
        createdAt: '2025-10-24'
    },
    {
        requestId: 'R002',
        divisionId: 'FD Division',
        item: 'TF Mixture',
        unit: 'Pkts',
        quantity: 12,
        valueRs: 15000,
        availability: 61,
        status: 'PENDING',
        createdAt: '2025-10-24'
    },
    {
        requestId: 'R003',
        divisionId: 'MK Division',
        item: 'Alawanqu',
        unit: 'Nos',
        quantity: 1,
        valueRs: 6100,
        availability: 1,
        status: 'PENDING',
        createdAt: '2025-10-24'
    }
];

export const fetchStockRequests = async (): Promise<StockRequest[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(MOCK_STOCK_REQUESTS), 800);
    });
};
