import { useEffect, useState } from 'react';
import { Box, Typography, Card, IconButton, Tooltip } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { fetchStockRequests } from '../../features/stock/api/stockApi';
import type { StockRequest } from '../../features/stock/model/stock';
import { CheckCircle, Cancel } from '@mui/icons-material';

export const StockApprovalPage = () => {
    const [requests, setRequests] = useState<StockRequest[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStockRequests().then(data => {
            setRequests(data);
            setLoading(false);
        });
    }, []);

    const columns: GridColDef[] = [
        { field: 'divisionId', headerName: 'Division', width: 130, headerClassName: 'super-app-theme--header' },
        { field: 'item', headerName: 'Item', width: 180, headerClassName: 'super-app-theme--header' },
        { field: 'unit', headerName: 'Unit', width: 70, headerClassName: 'super-app-theme--header' },
        { field: 'quantity', headerName: 'Qty', width: 90, type: 'number', headerClassName: 'super-app-theme--header' },
        {
            field: 'valueRs',
            headerName: 'Value (Rs)',
            width: 120,
            type: 'number',
            valueFormatter: (value: number) => `Rs. ${value.toLocaleString()}`,
            headerClassName: 'super-app-theme--header'
        },
        {
            field: 'availability',
            headerName: 'Availability',
            width: 120,
            type: 'number',
            headerClassName: 'super-app-theme--header',
            cellClassName: (params) => params.value < 100 ? 'low-stock' : 'normal-stock'
        },
        {
            field: 'actions',
            headerName: 'Approval',
            width: 150,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => (
                <Box>
                    <Tooltip title="Approve">
                        <IconButton color="success" size="small"><CheckCircle /></IconButton>
                    </Tooltip>
                    <Tooltip title="Reject">
                        <IconButton color="error" size="small"><Cancel /></IconButton>
                    </Tooltip>
                </Box>
            )
        }
    ];

    return (
        <Box>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h5" fontWeight="bold" color="text.primary">
                    Pending for approval for Stock requests
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    GC Division
                </Typography>
            </Box>

            <Card sx={{ height: 400, width: '100%', p: 0, overflow: 'hidden', border: '1px solid #ddd' }}>
                {/* Styled mimic of the PDF table style */}
                <DataGrid
                    rows={requests}
                    columns={columns}
                    getRowId={(row) => row.requestId}
                    loading={loading}
                    hideFooter
                    sx={{
                        border: 'none',
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: '#E0E0E0',
                            color: '#333',
                            fontWeight: 'bold',
                            borderBottom: '1px solid #999'
                        },
                        '& .MuiDataGrid-cell': {
                            borderBottom: '1px solid #eee'
                        },
                        '& .low-stock': {
                            color: '#d32f2f',
                            fontWeight: 'bold'
                        }
                    }}
                />
            </Card>
        </Box>
    );
};
