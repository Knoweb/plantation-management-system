import { useEffect, useState } from 'react';
import { Box, Typography, Card, Chip, Button } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { fetchMusterLogs } from '../../features/muster/api/musterApi';
import type { MusterLog, AttendanceRecord } from '../../features/muster/model/muster';
import { Add, CheckCircle, Warning } from '@mui/icons-material';

export const MusterPage = () => {
    const [logs, setLogs] = useState<MusterLog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMusterLogs().then(data => {
            setLogs(data);
            setLoading(false);
        });
    }, []);

    const columns: GridColDef[] = [
        { field: 'date', headerName: 'Date', width: 120 },
        { field: 'divisionId', headerName: 'Division', width: 130 },
        {
            field: 'attendanceCount',
            headerName: 'Workers',
            width: 100,
            valueGetter: (params, row) => {
                try {
                    const data = JSON.parse(row.attendanceData) as AttendanceRecord[];
                    return data.length;
                } catch (e) { return 0; }
            }
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 150,
            renderCell: (params) => {
                return params.row.isApproved ?
                    <Chip icon={<CheckCircle />} label="Approved" color="success" size="small" variant="outlined" /> :
                    <Chip icon={<Warning />} label="Pending" color="warning" size="small" variant="outlined" />;
            }
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <Button size="small" variant="text" color="primary">View Details</Button>
            )
        }
    ];

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h4" fontWeight="bold" color="primary.dark">
                    Muster Logs
                </Typography>
                <Button variant="contained" startIcon={<Add />}>
                    New Muster
                </Button>
            </Box>

            <Card sx={{ height: 500, width: '100%', p: 2 }}>
                <DataGrid
                    rows={logs}
                    columns={columns}
                    getRowId={(row) => row.musterId}
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
