import axios from 'axios';
import type { WorkAssignment } from '../model/workProgram';

const API_URL = 'http://localhost:8082/api/v1/operations/work-assignments';

export const fetchWorkAssignments = async (): Promise<WorkAssignment[]> => {
    try {
        const response = await axios.get<WorkAssignment[]>(API_URL);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch work assignments", error);
        return [];
    }
};

export const createWorkAssignment = async (assignment: Partial<WorkAssignment>): Promise<WorkAssignment> => {
    const response = await axios.post<WorkAssignment>(API_URL, assignment);
    return response.data;
};
