import { useEffect, useState } from 'react';
import { Paper, Typography, Box, Chip, CircularProgress, Alert } from '@mui/material';
import { Lightbulb, Warning, Info, Cloud } from '@mui/icons-material';
import { fetchDailyInsights, type Insight } from '../api/aiApi';

export const DailyInsights = () => {
    const [insights, setInsights] = useState<Insight[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDailyInsights().then(data => {
            setInsights(data);
            setLoading(false);
        });
    }, []);

    const getIcon = (type: string) => {
        switch (type) {
            case 'WEATHER': return <Cloud fontSize="small" />;
            case 'HARVEST': return <Warning fontSize="small" />;
            default: return <Info fontSize="small" />;
        }
    };

    const getColor = (severity: string) => {
        switch (severity) {
            case 'CRITICAL': return 'error';
            case 'WARNING': return 'warning';
            default: return 'info';
        }
    };

    return (
        <Paper sx={{ p: 3, height: '100%', borderRadius: 4, bgcolor: '#F8F9FA' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                <Lightbulb color="warning" />
                <Typography variant="h6" fontWeight="bold">
                    Daily AI Insights
                </Typography>
            </Box>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                    <CircularProgress size={24} />
                </Box>
            ) : insights.length === 0 ? (
                <Alert severity="info" variant="outlined">No new insights for today.</Alert>
            ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {insights.map((insight) => (
                        <Paper
                            key={insight.id}
                            elevation={0}
                            sx={{ p: 2, border: '1px solid #E0E0E0', borderRadius: 2 }}
                        >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Chip
                                    icon={getIcon(insight.type)}
                                    label={insight.type}
                                    size="small"
                                    color={getColor(insight.severity) as any}
                                    variant="outlined"
                                />
                            </Box>
                            <Typography variant="body2" fontWeight="500" gutterBottom>
                                {insight.message}
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                                Recommendation: {insight.action}
                            </Typography>
                        </Paper>
                    ))}
                </Box>
            )}
        </Paper>
    );
};
