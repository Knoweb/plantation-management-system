import { Box, Typography } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

// Mock Data for Work Program
const WORK_PROGRAM_DATA = [
    { id: 1, date: '2025-10-25', field: 'Field No 4', activity: 'Fertilizer Application', gang: 'Gang A', status: 'Scheduled' },
    { id: 2, date: '2025-10-25', field: 'Field No 2', activity: 'Pruning', gang: 'Gang B', status: 'Scheduled' },
    { id: 3, date: '2025-10-26', field: 'Field No 1', activity: 'Plucking', gang: 'Gang A', status: 'Draft' },
];

export const WorkProgramPage = () => {
    const columns: GridColDef[] = [
        { field: 'date', headerName: 'Date', width: 120, headerClassName: 'super-app-theme--header' },
        { field: 'field', headerName: 'Field Location', width: 150, headerClassName: 'super-app-theme--header' },
        { field: 'activity', headerName: 'Activity', width: 200, headerClassName: 'super-app-theme--header' },
        { field: 'gang', headerName: 'Assigned Gang', width: 130, headerClassName: 'super-app-theme--header' },
        {
            field: 'status',
            headerName: 'Status',
            width: 120,
            renderCell: (params) => (
                <Typography
                    variant="body2"
                    fontWeight="bold"
                    color={params.value === 'Scheduled' ? 'success.main' : 'warning.main'}
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
                    rows={WORK_PROGRAM_DATA}
                    columns={columns}
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
