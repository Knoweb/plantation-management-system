import React, { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Link,
    Paper,
    CssBaseline,
    Alert,
    useMediaQuery,
    useTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { login } from '../../features/auth/api/authApi';
import Illustration from '../../assets/login-illustration.png';

export const LoginPage = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // Defaulting domain to 'lanka' as per UI request to hide the field
    const [domain] = useState('lanka');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await login({ domain, username: email, password });

            // Store Session Data
            sessionStorage.setItem('token', response.token);
            sessionStorage.setItem('tenantId', response.tenantId);
            sessionStorage.setItem('role', response.role);
            sessionStorage.setItem('user', JSON.stringify({ id: response.userId, name: response.fullName }));

            navigate('/dashboard');
        } catch (err: any) {
            console.error(err);
            setError('Login failed. Please check your username and password.');
        }
    };

    return (
        <Box component="main" sx={{ height: '100vh', width: '100vw', display: 'flex', bgcolor: '#FFFFFF', overflow: 'hidden' }}>
            <CssBaseline />

            {/* Left Side: Illustration Container */}
            <Box
                sx={{
                    flex: 1, // Takes up 50% of space
                    display: { xs: 'none', md: 'flex' }, // Hide on mobile
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: '#FFFFFF',
                    position: 'relative',
                    p: 4
                }}
            >
                <Box
                    component="img"
                    src={Illustration}
                    alt="Login Illustration"
                    sx={{
                        maxWidth: '100%',
                        maxHeight: '80%',
                        objectFit: 'contain',
                        zIndex: 2
                    }}
                />
            </Box>

            {/* Right Side: Form Container */}
            <Box
                sx={{
                    flex: 1, // Takes up remaining 50%
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: { xs: 4, md: 10 },
                    bgcolor: '#FFFFFF'
                }}
            >
                <Box sx={{ width: '100%', maxWidth: 400 }}>
                    <Typography component="h1" variant="h6" sx={{ mb: 1, fontWeight: 700, color: '#333' }}>
                        Please login to your account
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 3, width: '100%' }}>

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            size="medium"
                            sx={{
                                mb: 2,
                                '& .MuiOutlinedInput-root': { borderRadius: 1 }
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            size="medium"
                            sx={{
                                mb: 1,
                                '& .MuiOutlinedInput-root': { borderRadius: 1 }
                            }}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2,
                                bgcolor: '#00695C', // Matching the teal/dark cyan
                                color: 'white',
                                py: 1.5,
                                fontSize: '1rem',
                                fontWeight: 600,
                                borderRadius: 1,
                                textTransform: 'none',
                                '&:hover': { bgcolor: '#004D40' }
                            }}
                        >
                            Login
                        </Button>

                        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 1 }}>
                            <Link href="#" variant="body2" sx={{ color: '#555', textDecoration: 'none', fontSize: '0.9rem' }}>
                                Forgot password?
                            </Link>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 4, alignItems: 'center' }}>
                            <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                                Don't have an account?
                            </Typography>
                            <Button variant="outlined" sx={{ color: '#00D09C', borderColor: '#00D09C', fontWeight: 'bold', textTransform: 'uppercase' }}>
                                CREATE NEW
                            </Button>
                        </Box>
                    </Box>
                </Box>

                {/* Fixed Footer */}
                <Box sx={{ position: 'absolute', bottom: 20 }}>
                    <Typography variant="caption" color="text.secondary">
                        Powered By <span style={{ fontWeight: 'bold', color: '#00695C' }}>Plantec Ceylon (Pvt) Ltd.</span>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};
