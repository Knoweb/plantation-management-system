import axios from 'axios';

export interface Insight {
    id: string;
    type: 'HARVEST' | 'MUSTER' | 'WEATHER';
    severity: 'INFO' | 'WARNING' | 'CRITICAL';
    message: string;
    action: string;
}

const AI_API_URL = 'http://localhost:5000/api/v1/ai/insights';

export const fetchDailyInsights = async (): Promise<Insight[]> => {
    try {
        const response = await axios.get(AI_API_URL);
        return response.data.data;
    } catch (error) {
        console.error("AI Service Unavailable", error);
        return [];
    }
};
