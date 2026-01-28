export interface HarvestLog {
    harvestId: string;
    tenantId: string;
    date: string; // ISO Date
    divisionId: string;
    fieldId: string;
    cropType: 'TEA' | 'RUBBER' | 'COCONUT';
    totalWeightKg: number;
    rejectedWeightKg: number;
    netWeightKg: number; // calculated
    createdAt: string;
}
