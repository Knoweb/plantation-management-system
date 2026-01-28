import { useEffect, useState } from 'react';
import { Box, Typography, Button, Checkbox } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { Edit, CheckCircle, Warning } from '@mui/icons-material';

// Mock Data Structure matching PDF Page 7
interface MusterRow {
    id: string; // Work Item (e.g., Plucking)
    fieldNo: string;
    workers: number; // No of Workers
    // Dynamic columns for roles (Pluckers, Kangani, Tapping, etc.)
    hasPluckers: boolean;
    hasKangani: boolean;
    hasWeeding: boolean;
    hasTapping: boolean;
}

const MOCK_MUSTER_DATA: MusterRow[] = [
    { id: 'Plucking', fieldNo: '2A', workers: 15, hasPluckers: true, hasKangani: true, hasWeeding: false, hasTapping: false },
    { id: 'Chemical Weeding', fieldNo: '5', workers: 6, hasPluckers: false, hasKangani: false, hasWeeding: true, hasTapping: false },
    { id: 'Tapping', fieldNo: '21', workers: 12, hasPluckers: false, hasKangani: true, hasWeeding: false, hasTapping: true },
    { id: 'Total General', fieldNo: '-', workers: 33, hasPluckers: false, hasKangani: false, hasWeeding: false, hasTapping: false },
];

export const MorningMusterPage = () => {
    // Custom Render for the "Checklist" look
    const renderCheck = (params: any) => {
        if (!params.value) return <Box sx={{ width: 24, height: 24, borderRadius: '50%', border: '2px solid #ddd' }} />;
        // Specific icons for different roles as per PDF visuals (heads)
        return <CheckCircle color="success" />;
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'Work Item', width: 180, headerClassName: 'super-app-theme--header' },
        { field: 'fieldNo', headerName: 'Field No', width: 80, headerClassName: 'super-app-theme--header' },
        { field: 'workers', headerName: 'No of Workers', width: 100, headerClassName: 'super-app-theme--header' },

        // These mimic the visual columns "Pluckers", "Kangani" etc.
        { field: 'hasPluckers', headerName: 'Pluckers', width: 100, renderCell: renderCheck, headerClassName: 'super-app-theme--header' },
        { field: 'hasKangani', headerName: 'Kangani', width: 100, renderCell: renderCheck, headerClassName: 'super-app-theme--header' },
        { field: 'hasWeeding', headerName: 'Chemical Weeding', width: 140, renderCell: renderCheck, headerClassName: 'super-app-theme--header' },
        { field: 'hasTapping', headerName: 'Tapping', width: 100, renderCell: renderCheck, headerClassName: 'super-app-theme--header' },

        {
            field: 'actions',
            headerName: '',
            width: 80,
            renderCell: () => <Edit fontSize="small" color="action" />
        }
    ];

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box>
                    <Typography variant="h5" fontWeight="bold">Morning Muster</Typography>
                    <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                        <Button
                            variant="contained"
                            size="small"
                            startIcon={<CheckCircle />}
                            sx={{ bgcolor: '#4CAF50', borderRadius: '20px', textTransform: 'none' }}
                        >
                            Muster
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            color="error"
                            sx={{ borderRadius: '20px', textTransform: 'none' }}
                        >
                            Clear All
                        </Button>
                    </Box>
                </Box>

                <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="h6" fontWeight="bold" sx={{ bgcolor: '#2E5239', color: 'white', px: 3, py: 0.5, borderRadius: '4px 4px 0 0' }}>
                        Mr. S. Sahan
                    </Typography>
                    <Typography variant="caption" sx={{ display: 'block', bgcolor: '#1B3E29', color: 'white', py: 0.2 }}>
                        Field Officer
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ height: 400, width: '100%', bgcolor: 'white', border: '1px solid #ddd' }}>
                <DataGrid
                    rows={MOCK_MUSTER_DATA}
                    columns={columns}
                    hideFooter
                    sx={{
                        border: 'none',
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: '#E0E0E0',
                            fontWeight: 'bold',
                            borderBottom: '2px solid #999',
                            fontSize: '0.8rem'
                        },
                        '& .MuiDataGrid-cell': {
                            borderBottom: '1px solid #eee'
                        }
                    }}
                />
            </Box>
        </Box>
    );
};
