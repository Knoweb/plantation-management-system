import React, { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Link,
    InputAdornment,
    Paper,
    Container
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ForestIcon from '@mui/icons-material/Forest'; // Using an icon instead of an image for branding

export const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock Login Logic
        sessionStorage.setItem('token', 'mock-jwt-token-000');
        sessionStorage.setItem('tenantId', '00000000-0000-0000-0000-000000000000');
        navigate('/dashboard');
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)', // Premium Green Gradient
                p: 2
            }}
        >
            <Container maxWidth="xs">
                <Paper
                    elevation={24}
                    sx={{
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        borderRadius: 2,
                        bgcolor: 'rgba(255, 255, 255, 0.95)', // Slightly translucent white
                        backdropFilter: 'blur(10px)'
                    }}
                >
                    {/* Branding / Logo Area */}
                    <Box
                        sx={{
                            width: 60,
                            height: 60,
                            borderRadius: '50%',
                            bgcolor: '#1b5e20',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 2,
                            boxShadow: 3
                        }}
                    >
                        <ForestIcon sx={{ fontSize: 32, color: '#FFD700' }} />
                    </Box>

                    <Typography component="h1" variant="h5" fontWeight="bold" color="primary.dark" sx={{ mb: 0.5 }}>
                        Dunwatta Estate
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                        Plantation Management System
                    </Typography>

                    {/* Login Form */}
                    <Box component="form" noValidate onSubmit={handleLogin} sx={{ width: '100%' }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Username"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonOutlineIcon color="action" />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ mb: 2 }}
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
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockOutlinedIcon color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1, mb: 2 }}>
                            <Link href="#" variant="body2" sx={{ color: '#2e7d32', fontWeight: 500 }}>
                                Forgot password?
                            </Link>
                        </Box>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            sx={{
                                py: 1.5,
                                fontSize: '1rem',
                                fontWeight: 'bold',
                                borderRadius: 1.5,
                                bgcolor: '#1b5e20',
                                '&:hover': {
                                    bgcolor: '#003300',
                                },
                            }}
                        >
                            Sign In
                        </Button>
                    </Box>

                    {/* Footer */}
                    <Box sx={{ mt: 4, textAlign: 'center' }}>
                        <Typography variant="caption" color="text.secondary">
                            Powered By
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                            <Box sx={{
                                width: 12,
                                height: 12,
                                borderRadius: '50%',
                                bgcolor: '#FFD700',
                                position: 'relative',
                                '&::after': {
                                    content: '""',
                                    position: 'absolute',
                                    top: -2,
                                    right: -2,
                                    width: 6,
                                    height: 6,
                                    borderRadius: '50% 0 50% 0',
                                    bgcolor: '#4CAF50'
                                }
                            }} />
                            <Typography variant="caption" fontWeight="bold" sx={{ color: '#00695C' }}>
                                Plantec Ceylon (Pvt) Ltd.
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};
