import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { fetchWorkAssignments } from '../../features/field-ops/api/workProgramApi';
import type { WorkAssignment } from '../../features/field-ops/model/workProgram';

export const WorkProgramPage = () => {
    const [assignments, setAssignments] = useState<WorkAssignment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAssignments();
    }, []);

    const loadAssignments = async () => {
        try {
            const data = await fetchWorkAssignments();
            setAssignments(data);
        } catch (error) {
            console.error('Error loading work assignments:', error);
        } finally {
            setLoading(false);
        }
    };

    const columns: GridColDef[] = [
        {
            field: 'date',
            headerName: 'Date',
            width: 120,
            headerClassName: 'super-app-theme--header',
            valueFormatter: (value: any) => new Date(value).toLocaleDateString()
        },
        {
            field: 'field',
            headerName: 'Field Location',
            width: 150,
            headerClassName: 'super-app-theme--header',
            valueGetter: (_value, row) => row.field?.fieldNo || 'N/A'
        },
        { field: 'activity', headerName: 'Activity', width: 200, headerClassName: 'super-app-theme--header' },
        { field: 'gangName', headerName: 'Assigned Gang', width: 130, headerClassName: 'super-app-theme--header' },
        {
            field: 'status',
            headerName: 'Status',
            width: 120,
            renderCell: (params: any) => (
                <Typography
                    variant="body2"
                    fontWeight="bold"
                    color={params.value === 'SCHEDULED' ? 'warning.main' : 'success.main'}
                >
                    {params.value}
                </Typography>
            ),
            headerClassName: 'super-app-theme--header'
        }
    ];

    return (
        <Box>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h5" fontWeight="bold">Work Program</Typography>
                <Typography variant="body2" color="text.secondary">Upcoming Field Activities</Typography>
            </Box>

            <Box sx={{ height: 400, width: '100%', bgcolor: 'white' }}>
                <DataGrid
                    rows={assignments}
                    getRowId={(row) => row.assignmentId}
                    columns={columns}
                    loading={loading}
                    hideFooter
                    sx={{
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: '#E0E0E0',
                            fontWeight: 'bold'
                        }
                    }}
                />
            </Box>
        </Box>
    );
};
