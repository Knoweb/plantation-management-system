export interface AttendanceRecord {
    workerId: string;
    workerName: string;
    status: 'PRESENT' | 'ABSENT' | 'LEAVE' | 'HALF_DAY';
    task?: string;
}

export interface Division {
    divisionId: string;
    name: string;
    code: string;
}

export interface MusterLog {
    musterId?: string;
    tenantId: string;
    date: string; // ISO Date
    division?: Division;
    divisionId?: string; // For form payload
    fieldOfficerId?: string;
    attendanceData: string; // JSON string of AttendanceRecord[]
    isApproved: boolean;
    approvedBy?: string;
    createdAt?: string;
}

export interface Field {
    fieldId: string;
    tenantId?: string;
    division?: Division;
    fieldNo: string;
    cropType: 'TEA' | 'RUBBER' | 'CINNAMON' | 'COCONUT' | string;
    areaAcres: number;
    lastHarvestDate?: string;
}
