import { Box, Toolbar, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const DashboardLayout = () => {
    return (
        <Box sx={{ display: 'flex', bgcolor: '#F4F6F4', minHeight: '100vh' }}> {/* Light greenish-gray bg */}
            <Header />
            <Sidebar />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - 240px)` },
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Toolbar sx={{ height: 80 }} /> {/* Spacing for the Taller Header */}

                <Box sx={{ flexGrow: 1 }}>
                    <Outlet />
                </Box>

                {/* Footer */}
                <Box sx={{ py: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, opacity: 0.8 }}>
                    <Typography variant="body2" color="text.secondary">Powered By</Typography>
                    <Box sx={{ width: 10, height: 10, bgcolor: '#FFD700', borderRadius: '50%' }} /> {/* Logo dot placeholder */}
                    <Typography variant="subtitle2" fontWeight="bold" color="primary">
                        Plantec Ceylon (Pvt) Ltd.
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};
