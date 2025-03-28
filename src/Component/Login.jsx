import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { userCookie } from '../apirequest/config';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async () => {
        try {
            const response = await axios.post("http://localhost:5000/api/user/login", { email, password });
            if (response.status === 200 && response.data?.token) {
                console.log("✅", response.data.message);
                                Cookies.set(userCookie, response.data?.token, { expires: 1 / 24 });          
                setTimeout(() => window.location.href = '/chat', 1500);
            }
        } catch (error) {
            console.error("❌ Login failed:", error.response?.data || error.message);
        }
    };

    const handleLogin = () => {
        login();
    };

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                }}
            >
                <Typography variant="h4" gutterBottom>Login</Typography>

                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={handleLogin}
                >
                    Login
                </Button>
            </Box>
        </Container>
    );
}

export default Login;
