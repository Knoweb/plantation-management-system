import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    IconButton,
    Avatar
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

const drawerWidth = 240;

export const Header = () => {
    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                width: `calc(100% - ${drawerWidth}px)`,
                ml: `${drawerWidth}px`,
                bgcolor: '#FFFFFF', // White header
                color: '#1B5E20', // Green text
                borderBottom: '1px solid rgba(0,0,0,0.05)',
                height: 80, // Taller header to accommodate titles
                justifyContent: 'center'
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <IconButton
                    edge="start"
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>

                {/* Center Title Area */}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    {/* In the mock, it looks like "Dunwatta Estate" is centered or prominent. 
               We'll place it here. */}
                    <Typography variant="h4" fontWeight="bold" sx={{ color: '#1B5E20' }}>
                        Dunwatta Estate
                    </Typography>
                    <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#2E7D32', mt: -0.5 }}>
                        GC Division
                    </Typography>
                </Box>

                {/* Right Side: Date/Time (Mock shows Date/Time bar, but usually dynamic) */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {/* We can add the "Messages" or "Main Menu" red buttons here if strictly following the PDF, 
                 but standard Profile is usually safer for now until requested. 
                 The PDF has large circular profile picture on the far right of the layout, outside the header.
                 We will keep a standard header profile for usability. */}
                    <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="body2" color="text.secondary">
                            {new Date().toLocaleDateString()}
                        </Typography>
                    </Box>
                    <Avatar sx={{ bgcolor: '#1B5E20', width: 48, height: 48 }}>
                        N
                    </Avatar>
                </Box>
            </Toolbar>
        </AppBar>
    );
};
