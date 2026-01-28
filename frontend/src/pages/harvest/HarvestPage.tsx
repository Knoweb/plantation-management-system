import { useEffect, useState } from 'react';
import { Box, Typography, Card, Chip, Button } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { fetchHarvestLogs } from '../../features/harvest/api/harvestApi';
import type { HarvestLog } from '../../features/harvest/model/harvest';
import { Add, Agriculture } from '@mui/icons-material';

export const HarvestPage = () => {
    const [logs, setLogs] = useState<HarvestLog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHarvestLogs().then(data => {
            setLogs(data);
            setLoading(false);
        });
    }, []);

    const columns: GridColDef[] = [
        { field: 'date', headerName: 'Date', width: 120 },
        { field: 'fieldId', headerName: 'Field ID', width: 130 },
        {
            field: 'cropType',
            headerName: 'Crop',
            width: 100,
            renderCell: (params) => (
                <Chip
                    icon={<Agriculture sx={{ fontSize: 16 }} />}
                    label={params.value}
                    color="success"
                    variant="outlined"
                    size="small"
                />
            )
        },
        {
            field: 'netWeightKg',
            headerName: 'Net Weight (Kg)',
            width: 150,
            type: 'number',
            align: 'right',
            headerAlign: 'right',
            valueFormatter: (value: number) => `${value.toFixed(1)} kg`
        },
        {
            field: 'quality',
            headerName: 'Quality',
            width: 120,
            valueGetter: (params, row) => {
                const rejectionRate = (row.rejectedWeightKg / row.totalWeightKg) * 100;
                return rejectionRate < 5 ? 'High' : 'Medium';
            },
            renderCell: (params) => (
                <Typography variant="body2" color={params.value === 'High' ? 'success.main' : 'warning.main'} fontWeight="bold">
                    {params.value}
                </Typography>
            )
        }
    ];

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h4" fontWeight="bold" color="primary.dark">
                    Harvest Logs
                </Typography>
                <Button variant="contained" startIcon={<Add />}>
                    Record Harvest
                </Button>
            </Box>

            <Card sx={{ height: 500, width: '100%', p: 2 }}>
                <DataGrid
                    rows={logs}
                    columns={columns}
                    getRowId={(row) => row.harvestId}
                    loading={loading}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    disableRowSelectionOnClick
                    sx={{
                        border: 'none',
                        '& .MuiDataGrid-cell': {
                            fontSize: '0.95rem'
                        },
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: '#F5F5F5',
                            fontWeight: 600,
                            color: 'text.secondary'
                        }
                    }}
                />
            </Card>
        </Box>
    );
};
