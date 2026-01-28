import { Droppable } from '@hello-pangea/dnd';
import { Box, Paper, Typography, Chip } from '@mui/material';
import { WorkerCard } from './WorkerCard';

interface Worker {
    id: string;
    name: string;
    skills: string[];
}

interface ColumnProps {
    columnId: string;
    title: string;
    workers: Worker[];
    color?: string;
}

export const Column = ({ columnId, title, workers, color = '#F5F5F5' }: ColumnProps) => {
    return (
        <Paper
            elevation={0}
            sx={{
                width: 300,
                bgcolor: '#F9FAFB',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                maxHeight: 600
            }}
        >
            <Box sx={{ p: 2, bgcolor: 'white', borderBottom: '1px solid #EEE' }}>
                <Typography variant="subtitle1" fontWeight="bold">
                    {title}
                </Typography>
                <Chip
                    label={`${workers.length} Workers`}
                    size="small"
                    sx={{ mt: 0.5, bgcolor: color, color: 'text.primary', fontWeight: 600 }}
                />
            </Box>

            <Droppable droppableId={columnId}>
                {(provided, snapshot) => (
                    <Box
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        sx={{
                            p: 1,
                            flexGrow: 1,
                            overflowY: 'auto',
                            bgcolor: snapshot.isDraggingOver ? '#F1F8E9' : 'transparent',
                            transition: 'background-color 0.2s ease'
                        }}
                    >
                        {workers.map((worker, index) => (
                            <WorkerCard key={worker.id} worker={worker} index={index} />
                        ))}
                        {provided.placeholder}
                    </Box>
                )}
            </Droppable>
        </Paper>
    );
};
