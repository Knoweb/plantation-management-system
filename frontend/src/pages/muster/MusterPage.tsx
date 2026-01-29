import { useEffect, useState } from 'react';
import { Box, Typography, Card, Chip, Button, Dialog, DialogTitle, DialogContent, DialogActions, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { fetchMusterLogs, fetchFields, approveMuster } from '../../features/muster/api/musterApi';
import type { MusterLog, AttendanceRecord, Field } from '../../features/muster/model/muster';
import { Add, CheckCircle, Warning } from '@mui/icons-material';

import { MusterDialog } from './MusterDialog';

// New Detail Dialog Component
const MusterDetailsDialog = ({ open, onClose, log, fields }: { open: boolean; onClose: () => void; log: MusterLog | null; fields: Field[] }) => {
    if (!log) return null;

    const attendance = (() => {
        try {
            return JSON.parse(log.attendanceData) as AttendanceRecord[];
        } catch { return []; }
    })();

    const getFieldName = (id: string) => {
        const field = fields.find(f => f.fieldId === id);
        return field ? field.fieldNo : (id || 'General');
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Muster Details</DialogTitle>
            <DialogContent dividers>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">Division</Typography>
                    <Typography variant="body1">{log.division?.name || 'Unknown'}</Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">Date</Typography>
                    <Typography variant="body1">{log.date}</Typography>
                </Box>

                <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Worker Breakdown</Typography>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Field No</TableCell>
                            <TableCell align="right">Count</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {attendance.length === 0 ? (
                            <TableRow><TableCell colSpan={2}>No data available</TableCell></TableRow>
                        ) : (
                            attendance.map((record, index) => (
                                <TableRow key={index}>
                                    <TableCell>{getFieldName(record.fieldId as string)}</TableCell>
                                    <TableCell align="right">{record.count}</TableCell>
                                </TableRow>
                            ))
                        )}
                        <TableRow sx={{ bgcolor: '#fafafa' }}>
                            <TableCell sx={{ fontWeight: 'bold' }}>Total</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                                {attendance.reduce((sum, item) => sum + (Number(item.count) || 0), 0)}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export const MusterPage = () => {
    const [logs, setLogs] = useState<MusterLog[]>([]);
    const [fields, setFields] = useState<Field[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCreateOpen, setCreateOpen] = useState(false);
    const [viewLog, setViewLog] = useState<MusterLog | null>(null);

    const loadData = () => {
        setLoading(true);
        Promise.all([fetchMusterLogs(), fetchFields()]).then(([logData, fieldData]) => {
            setLogs(logData);
            setFields(fieldData);
            setLoading(false);
        });
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleApprove = async (log: MusterLog) => {
        try {
            // Hardcoded 'Manager' ID for now
            await approveMuster(log.musterId, '00000000-0000-0000-0000-000000000000');
            loadData(); // Refresh list
        } catch (e) {
            console.error("Failed to approve", e);
        }
    };

    const columns: GridColDef[] = [
        { field: 'date', headerName: 'Date', width: 120 },
        {
            field: 'division',
            headerName: 'Division',
            width: 150,
            valueGetter: (div) => div?.name || 'N/A' // MUI v8: value comes directly
        },
        {
            field: 'attendanceCount',
            headerName: 'Workers',
            width: 100,
            valueGetter: (value, row) => {
                try {
                    const data = JSON.parse(row.attendanceData) as AttendanceRecord[];
                    return data.reduce((sum, item) => sum + (Number(item.count) || 0), 0);
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
            width: 250,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', gap: 1 }}>
                    {!params.row.isApproved && (
                        <Button
                            size="small"
                            variant="contained"
                            color="success"
                            startIcon={<CheckCircle />}
                            onClick={() => handleApprove(params.row)}
                            sx={{ textTransform: 'none' }}
                        >
                            Approve
                        </Button>
                    )}
                    <Button
                        size="small"
                        variant="contained"
                        color="inherit"
                        onClick={() => setViewLog(params.row)}
                        sx={{ textTransform: 'none', bg: '#f5f5f5' }}
                    >
                        View Details
                    </Button>
                </Box>
            )
        }
    ];

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h4" fontWeight="bold" color="primary.dark">
                    Muster Logs
                </Typography>
                <Button variant="contained" startIcon={<Add />} onClick={() => setCreateOpen(true)}>
                    New Muster
                </Button>
            </Box>

            <MusterDialog
                open={isCreateOpen}
                onClose={() => setCreateOpen(false)}
                onSuccess={loadData}
            />

            {/* View Details Dialog */}
            <MusterDetailsDialog
                open={!!viewLog}
                onClose={() => setViewLog(null)}
                log={viewLog}
                fields={fields}
            />

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
