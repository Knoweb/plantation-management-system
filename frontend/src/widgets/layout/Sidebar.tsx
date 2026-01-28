import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography,
    useTheme
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

// Manager Dashboard Menu Items (from PDF Page 4)
const menuItems = [
    { text: 'GC Division', path: '/dashboard/division/gc' },
    { text: 'SS Division', path: '/dashboard/division/ss' },
    { text: 'FD Division', path: '/dashboard/division/fd' },
    { text: 'MK Division', path: '/dashboard/division/mk' },
    { text: 'Stock', path: '/dashboard/stock' },
    { text: 'Fertilizer Program', path: '/dashboard/fertilizer' },
    { text: 'Crop Books', path: '/dashboard/harvest' }, // Mapping Harvest to Crop Books for now
    { text: 'Order Approval', path: '/dashboard/orders' },
    { text: 'KPI', path: '/dashboard/kpi' },
    { text: 'Work Distribution', path: '/dashboard/work-distribution' },
];

export const Sidebar = () => {
    const theme = useTheme();
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
                    backgroundColor: '#4E7D5B', // Matching the Dark Green Sidebar from the mock
                    color: 'white',
                    paddingTop: '20px'
                },
            }}
        >
            {/* Profile Section inside Sidebar (as seen in some layouts) or just List */}
            <Box sx={{ px: 2, mb: 4 }}>
                <Typography variant="h6" fontWeight="bold" sx={{ color: 'white', opacity: 0.9 }}>
                    Mr.Nanayakkara
                </Typography>
                <Typography variant="caption" sx={{ color: 'white', opacity: 0.7 }}>
                    Manager
                </Typography>
            </Box>

            <List sx={{ px: 2 }}>
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path || (item.text === "Crop Books" && location.pathname.includes("harvest"));
                    return (
                        <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                            <ListItemButton
                                onClick={() => navigate(item.path)}
                                selected={isActive}
                                sx={{
                                    borderRadius: '4px',
                                    py: 1.5,
                                    bgcolor: isActive ? '#6A9B76' : 'transparent', // Lighter green for active
                                    '&:hover': {
                                        bgcolor: '#5E8B6A',
                                    },
                                    '&.Mui-selected': {
                                        bgcolor: '#81C784', // Bright green highlight for selected
                                        color: '#1B5E20', // Dark text on selected
                                        '&:hover': {
                                            bgcolor: '#A5D6A7',
                                        },
                                    }
                                }}
                            >
                                <ListItemText
                                    primary={item.text}
                                    primaryTypographyProps={{
                                        fontSize: '0.9rem',
                                        fontWeight: isActive ? 600 : 500,
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>

            {/* Messages / Footer Buttons area if needed */}
        </Drawer>
    );
};
