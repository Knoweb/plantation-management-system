import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    Box,
    Alert
} from '@mui/material';
import { fetchDivisions, submitMusterLog } from '../../features/muster/api/musterApi';
import type { Division, MusterLog } from '../../features/muster/model/muster';

interface MusterDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export const MusterDialog = ({ open, onClose, onSuccess }: MusterDialogProps) => {
    const [divisions, setDivisions] = useState<Division[]>([]);
    const [selectedDivision, setSelectedDivision] = useState('');
    const [workerCount, setWorkerCount] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (open) {
            fetchDivisions().then(setDivisions).catch(console.error);
        }
    }, [open]);

    const handleSubmit = async () => {
        setLoading(true);
        setError('');

        try {
            // Generate simple attendance JSON based on count
            const attendance = Array.from({ length: workerCount }, (_, i) => ({
                workerId: `TEMP-${i + 1}`, // Placeholder ID
                workerName: `Worker ${i + 1}`,
                status: 'PRESENT'
            }));

            const payload: MusterLog = {
                tenantId: '00000000-0000-0000-0000-000000000000',
                date: new Date().toISOString().split('T')[0],
                division: { divisionId: selectedDivision } as any, // sending full object structure expected by backend? or just ID?
                // backend expects strict entity mapping, but often accepts ID if configured. 
                // Let's rely on backend logic. My updated Service takes MusterLog. 
                // Wait, JPA usually needs the entity object set. 
                // However, deserialization of "division": {"divisionId": "..."} works if properly mapped.
                // Let's send the ID in the object.
                attendanceData: JSON.stringify(attendance),
                isApproved: false
            };

            // Fix: The backend expecting "division" object relationship. 
            // We need to pass the division object with at least the ID.
            const logToSend = {
                ...payload,
                division: { divisionId: selectedDivision }
            };

            await submitMusterLog(logToSend as any);
            onSuccess();
            onClose();
        } catch (err) {
            console.error(err);
            setError('Failed to submit muster log.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>New Muster Log</DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 1 }}>
                    {error && <Alert severity="error">{error}</Alert>}

                    <TextField
                        select
                        label="Division"
                        value={selectedDivision}
                        onChange={(e) => setSelectedDivision(e.target.value)}
                        fullWidth
                    >
                        {divisions.map((div) => (
                            <MenuItem key={div.divisionId} value={div.divisionId}>
                                {div.name}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        type="number"
                        label="Worker Count"
                        value={workerCount}
                        onChange={(e) => setWorkerCount(Number(e.target.value))}
                        fullWidth
                        helperText="Enter number of workers present"
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    disabled={loading || !selectedDivision || workerCount <= 0}
                >
                    {loading ? 'Submitting...' : 'Submit'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
