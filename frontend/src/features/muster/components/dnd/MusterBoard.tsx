import { useState, useEffect } from 'react';
import { DragDropContext, type DropResult } from '@hello-pangea/dnd';
import { Box, Typography, Button, Snackbar, Alert } from '@mui/material';
import { Save } from '@mui/icons-material';
import { Column } from './Column';
import { fetchFields } from '../../../harvest/api/harvestApi';

// Mock Workers (as we don't have Employee Service yet)
const INITIAL_WORKERS = [
    { id: 'w1', name: 'Raju', skills: ['Plucker'] },
    { id: 'w2', name: 'Sita', skills: ['Weeder'] },
    { id: 'w3', name: 'Kamal', skills: ['Plucker', 'Pruner'] },
    { id: 'w4', name: 'Nimal', skills: ['Plucker'] },
    { id: 'w5', name: 'Vani', skills: ['Weeder'] },
    { id: 'w6', name: 'Sunil', skills: ['Plucker'] },
    { id: 'w7', name: 'Mala', skills: ['Weeder'] },
    { id: 'w8', name: 'Jaya', skills: ['Pruner'] },
];

interface BoardData {
    workers: Record<string, any>;
    columns: Record<string, any>;
    columnOrder: string[];
}

export const MusterBoard = () => {
    const [data, setData] = useState<BoardData | null>(null);
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState({ open: false, message: '' });

    useEffect(() => {
        const load = async () => {
            // 1. Fetch Real Fields from Backend
            const fields = await fetchFields();

            // 2. Build Columns Map
            const fieldColumns: Record<string, any> = {};
            const fieldIds: string[] = [];

            fields.forEach((f: any) => {
                fieldColumns[f.fieldId] = {
                    id: f.fieldId,
                    title: `Field: ${f.fieldNo} (${f.cropType})`,
                    workerIds: [],
                    color: '#E8F5E9' // Green tint
                };
                fieldIds.push(f.fieldId);
            });

            // 3. Setup Pool
            const workersMap: Record<string, any> = {};
            const poolIds: string[] = [];
            INITIAL_WORKERS.forEach(w => {
                workersMap[w.id] = w;
                poolIds.push(w.id);
            });

            setData({
                workers: workersMap,
                columns: {
                    'pool': { id: 'pool', title: 'Available Pool', workerIds: poolIds, color: '#ECEFF1' },
                    ...fieldColumns
                },
                columnOrder: ['pool', ...fieldIds]
            });
        };
        load();
    }, []);

    const onDragEnd = (result: DropResult) => {
        if (!data) return;
        const { destination, source, draggableId } = result;

        if (!destination) return;
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) return;

        const start = data.columns[source.droppableId];
        const finish = data.columns[destination.droppableId];

        if (start === finish) {
            const newWorkerIds = Array.from(start.workerIds);
            newWorkerIds.splice(source.index, 1);
            newWorkerIds.splice(destination.index, 0, draggableId);

            const newColumn = { ...start, workerIds: newWorkerIds };
            setData((prev) => prev ? ({
                ...prev,
                columns: { ...prev.columns, [newColumn.id]: newColumn }
            }) : null);
            return;
        }

        // Moving from one list to another
        const startWorkerIds = Array.from(start.workerIds);
        startWorkerIds.splice(source.index, 1);
        const newStart = { ...start, workerIds: startWorkerIds };

        const finishWorkerIds = Array.from(finish.workerIds);
        finishWorkerIds.splice(destination.index, 0, draggableId);
        const newFinish = { ...finish, workerIds: finishWorkerIds };

        setData((prev) => prev ? ({
            ...prev,
            columns: {
                ...prev.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            }
        }) : null);
    };

    const handleSave = () => {
        setSaving(true);
        // Simulate API call
        setTimeout(() => {
            console.log("Saving Muster Configuration:", data);
            setSaving(false);
            setToast({ open: true, message: 'Muster assignments saved successfully!' });
        }, 1000);
    };

    if (!data) return <Typography>Loading Board...</Typography>;

    return (
        <Box sx={{ height: '100%', overflowX: 'auto', p: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h4" fontWeight="bold" color="primary.dark">
                    Digital Muster Board
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Save />}
                    onClick={handleSave}
                    disabled={saving}
                >
                    {saving ? 'Saving...' : 'Save Assignments'}
                </Button>
            </Box>

            <DragDropContext onDragEnd={onDragEnd}>
                <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start', minWidth: 'min-content' }}>
                    {data.columnOrder.map((columnId) => {
                        const column = data.columns[columnId];
                        const workers = column.workerIds.map((workerId: string) => data.workers[workerId]);

                        return (
                            <Column
                                key={column.id}
                                columnId={column.id}
                                title={column.title}
                                workers={workers}
                                color={column.color}
                            />
                        );
                    })}
                </Box>
            </DragDropContext>

            <Snackbar
                open={toast.open}
                autoHideDuration={4000}
                onClose={() => setToast({ ...toast, open: false })}
            >
                <Alert severity="success" variant="filled">
                    {toast.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};
