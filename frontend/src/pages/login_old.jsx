import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, TextField, Button, Typography, Paper } from '@mui/material';





function LogIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [showSignUp, setShowSignUp] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const backendUrl = import.meta.env.VITE_ADRESS;



    const handleSignUp = () => {
        setLoading(true);
        setError('');

        console.log('Sending signup data:', { userName, email, password });
        if (!userName || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        fetch(`${backendUrl}user/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, userName, password })
        })

            .then(response => {
                setLoading(false);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setLoading(false);
                if (data.success) {
                    console.log('Sign-up successful:', data);
                    setShowSignUp(false);
                } else {
                    setError(data.message || 'Sign-up failed. Please try again.');
                    console.error('Sign-up error:', data);
                }
            })
            .catch(error => {
                setLoading(false);
                setError('Error during sign-up. Please try again.');
                console.error('Error during sign-up:', error);
            });
    };

    const handleLogin = () => {
        setLoading(true);
        setError('');

        fetch(`${backendUrl}user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then(response => {
                setLoading(false);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setLoading(false);
                if (data.success) {
                    console.log('Login successful:', data);
                    console.log('Token:', data.token);
                    localStorage.setItem('token', data.token);
                    navigate('/docMod/home');
                } else {
                    setError(data.message || 'Login failed. Please try again.');
                    console.error('Login error:', data);
                }
            })
            .catch(error => {
                setLoading(false);
                setError('Error during login. Please try again.');
                console.error('Error during login:', error);
            });
    };



    return (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh', padding: '20px' }}>
            <Grid item xs={12} sm={8} md={4} >
                <Paper elevation={3} sx={{ display: 'flex', flexDirection: 'column', padding: '20px' }}>
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    <Typography variant="h5" align="center">
                        {showSignUp ? 'Sign Up' : 'Log In'}
                    </Typography>
                    <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
                        {showSignUp && (
                            <>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="User Name"
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                        required
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        variant="outlined"
                                    />
                                </Grid>
                            </>
                        )}
                        {!showSignUp && (
                            <>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Grid>
                            </>
                        )}
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={showSignUp ? handleSignUp : handleLogin}
                                disabled={loading}
                                fullWidth
                            >
                                {loading
                                    ? (showSignUp ? 'Signing Up...' : 'Logging In...')
                                    : (showSignUp ? 'Sign Up' : 'Log In')}
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                color="secondary"
                                onClick={() => setShowSignUp(!showSignUp)}
                                fullWidth
                            >
                                {showSignUp ? 'Already have an account? Log In' : 'Need an account? Sign Up'}
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default LogIn;
