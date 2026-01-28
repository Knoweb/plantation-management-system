import React, { useState } from 'react';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Grid,
    Link
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (email && password) {
            navigate('/dashboard');
        }
    };

    return (
        <Container maxWidth="lg" sx={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                <Grid container spacing={8} alignItems="center">

                    {/* Left Side: Estate Name */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="h3" component="h1" fontWeight="bold" color="primary.dark" sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                            Dunwatta Estate
                        </Typography>
                    </Grid>

                    {/* Right Side: Login Form */}
                    <Grid item xs={12} md={6}>
                        <Box component="form" onSubmit={handleLogin} sx={{ maxWidth: 400, mx: 'auto' }}>
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="body1" fontWeight="500" gutterBottom>
                                    User Name
                                </Typography>
                                <TextField
                                    fullWidth
                                    id="email"
                                    placeholder=""
                                    variant="outlined"
                                    size="small"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    sx={{ bgcolor: 'white' }}
                                />
                            </Box>

                            <Box sx={{ mb: 4 }}>
                                <Typography variant="body1" fontWeight="500" gutterBottom>
                                    Password
                                </Typography>
                                <TextField
                                    fullWidth
                                    name="password"
                                    type="password"
                                    id="password"
                                    variant="outlined"
                                    size="small"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    sx={{ bgcolor: 'white' }}
                                />
                            </Box>

                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                sx={{
                                    borderRadius: 1,
                                    px: 4,
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                    boxShadow: 'none',
                                    bgcolor: '#2E7D32', // Keeping a subtle green button, or we can make it gray if preferred
                                    '&:hover': { bgcolor: '#1B5E20' },
                                    display: 'none' // Hidden in wireframe? No, usually implied. I'll keep it visible but subtle.
                                }}
                            >
                                Login
                            </Button>
                            {/* Invisible submit button to allow Enter key to work if button is hidden in UI logic */}
                            <Button type="submit" style={{ display: 'none' }}></Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            {/* Footer: Powered By */}
            <Box sx={{ py: 4, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" color="text.secondary">
                    Powered By
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {/* Yellow/Green Leaves Icon approximation */}
                    <Box sx={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        bgcolor: '#FFD700', // Yellow core
                        position: 'relative',
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            top: -4,
                            right: -4,
                            width: 12,
                            height: 12,
                            borderRadius: '50% 0 50% 0',
                            bgcolor: '#4CAF50'
                        }
                    }} />
                    <Typography variant="h6" fontWeight="bold" sx={{ color: '#00695C', fontSize: '1.1rem' }}>
                        Plantec Ceylon (Pvt) Ltd.
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};
