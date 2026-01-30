import axios from 'axios';
import type { InventoryItem, StockTransaction } from '../model/inventory';

const INVENTORY_API_URL = 'http://localhost:8084/api/inventory';
const TRANSACTION_API_URL = 'http://localhost:8084/api/transactions';

export const fetchInventoryItems = async (): Promise<InventoryItem[]> => {
    try {
        const response = await axios.get<InventoryItem[]>(INVENTORY_API_URL);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch inventory items", error);
        return [];
    }
};

export const createInventoryItem = async (item: InventoryItem): Promise<InventoryItem> => {
    const response = await axios.post<InventoryItem>(INVENTORY_API_URL, item);
    return response.data;
};

// Transactions
export const fetchStockTransactions = async (): Promise<StockTransaction[]> => {
    try {
        const response = await axios.get<StockTransaction[]>(TRANSACTION_API_URL);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch transactions", error);
        return [];
    }
};
