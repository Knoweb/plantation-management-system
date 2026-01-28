import axios from 'axios';
import type { HarvestLog } from '../model/harvest';


const API_URL = 'http://localhost:8082/api/v1/operations/harvest';
const TENANT_ID = '00000000-0000-0000-0000-000000000000'; // Temporary Hardcoded Tenant

export const fetchHarvestLogs = async (): Promise<HarvestLog[]> => {
    try {
        const today = new Date().toISOString().split('T')[0];
        const response = await axios.get<HarvestLog[]>(API_URL, {
            params: { tenantId: TENANT_ID, date: today }
        });
        return response.data;
    } catch (error) {
        console.error("Failed to fetch harvest logs", error);
        return [];
    }
};

