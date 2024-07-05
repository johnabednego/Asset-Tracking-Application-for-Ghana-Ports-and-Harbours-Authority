import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, CircularProgress } from '@mui/material';
import axios from 'axios';
import baseUrl from 'src/components/baseUrl';

const RequestPasswordReset = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRequestReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${baseUrl}/auth/request-password-reset`, { email });
      setSuccess(res.data.msg);
      setError('');
      setLoading(false);
      setTimeout(() => {
        navigate('/verify-reset-otp', { state: { email } });
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.msg || 'Server error, Try again');
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
        <Typography variant="h4" gutterBottom>Request Password Reset</Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleRequestReset} style={{ width: '100%' }}>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {success && <Typography color="success.main">{success}</Typography>}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Request Password Reset'}
          </Button>
        </form>
        <Button color="inherit" onClick={() => navigate('/login')} sx={{ mt: 2 }}>
          Back to Login
        </Button>
      </Box>
    </Container>
  );
};

export default RequestPasswordReset;
