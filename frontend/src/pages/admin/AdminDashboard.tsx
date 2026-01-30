import { useEffect, useState } from 'react';
import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableHead, TableRow, Chip, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Alert } from '@mui/material';
import { Add, Business, VerifiedUser } from '@mui/icons-material';
import { getAllTenants, registerTenant } from '../../features/admin/api/superAdminApi';

// Inlined Types to fix import error
interface Tenant {
    tenantId: string;
    name: string;
    domain: string;
    subscriptionPlan: 'FREE' | 'PRO' | 'ENTERPRISE';
    status: 'ACTIVE' | 'SUSPENDED' | 'PENDING_APPROVAL';
    createdAt: string;
}

interface TenantCreationRequest {
    name: string;
    domain: string;
    subscriptionPlan: 'FREE' | 'PRO' | 'ENTERPRISE';
}

export const AdminDashboard = () => {
    const [tenants, setTenants] = useState<Tenant[]>([]);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState<TenantCreationRequest>({ name: '', domain: '', subscriptionPlan: 'FREE' });
    const [error, setError] = useState<string | null>(null);

    const loadData = async () => {
        try {
            const data = await getAllTenants();
            setTenants(data);
            setError(null);
        } catch (e) {
            console.error(e);
            setError("Failed to connect to backend service.");
        }
    };

    useEffect(() => { loadData(); }, []);

    const handleCreate = async () => {
        try {
            await registerTenant(formData);
            setOpen(false);
            loadData();
            setFormData({ name: '', domain: '', subscriptionPlan: 'FREE' });
        } catch (e) {
            alert("Failed to create tenant. Domain might be duplicate.");
        }
    };

    return (
        <Box sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                <Typography variant="h4" fontWeight="bold">Plantation Master Admin</Typography>
                <Button variant="contained" startIcon={<Add />} onClick={() => setOpen(true)}>New Tenant</Button>
            </Box>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Domain</TableCell>
                            <TableCell>Plan</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tenants.map(t => (
                            <TableRow key={t.tenantId}>
                                <TableCell sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Business color="action" /> {t.name}
                                </TableCell>
                                <TableCell>{t.domain}</TableCell>
                                <TableCell><Chip label={t.subscriptionPlan} size="small" /></TableCell>
                                <TableCell><Chip label={t.status} color="success" size="small" /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>

            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Register New Plantation</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                        <TextField label="Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} fullWidth />
                        <TextField label="Domain" value={formData.domain} onChange={e => setFormData({ ...formData, domain: e.target.value })} fullWidth />
                        <TextField select label="Plan" value={formData.subscriptionPlan} onChange={e => setFormData({ ...formData, subscriptionPlan: e.target.value as any })} fullWidth>
                            <MenuItem value="FREE">Free</MenuItem>
                            <MenuItem value="PRO">Pro</MenuItem>
                            <MenuItem value="ENTERPRISE">Enterprise</MenuItem>
                        </TextField>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleCreate}>Register</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};
