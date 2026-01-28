import { useEffect, useState } from 'react';
import { Box, Typography, Card, IconButton, Tooltip, Chip } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { fetchStockRequests, approveRequest, rejectRequest } from '../../features/stock/api/stockApi';
import type { StockTransaction } from '../../features/inventory/model/inventory';
import { CheckCircle, Cancel } from '@mui/icons-material';

export const StockApprovalPage = () => {
    const [requests, setRequests] = useState<StockTransaction[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setLoading(true);
        fetchStockRequests().then(data => {
            setRequests(data);
            setLoading(false);
        });
    };

    const handleApprove = async (id: string) => {
        await approveRequest(id);
        loadData(); // Refresh
    };

    const handleReject = async (id: string) => {
        await rejectRequest(id);
        loadData(); // Refresh
    };

    const columns: GridColDef[] = [
        {
            field: 'division',
            headerName: 'Division',
            width: 130,
            headerClassName: 'super-app-theme--header',
            valueGetter: (params, row) => row.reference || 'N/A' // Assuming reference holds Division info for now
        },
        {
            field: 'itemName',
            headerName: 'Item',
            width: 180,
            headerClassName: 'super-app-theme--header',
            valueGetter: (params, row) => row.item?.name
        },
        {
            field: 'unit',
            headerName: 'Unit',
            width: 70,
            headerClassName: 'super-app-theme--header',
            valueGetter: (params, row) => row.item?.unit
        },
        { field: 'quantity', headerName: 'Qty', width: 90, type: 'number', headerClassName: 'super-app-theme--header' },
        {
            field: 'valueRs',
            headerName: 'Value (Rs)',
            width: 120,
            type: 'number',
            valueGetter: (params, row) => (row.quantity * (row.item?.unitPrice || 0)),
            valueFormatter: (value: number) => `Rs. ${value?.toLocaleString()}`,
            headerClassName: 'super-app-theme--header'
        },
        {
            field: 'availability',
            headerName: 'Availability',
            width: 120,
            type: 'number',
            headerClassName: 'super-app-theme--header',
            valueGetter: (params, row) => row.item?.quantityOnHand,
            cellClassName: (params) => (params.value < 100 ? 'low-stock' : 'normal-stock')
        },
        {
            field: 'status', // New Status Column
            headerName: 'Status',
            width: 120,
            renderCell: (params) => (
                <Chip
                    label={params.value}
                    color={params.value === 'APPROVED' ? 'success' : params.value === 'REJECTED' ? 'error' : 'warning'}
                    size="small"
                />
            )
        },
        {
            field: 'actions',
            headerName: 'Approval',
            width: 150,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => (
                params.row.status === 'PENDING' && (
                    <Box>
                        <Tooltip title="Approve">
                            <IconButton color="success" size="small" onClick={() => handleApprove(params.row.id)}><CheckCircle /></IconButton>
                        </Tooltip>
                        <Tooltip title="Reject">
                            <IconButton color="error" size="small" onClick={() => handleReject(params.row.id)}><Cancel /></IconButton>
                        </Tooltip>
                    </Box>
                )
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
                <DataGrid
                    rows={requests}
                    columns={columns}
                    getRowId={(row) => row.id || Math.random()}
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
