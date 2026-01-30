import axios from 'axios';

// Interfaces (Moved here to fix import error)
// Internal Types
interface Tenant {
    tenantId: string;
    name: string;
    domain: string;
    subscriptionPlan: 'FREE' | 'PRO' | 'ENTERPRISE';
    status: 'ACTIVE' | 'SUSPENDED' | 'PENDING_APPROVAL';
    createdAt: string;
}

interface TenantCreationRequest {
    name: string;
    domain: string;
    subscriptionPlan: 'FREE' | 'PRO' | 'ENTERPRISE';
}

const API_URL = 'http://localhost:8083/api/v1/identity/tenants';

export const getAllTenants = async (): Promise<Tenant[]> => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const registerTenant = async (data: TenantCreationRequest): Promise<Tenant> => {
    const response = await axios.post(API_URL, data);
    return response.data;
};
