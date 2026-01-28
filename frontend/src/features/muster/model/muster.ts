export interface AttendanceRecord {
    workerId: string;
    workerName: string;
    status: 'PRESENT' | 'ABSENT' | 'LEAVE' | 'HALF_DAY';
    task?: string;
}

export interface MusterLog {
    musterId: string;
    tenantId: string;
    date: string; // ISO Date
    divisionId: string;
    fieldOfficerId?: string;
    attendanceData: string; // JSON string of AttendanceRecord[]
    isApproved: boolean;
    approvedBy?: string;
    createdAt: string;
}
