import { createTheme } from '@mui/material/styles';

// Plantec Ceylon "EstateIQ" Premium Theme
// Primary: Lush Green (Tea Leaves)
// Secondary: Earth/Wood tones
// Background: Clean White / Soft Gray

export const theme = createTheme({
    palette: {
        primary: {
            main: '#2E7D32', // A rich, deep green (MUI Green 800-ish)
            light: '#4CAF50',
            dark: '#1B5E20',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#5D4037', // Brown/Earth tone for accent
            light: '#8D6E63',
            dark: '#3E2723',
            contrastText: '#FFFFFF',
        },
        background: {
            default: '#F5F5F5', // Very light gray for application background
            paper: '#FFFFFF', // Pure white for cards/panels
        },
        text: {
            primary: '#1A1A1A', // Almost black for sharpness
            secondary: '#616161',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 700,
            fontSize: '2.5rem',
            color: '#1B5E20',
        },
        h4: {
            fontWeight: 600,
        },
        button: {
            fontWeight: 600,
            textTransform: 'none', // Premium feel (no all-caps)
            borderRadius: '8px',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12, // Modern rounded corners
                    padding: '10px 24px',
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0px 4px 12px rgba(46, 125, 50, 0.2)', // Soft green glow
                    },
                },
                containedPrimary: {
                    background: 'linear-gradient(45deg, #2E7D32 30%, #4CAF50 90%)', // Subtle gradient
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 12,
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)', // Standard premium shadow
                },
            },
        },
    },
});
