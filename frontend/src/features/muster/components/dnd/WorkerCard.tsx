import { Draggable } from '@hello-pangea/dnd';
import { Paper, Typography, Box, Avatar } from '@mui/material';
import { Person } from '@mui/icons-material';

interface Worker {
    id: string;
    name: string;
    skills: string[];
}

interface WorkerCardProps {
    worker: Worker;
    index: number;
}

export const WorkerCard = ({ worker, index }: WorkerCardProps) => {
    return (
        <Draggable draggableId={worker.id} index={index}>
            {(provided, snapshot) => (
                <Paper
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    elevation={snapshot.isDragging ? 3 : 1}
                    sx={{
                        p: 1.5,
                        mb: 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        bgcolor: snapshot.isDragging ? '#E8F5E9' : '#FFFFFF',
                        border: '1px solid #EEEEEE',
                        '&:hover': {
                            bgcolor: '#F5F5F5'
                        }
                    }}
                >
                    <Avatar sx={{ width: 32, height: 32, bgcolor: '#4E7D5B' }}>
                        <Person fontSize="small" />
                    </Avatar>
                    <Box>
                        <Typography variant="body2" fontWeight="600">
                            {worker.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {worker.skills.join(', ')}
                        </Typography>
                    </Box>
                </Paper>
            )}
        </Draggable>
    );
};
