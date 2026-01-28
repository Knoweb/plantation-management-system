import { useState } from 'react';
import { DragDropContext, type DropResult } from '@hello-pangea/dnd';
import { Box, Typography } from '@mui/material';
import { Column } from './Column';

const INITIAL_DATA = {
    workers: {
        'w1': { id: 'w1', name: 'Raju', skills: ['Plucker'] },
        'w2': { id: 'w2', name: 'Sita', skills: ['Weeder'] },
        'w3': { id: 'w3', name: 'Kamal', skills: ['Plucker', 'Pruner'] },
        'w4': { id: 'w4', name: 'Nimal', skills: ['Plucker'] },
        'w5': { id: 'w5', name: 'Vani', skills: ['Weeder'] },
    },
    columns: {
        'pool': {
            id: 'pool',
            title: 'Available Pool',
            workerIds: ['w1', 'w2', 'w3', 'w4', 'w5'],
            color: '#ECEFF1'
        },
        'f001': {
            id: 'f001',
            title: 'Field No: F-001',
            workerIds: [],
            color: '#C8E6C9'
        },
        'f002': {
            id: 'f002',
            title: 'Field No: F-002',
            workerIds: [],
            color: '#B3E5FC'
        }
    },
    columnOrder: ['pool', 'f001', 'f002']
};

export const MusterBoard = () => {
    const [data, setData] = useState(INITIAL_DATA);

    const onDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        // Logic to move worker from start col to finish col
        const start = data.columns[source.droppableId as keyof typeof data.columns];
        const finish = data.columns[destination.droppableId as keyof typeof data.columns];

        if (start === finish) {
            const newWorkerIds = Array.from(start.workerIds);
            newWorkerIds.splice(source.index, 1);
            newWorkerIds.splice(destination.index, 0, draggableId);

            const newColumn = { ...start, workerIds: newWorkerIds };
            setData((prev) => ({
                ...prev,
                columns: { ...prev.columns, [newColumn.id]: newColumn }
            }));
            return;
        }

        // Moving from one list to another
        const startWorkerIds = Array.from(start.workerIds);
        startWorkerIds.splice(source.index, 1);
        const newStart = { ...start, workerIds: startWorkerIds };

        const finishWorkerIds = Array.from(finish.workerIds);
        finishWorkerIds.splice(destination.index, 0, draggableId);
        const newFinish = { ...finish, workerIds: finishWorkerIds };

        setData((prev) => ({
            ...prev,
            columns: {
                ...prev.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            }
        }));
    };

    return (
        <Box sx={{ height: '100%', overflowX: 'auto' }}>
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }} color="primary.dark">
                Digital Muster Board
            </Typography>

            <DragDropContext onDragEnd={onDragEnd}>
                <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
                    {data.columnOrder.map((columnId) => {
                        const column = data.columns[columnId as keyof typeof data.columns];
                        const workers = column.workerIds.map((workerId) => data.workers[workerId as keyof typeof data.workers]);

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
        </Box>
    );
};
