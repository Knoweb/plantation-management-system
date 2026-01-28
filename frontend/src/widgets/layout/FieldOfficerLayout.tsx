import { Box, Toolbar, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { FieldOfficerSidebar } from './FieldOfficerSidebar';
import { Header } from './Header'; // Reusing Header (Shared Component)

export const FieldOfficerLayout = () => {
    return (
        <Box sx={{ display: 'flex', bgcolor: '#F4F6F4', minHeight: '100vh' }}>
            <Header /> {/* Will dynamically show division if we add context later */}
            <FieldOfficerSidebar />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - 260px)` },
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Toolbar sx={{ height: 80 }} />

                <Box sx={{ flexGrow: 1 }}>
                    <Outlet />
                </Box>

                {/* Footer */}
                <Box sx={{ py: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, opacity: 0.8 }}>
                    <Typography variant="body2" color="text.secondary">Powered By</Typography>
                    <Box sx={{ width: 10, height: 10, bgcolor: '#FFD700', borderRadius: '50%' }} />
                    <Typography variant="subtitle2" fontWeight="bold" color="primary">
                        Plantec Ceylon (Pvt) Ltd.
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};
