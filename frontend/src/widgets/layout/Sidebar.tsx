import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Dashboard,
    Agriculture,
    Inventory,
    ListAlt,
    People,
    TrendingUp,
    AssignmentInd,
    PlaylistAddCheck
} from '@mui/icons-material';

const drawerWidth = 240;

// Manager Dashboard Menu Items
const menuItems = [
    { text: 'Overview', icon: <Dashboard />, path: '/dashboard' },
    { text: 'Digital Muster', icon: <People />, path: '/dashboard/digital-muster' },
    { text: 'Muster Logs', icon: <ListAlt />, path: '/dashboard/muster' },
    { text: 'Crop Books', icon: <Agriculture />, path: '/dashboard/harvest' },
    { text: 'Stock Approvals', icon: <PlaylistAddCheck />, path: '/dashboard/orders' },
    { text: 'Inventory', icon: <Inventory />, path: '/dashboard/inventory' },
    { text: 'KPI', icon: <TrendingUp />, path: '/dashboard/kpi' },
    { text: 'Work Distribution', icon: <AssignmentInd />, path: '/dashboard/work-distribution' },
];

export const Sidebar = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();

    // Deep Plantation Green Gradient
    const sidebarBg = 'linear-gradient(180deg, #0F3d2E 0%, #1B5E20 100%)';
    const activeBg = 'rgba(255, 255, 255, 0.15)';
    const hoverBg = 'rgba(255, 255, 255, 0.08)';

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    borderRight: '1px solid rgba(255,255,255,0.1)',
                    background: sidebarBg,
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column'
                },
            }}
        >
            {/* 1. Header / Logo Area */}
            <Box sx={{
                p: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}>
                {/* Placeholder for Logo */}
                <Typography variant="h6" fontWeight="800" letterSpacing={1} sx={{ color: '#81C784' }}>
                    PLANTATION
                </Typography>
            </Box>

            {/* 2. Profile Section (Compact) */}
            <Box sx={{
                px: 3,
                py: 3,
                mb: 1,
                textAlign: 'left'
            }}>
                <Typography variant="caption" sx={{ color: '#A5D6A7', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 'bold' }}>
                    Welcome
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ color: 'white', mt: 0.5 }}>
                    {JSON.parse(sessionStorage.getItem('user') || '{}').name || 'Manager'}
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                    {sessionStorage.getItem('role') || 'Manager'}
                </Typography>
            </Box>

            {/* 3. Navigation Menu */}
            <List sx={{ px: 2, flexGrow: 1 }}>
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path || (item.text === "Crop Books" && location.pathname.includes("harvest"));
                    return (
                        <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                            <ListItemButton
                                onClick={() => navigate(item.path)}
                                selected={isActive}
                                sx={{
                                    borderRadius: '12px', // Modern pill shape
                                    py: 1.2,
                                    px: 2,
                                    mb: 0.5,
                                    transition: 'all 0.2s ease-in-out',
                                    bgcolor: isActive ? activeBg : 'transparent',
                                    borderLeft: isActive ? '4px solid #66BB6A' : '4px solid transparent', // Active indicator
                                    '&:hover': {
                                        bgcolor: hoverBg,
                                        transform: 'translateX(4px)' // Subtle hover movement
                                    },
                                    '&.Mui-selected': {
                                        bgcolor: activeBg,
                                        '&:hover': {
                                            bgcolor: 'rgba(255, 255, 255, 0.2)',
                                        },
                                    }
                                }}
                            >
                                {item.icon && (
                                    <ListItemIcon sx={{
                                        minWidth: 40,
                                        color: isActive ? '#66BB6A' : 'rgba(255,255,255,0.7)'
                                    }}>
                                        {item.icon}
                                    </ListItemIcon>
                                )}
                                <ListItemText
                                    primary={item.text}
                                    primaryTypographyProps={{
                                        fontSize: '0.9rem',
                                        fontWeight: isActive ? 600 : 400,
                                        color: isActive ? 'white' : 'rgba(255,255,255,0.9)'
                                    }}
                                    sx={{ m: 0 }}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>

            {/* 4. Footer / Version */}
            <Box sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)' }}>
                    v1.0.0
                </Typography>
            </Box>
        </Drawer>
    );
};
