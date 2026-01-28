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
import { fetchFields, submitHarvestLog } from '../../features/harvest/api/harvestApi';
import type { Field, HarvestLog } from '../../features/harvest/model/harvest';

interface HarvestDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export const HarvestDialog = ({ open, onClose, onSuccess }: HarvestDialogProps) => {
    const [fields, setFields] = useState<Field[]>([]);
    const [selectedField, setSelectedField] = useState('');
    const [quantity, setQuantity] = useState<number>(0);
    const [workerCount, setWorkerCount] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (open) {
            fetchFields().then(setFields).catch(console.error);
        }
    }, [open]);

    const handleSubmit = async () => {
        setLoading(true);
        setError('');

        try {
            const payload: HarvestLog = {
                tenantId: '00000000-0000-0000-0000-000000000000',
                date: new Date().toISOString().split('T')[0],
                field: { fieldId: selectedField } as any,
                quantityKg: quantity,
                deductionKg: 0, // Default 0 for now
                workerCount: workerCount,
                weatherCondition: 'Sunny', // Default
                rejectedWeightKg: 0,
                totalWeightKg: quantity
            };

            await submitHarvestLog(payload);
            onSuccess();
            onClose();
        } catch (err) {
            console.error(err);
            setError('Failed to submit harvest log.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Record Harvest</DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 1 }}>
                    {error && <Alert severity="error">{error}</Alert>}

                    <TextField
                        select
                        label="Field"
                        value={selectedField}
                        onChange={(e) => setSelectedField(e.target.value)}
                        fullWidth
                    >
                        {fields.map((field) => (
                            <MenuItem key={field.fieldId} value={field.fieldId}>
                                {field.fieldNo} - {field.cropType}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        type="number"
                        label="Total Quantity (Kg)"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        fullWidth
                    />

                    <TextField
                        type="number"
                        label="Worker Count"
                        value={workerCount}
                        onChange={(e) => setWorkerCount(Number(e.target.value))}
                        fullWidth
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    disabled={loading || !selectedField || quantity <= 0}
                >
                    {loading ? 'Submitting...' : 'Submit'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
