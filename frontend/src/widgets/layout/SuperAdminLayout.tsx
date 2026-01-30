import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { Security } from '@mui/icons-material';

export const SuperAdminLayout = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#f4f6f8' }}>
            <AppBar position="static" sx={{ bgcolor: '#1a237e' }}> {/* Dark Blue for Admin */}
                <Toolbar>
                    <Security sx={{ mr: 2 }} />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Plantation Master Admin
                    </Typography>
                    <Button color="inherit" onClick={() => navigate('/login')}>Logout</Button>
                </Toolbar>
            </AppBar>
            <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
                <Outlet />
            </Box>
        </Box>
    );
};
