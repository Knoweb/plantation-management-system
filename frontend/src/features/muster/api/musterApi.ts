import axios from 'axios';
import type { MusterLog } from '../model/muster';


const API_URL = 'http://localhost:8082/api/v1/operations/muster';
const DIVISIONS_URL = 'http://localhost:8082/api/v1/operations/divisions';
const TENANT_ID = '00000000-0000-0000-0000-000000000000'; // Temporary Hardcoded Tenant

export const fetchDivisions = async (): Promise<any[]> => {
    const response = await axios.get(DIVISIONS_URL);
    return response.data;
};

export const fetchMusterLogs = async (): Promise<MusterLog[]> => {
    try {
        // Fetching for today's date by default for now
        const today = new Date().toISOString().split('T')[0];
        const response = await axios.get<MusterLog[]>(API_URL, {
            params: { tenantId: TENANT_ID, date: today }
        });
        return response.data;
    } catch (error) {
        console.error("Failed to fetch muster logs", error);
        return [];
    }
};

export const submitMusterLog = async (log: MusterLog): Promise<MusterLog> => {
    const response = await axios.post<MusterLog>(API_URL, log);
    return response.data;
};

// Fields
const FIELDS_URL = 'http://localhost:8082/api/v1/operations/fields';
export const fetchFields = async (): Promise<any[]> => {
    const response = await axios.get(FIELDS_URL);
    return response.data;
};

export const approveMuster = async (musterId: string, approvedBy: string): Promise<MusterLog> => {
    // Note: ensure operations-service is running on port 8080 or through gateway
    // We hardcode the Tenant ID for now as per the Controller
    const response = await axios.put(`${API_URL}/${musterId}/approve`, null, {
        params: { approvedBy }
    });
    return response.data;
};

