import { useEffect, useState } from 'react';
import { Box, Paper, Typography, Chip, LinearProgress } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { fetchInventoryItems } from '../../features/inventory/api/inventoryApi';
import type { InventoryItem } from '../../features/inventory/model/inventory';

export const InventoryPage = () => {
    const [items, setItems] = useState<InventoryItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        const data = await fetchInventoryItems();
        setItems(data);
        setLoading(false);
    };

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Item Name', flex: 1, minWidth: 250 },
        {
            field: 'type',
            headerName: 'Category',
            width: 150,
            renderCell: (params) => (
                <Chip
                    label={params.value}
                    size="small"
                    color={params.value === 'FERTILIZER' ? 'success' : 'default'}
                />
            )
        },
        { field: 'unit', headerName: 'Unit', width: 100 },
        {
            field: 'quantityOnHand',
            headerName: 'Stock Level',
            width: 150,
            type: 'number',
            renderCell: (params) => (
                <Box sx={{ width: '100%' }}>
                    <Typography variant="body2">{params.value}</Typography>
                    {params.row.reorderLevel && params.value <= params.row.reorderLevel && (
                        <Typography variant="caption" color="error">Low Stock!</Typography>
                    )}
                </Box>
            )
        },
        { field: 'reorderLevel', headerName: 'Reorder Level', width: 150, type: 'number' },
        { field: 'unitPrice', headerName: 'Unit Price (LKR)', width: 150, type: 'number' },
    ];

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
                Inventory Management
            </Typography>

            <Paper sx={{ height: 600, width: '100%', p: 2 }}>
                {loading ? (
                    <LinearProgress />
                ) : (
                    <DataGrid
                        rows={items}
                        columns={columns}
                        getRowId={(row) => row.id || Math.random()}
                        pageSizeOptions={[5, 10, 20]}
                        initialState={{
                            pagination: { paginationModel: { pageSize: 10 } },
                        }}
                    />
                )}
            </Paper>
        </Box>
    );
};
