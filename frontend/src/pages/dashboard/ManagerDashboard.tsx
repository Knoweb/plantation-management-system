import { useEffect, useState } from 'react';
import { Typography, Grid, Paper, Box, Button, Chip, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AssignmentIcon from '@mui/icons-material/Assignment';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { fetchStockTransactions } from '../../features/inventory/api/inventoryApi';
import type { StockTransaction } from '../../features/inventory/model/inventory';
import { fetchFields, fetchMusterLogs } from '../../features/muster/api/musterApi';
import type { Field, MusterLog } from '../../features/muster/model/muster';

export const ManagerDashboard = () => {
    const navigate = useNavigate();
    const [pendingApprovals, setPendingApprovals] = useState<StockTransaction[]>([]);
    const [pendingMusters, setPendingMusters] = useState<MusterLog[]>([]);
    const [fields, setFields] = useState<Field[]>([]);
    const [stats, setStats] = useState({
        pendingCount: 0,
        pendingValue: 0,
        musterCount: 0,
        production: '45,200 Kg'
    });

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        // 1. Fetch Stock Transactions
        const transactions = await fetchStockTransactions();
        const pendingStock = transactions.filter(t => t.status === 'PENDING');
        setPendingApprovals(pendingStock);

        // 2. Fetch Pending Musters (New)
        const today = new Date().toISOString().split('T')[0];
        try {
            const musters = await fetchMusterLogs(today);
            const pendingM = musters.filter(m => !m.isApproved);
            setPendingMusters(pendingM);
        } catch (e) {
            console.error("Failed to fetch musters", e);
        }

        // 3. Fetch Fields for Crop Book
        const fieldData = await fetchFields();
        setFields(fieldData);

        // 4. Calculate Stats
        const totalPendingValue = pendingStock.reduce((sum, t) => sum + (t.item.unitPrice * t.quantity), 0);

        setStats(prev => ({
            ...prev,
            pendingCount: pendingStock.length,
            pendingValue: totalPendingValue,
            musterCount: pendingMusters.length
        }));
    };

    // KPI Data (Dynamic + Mock)
    const kpis = [
        {
            title: 'Pending Approvals',
            value: (pendingApprovals.length + pendingMusters.length).toString(),
            sub: 'Requires Action',
            color: '#FFF3E0',
            text: '#EF6C00',
            icon: <AssignmentIcon />
        },
        {
            title: 'Inventory Value (Pending)',
            value: `LKR ${(stats.pendingValue / 1000).toFixed(1)}k`,
            sub: 'To be approved',
            color: '#E8F5E9',
            text: '#2E7D32',
            icon: <TrendingUpIcon />
        },
        {
            title: 'Total Production',
            value: stats.production,
            sub: 'Target: 45,000 Kg',
            color: '#E3F2FD',
            text: '#1565C0',
            icon: <TrendingDownIcon />
        },
        {
            title: 'Critical Issues',
            value: '3',
            sub: 'Weather Alerts',
            color: '#FFEBEE',
            text: '#C62828',
            icon: <WarningAmberIcon />
        },
    ];

    return (
        <Box>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h5" fontWeight="bold" color="text.primary">
                        Manager Dashboard
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Overview of Estate Operations & Financials
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/dashboard/orders')}
                    sx={{ borderRadius: '20px', textTransform: 'none' }}
                >
                    Review All Approvals
                </Button>
            </Box>

            <Grid container spacing={3}>
                {/* 1. KPIs */}
                {kpis.map((kpi) => (
                    <Grid key={kpi.title} size={{ xs: 12, sm: 6, md: 3 }}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                borderRadius: 2,
                                bgcolor: 'white',
                                border: '1px solid #ddd',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between'
                            }}
                        >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <Box>
                                    <Typography variant="body2" color="text.secondary" fontWeight="bold">
                                        {kpi.title}
                                    </Typography>
                                    <Typography variant="h5" fontWeight="bold" sx={{ mt: 1, mb: 1 }}>
                                        {kpi.value}
                                    </Typography>
                                </Box>
                                <Box sx={{ p: 1, borderRadius: 2, bgcolor: kpi.color, color: kpi.text }}>
                                    {kpi.icon}
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    display: 'inline-block',
                                    px: 1,
                                    py: 0.5,
                                    borderRadius: 1,
                                    bgcolor: kpi.color,
                                    color: kpi.text,
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    alignSelf: 'flex-start'
                                }}
                            >
                                {kpi.sub}
                            </Box>
                        </Paper>
                    </Grid>
                ))}

                {/* 2. Pending Approvals Widget (Combined Stock & Muster) */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper sx={{ p: 0, borderRadius: 2, height: '100%', border: '1px solid #ddd', overflow: 'hidden' }} elevation={0}>
                        <Box sx={{ p: 2, borderBottom: '1px solid #eee' }}>
                            <Typography variant="h6" fontWeight="bold">
                                Pending Approvals
                            </Typography>
                        </Box>
                        <Table size="small">
                            <TableHead sx={{ bgcolor: '#E0E0E0' }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold', borderBottom: '2px solid #999' }}>Type</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', borderBottom: '2px solid #999' }}>Reference/Field</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', borderBottom: '2px solid #999' }}>Date</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', borderBottom: '2px solid #999' }}>Status</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold', borderBottom: '2px solid #999' }}>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {pendingApprovals.length === 0 && pendingMusters.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center" sx={{ py: 3 }}>No pending approvals</TableCell>
                                    </TableRow>
                                ) : (
                                    <>
                                        {/* Stock Requests */}
                                        {pendingApprovals.slice(0, 3).map((row) => (
                                            <TableRow key={row.id}>
                                                <TableCell sx={{ fontWeight: 'bold', borderBottom: '1px solid #eee' }}>Stock: {row.item.name}</TableCell>
                                                <TableCell sx={{ borderBottom: '1px solid #eee' }}>{row.reference || 'Unknown'}</TableCell>
                                                <TableCell sx={{ borderBottom: '1px solid #eee' }}>{new Date(row.date).toLocaleDateString()}</TableCell>
                                                <TableCell sx={{ borderBottom: '1px solid #eee' }}>
                                                    <Chip label={row.status} color="warning" size="small" />
                                                </TableCell>
                                                <TableCell align="right" sx={{ borderBottom: '1px solid #eee' }}>
                                                    <Button size="small" variant="text" onClick={() => navigate('/dashboard/orders')} sx={{ textTransform: 'none' }}>
                                                        View
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}

                                        {/* Muster Logs */}
                                        {pendingMusters.map((row) => (
                                            <TableRow key={row.musterId}>
                                                <TableCell sx={{ fontWeight: 'bold', borderBottom: '1px solid #eee' }}>Muster Log</TableCell>
                                                <TableCell sx={{ borderBottom: '1px solid #eee' }}>Division Log</TableCell>
                                                <TableCell sx={{ borderBottom: '1px solid #eee' }}>{row.date}</TableCell>
                                                <TableCell sx={{ borderBottom: '1px solid #eee' }}>
                                                    <Chip label="Pending" color="error" size="small" />
                                                </TableCell>
                                                <TableCell align="right" sx={{ borderBottom: '1px solid #eee' }}>
                                                    <Button size="small" onClick={() => navigate('/dashboard/muster')} sx={{ textTransform: 'none' }}>
                                                        Review
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </>
                                )}
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>

                {/* 3. Crop Book Widget */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper sx={{ p: 0, borderRadius: 2, height: '100%', border: '1px solid #ddd', overflow: 'hidden' }} elevation={0}>
                        <Box sx={{ p: 2, borderBottom: '1px solid #eee' }}>
                            <Typography variant="h6" fontWeight="bold">
                                Crop Book Summary
                            </Typography>
                        </Box>
                        <Table size="small">
                            <TableHead sx={{ bgcolor: '#E0E0E0' }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold', borderBottom: '2px solid #999' }}>Field</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', borderBottom: '2px solid #999' }}>Crop</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', borderBottom: '2px solid #999' }}>Area</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', borderBottom: '2px solid #999' }}>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {fields.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} align="center" sx={{ py: 3 }}>No fields found</TableCell>
                                    </TableRow>
                                ) : (
                                    fields.slice(0, 5).map((row) => (
                                        <TableRow key={row.fieldId}>
                                            <TableCell sx={{ borderBottom: '1px solid #eee' }}>{row.fieldNo}</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', borderBottom: '1px solid #eee' }}>{row.cropType}</TableCell>
                                            <TableCell sx={{ borderBottom: '1px solid #eee' }}>{row.areaAcres} Ac</TableCell>
                                            <TableCell sx={{ borderBottom: '1px solid #eee' }}>
                                                <Chip
                                                    label="Active"
                                                    size="small"
                                                    sx={{
                                                        bgcolor: '#E8F5E9',
                                                        color: '#2E7D32'
                                                    }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};
