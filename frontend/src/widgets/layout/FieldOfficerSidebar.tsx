import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography,
    Avatar
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 260;

// Field Officer Menu Items (from PDF Page 4)
const menuItems = [
    { text: 'Work Program', path: '/field-dashboard/program' },
    { text: 'Morning Muster', path: '/field-dashboard/muster-morning' },
    { text: 'Evening Muster', path: '/field-dashboard/muster-evening' },
    { text: 'Work Distribution', path: '/field-dashboard/distribution' },
    { text: 'Fertilizer Application', path: '/field-dashboard/fertilizer' },
    { text: 'Cost', path: '/field-dashboard/cost' },
    { text: 'Crop Achievement', path: '/field-dashboard/achievement' },
    { text: 'Order Request / Return', path: '/field-dashboard/orders' },
    { text: 'Leave Application', path: '/field-dashboard/leave' },
    { text: 'Correspondence', path: '/field-dashboard/messages' },
];

export const FieldOfficerSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    borderRight: 'none',
                    backgroundColor: '#2E5239', // Slightly darker green distinct from Manager
                    color: 'white',
                    paddingTop: '0px'
                },
            }}
        >
            {/* Profile Section (Distinct "Big Avatar" style from PDF) */}
            <Box sx={{
                p: 3,
                mb: 2,
                bgcolor: '#233126',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <Avatar sx={{ width: 64, height: 64, bgcolor: '#FFFFFF', color: '#1B5E20', mb: 1, fontWeight: 'bold' }}>
                    S
                </Avatar>
                <Typography variant="h6" fontWeight="bold">
                    Mr. S. Sahan
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.7 }}>
                    Field Officer
                </Typography>
            </Box>

            <List sx={{ px: 2 }}>
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                            <ListItemButton
                                onClick={() => navigate(item.path)}
                                selected={isActive}
                                sx={{
                                    borderRadius: '4px',
                                    py: 1,
                                    '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
                                    '&.Mui-selected': {
                                        bgcolor: '#4CAF50', // Brighter green highlight
                                        color: 'white',
                                        '&:hover': { bgcolor: '#66BB6A' },
                                    }
                                }}
                            >
                                <ListItemText
                                    primary={item.text}
                                    primaryTypographyProps={{ fontSize: '0.85rem' }}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>

            {/* Bottom Actions */}
            <Box sx={{ mt: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box
                    component="button"
                    sx={{
                        bgcolor: '#C62828',
                        color: 'white',
                        border: 'none',
                        py: 1,
                        borderRadius: '20px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}
                >
                    Main Menu
                </Box>
                <Box
                    component="button"
                    sx={{
                        bgcolor: '#C62828',
                        color: 'white',
                        border: 'none',
                        py: 1,
                        borderRadius: '20px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}
                >
                    Log Out
                </Box>
            </Box>
        </Drawer>
    );
};
