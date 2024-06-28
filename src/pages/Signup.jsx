import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import axios from 'axios';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://asset-tracking-app.vercel.app/api/auth/register', { name, email, password });
      alert(res.data.msg);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.msg || 'Server error');
    }
  };

  return (
    <Container maxWidth="sm">
      <div className=' w-full flex flex-col items-center justify-center mt-[40px]'>
        <img src="/favicon/favicon.ico" alt="" className='' />
        <h1 className=' font-bold text-[20px]'>Ghana Ports And Harbours Authority Asset Tracking</h1>
      </div>
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>Sign Up</Typography>
        <form onSubmit={handleSignup} style={{ width: '100%' }}>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Sign Up
          </Button>
          <Button color="inherit" onClick={() => navigate('/login')} sx={{ mt: 2 }}>
            Already have an account? Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Signup;
