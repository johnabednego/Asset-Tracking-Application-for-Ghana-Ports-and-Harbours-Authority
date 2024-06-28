import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import axios from 'axios';
import baseUrl from 'src/components/baseUrl';

const VerifyEmail = () => {
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const emailFromState = location.state?.email;
    if (emailFromState) {
      setEmail(emailFromState);
    }
  }, [location.state]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${baseUrl}/auth/verify-email`, { email, otp });
      setSuccess(res.data.msg);
      setTimeout(() => {
        navigate('/login');
      }, 3000); // Redirect to login after 3 seconds
    } catch (err) {
      setError(err.response?.data?.errors[0].msg || 'Server error, Try again');
    }
    setLoading(false);
  };

  const handleResend = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${baseUrl}/auth/resend-otp`, { email, type: 'email' });
      setSuccess(res.data.msg);
    } catch (err) {
      setError(err.response?.data?.errors[0].msg || 'Server error, Try again');
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="sm">
      <div className='w-full flex flex-col items-center justify-center mt-[40px]'>
        <img src="/favicon/favicon.ico" alt="Logo" className='' />
        <h1 className='font-bold text-[20px]'>Ghana Ports And Harbours Authority Asset Tracking</h1>
      </div>
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>Verify Email</Typography>
        <form onSubmit={handleVerify} style={{ width: '100%' }}>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Verification Code"
            fullWidth
            margin="normal"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          {error && <Typography color="error">{error}</Typography>}
          {success && <Typography color="success.main">{success}</Typography>}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={loading}>
            {loading ? 'Verifying...' : 'Verify'}
          </Button>
        </form>
        <Button onClick={handleResend} color="inherit" sx={{ mt: 2 }} disabled={loading}>
          {loading ? 'Resending...' : 'Resend Verification Code'}
        </Button>
        <Button color="inherit" onClick={() => navigate('/login')} sx={{ mt: 2 }}>
          Back to Login
        </Button>
      </Box>
    </Container>
  );
};

export default VerifyEmail;
