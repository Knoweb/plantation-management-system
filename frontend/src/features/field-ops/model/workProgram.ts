export interface WorkAssignment {
    assignmentId: string;
    tenantId: string;
    date: string;
    field: {
        fieldId: string;
        fieldNo: string;
    };
    activity: string;
    gangName: string;
    status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
}
