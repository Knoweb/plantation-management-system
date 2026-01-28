import { Typography, Grid, Paper, Box } from '@mui/material';
import { DailyInsights } from '../../features/ai/components/DailyInsights';

export const DashboardPage = () => {
    return (
        <Box>
            <Grid container spacing={3}>
                {/* KPI Cards */}
                {[
                    { title: 'Total Muster', value: '142', sub: '+12% vs yesterday', color: '#E8F5E9', text: '#2E7D32' },
                    { title: 'Harvest (Kg)', value: '2,450', sub: 'Target: 2,500', color: '#FFF3E0', text: '#EF6C00' },
                    { title: 'Active Fields', value: '12', sub: '3 requiring attention', color: '#E3F2FD', text: '#1565C0' },
                    { title: 'Pending Issues', value: '5', sub: '2 High Priority', color: '#FFEBEE', text: '#C62828' },
                ].map((kpi) => (
                    <Grid size={{ xs: 12, sm: 6, md: 3 }} key={kpi.title}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                borderRadius: 4,
                                bgcolor: 'background.paper',
                                border: '1px solid rgba(0,0,0,0.05)',
                                height: '100%'
                            }}
                        >
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                {kpi.title}
                            </Typography>
                            <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
                                {kpi.value}
                            </Typography>
                            <Box
                                sx={{
                                    display: 'inline-block',
                                    px: 1,
                                    py: 0.5,
                                    borderRadius: 2,
                                    bgcolor: kpi.color,
                                    color: kpi.text,
                                    fontSize: '0.75rem',
                                    fontWeight: 600
                                }}
                            >
                                {kpi.sub}
                            </Box>
                        </Paper>
                    </Grid>
                ))}

                {/* Big Chart Area Placeholder */}
                <Grid size={{ xs: 12, md: 8 }}>
                    <Paper sx={{ p: 3, height: 400, borderRadius: 4 }}>
                        <Typography variant="h6" gutterBottom>Weekly Production</Typography>
                        <Box sx={{ height: '90%', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#FAFAFA', borderRadius: 3 }}>
                            <Typography color="text.secondary">Chart Area</Typography>
                        </Box>
                    </Paper>
                </Grid>

                {/* Recent Activity / AI Insights */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <DailyInsights />
                </Grid>
            </Grid>
        </Box>
    );
};
