import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, CircularProgress } from '@mui/material';
import axios from 'axios';
import baseUrl from 'src/components/baseUrl';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${baseUrl}/auth/login`, { email, password });
      if (res.data.verificationNeeded) {
        navigate('/verify-email', { state: { email } });
      } else {
        localStorage.setItem('token', res.data.token);
        navigate('/dashboard');
      }
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.msg || 'Server error');
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <div className=' w-full flex flex-col items-center justify-center mt-[40px]'>
        <img src="/favicon/favicon.ico" alt="" className='' />
        <h1 className=' font-bold text-[20px]'>Ghana Ports And Harbours Authority Asset Tracking</h1>
      </div>
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>Login</Typography>
        <form onSubmit={handleLogin} style={{ width: '100%' }}>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Login'}
          </Button>
          <Button color="inherit" onClick={() => navigate('/signup')} sx={{ mt: 2 }}>
            Don't have an account? Sign Up
          </Button>
          <Button color="inherit" onClick={() => navigate('/request-password-reset')} sx={{ mt: 2 }}>
            Forgot Password?
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
