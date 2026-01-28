export interface Field {
    fieldId: string;
    fieldNo: string;
    cropType: string;
    areaAcres: number;
    division?: any;
}

export interface HarvestLog {
    harvestId?: string;
    tenantId: string;
    date: string; // ISO Date
    field?: Field;
    fieldId?: string; // For form payload
    quantityKg: number; // Raw weight
    deductionKg: number;
    netWeightKg?: number; // calculated
    workerCount: number;
    yieldPerWorker?: number;
    weatherCondition: string;
    createdAt?: string;
}
