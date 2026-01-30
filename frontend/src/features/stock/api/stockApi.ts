import axios from 'axios';
import type { StockTransaction } from '../../inventory/model/inventory';

const API_URL = 'http://localhost:8084/api/transactions';

export const fetchStockRequests = async (): Promise<StockTransaction[]> => {
    try {
        const response = await axios.get<StockTransaction[]>(API_URL);
        // Filter for PENDING requests only? Or all? Let's return all for now or filter in UI
        return response.data.filter(t => t.status === 'PENDING');
    } catch (error) {
        console.error("Failed to fetch stock transactions", error);
        return [];
    }
};

export const approveRequest = async (id: string): Promise<StockTransaction> => {
    const response = await axios.put(`${API_URL}/${id}/approve`);
    return response.data;
};

export const rejectRequest = async (id: string): Promise<StockTransaction> => {
    const response = await axios.put(`${API_URL}/${id}/reject`);
    return response.data;
};

