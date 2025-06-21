import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerStart, registerSuccess, registerFailure } from '../features/auth/authSlice';
import { useRegisterMutation } from '../features/auth/authAPI';
import { 
  Container, 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Typography, 
  CircularProgress, 
  Link, 
  Box, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem 
} from '@mui/material';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register] = useRegisterMutation();
  const { loading, error } = useSelector(state => state.auth);
  const [fieldErrors, setFieldErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(registerStart());
    setFieldErrors({});
    
    try {
      const result = await register({ 
        name, 
        email, 
        password, 
        role 
      }).unwrap();
      
      dispatch(registerSuccess());
      navigate('/login');
    } catch (err) {
      if (err.data?.errors) {
        // Handle field validation errors
        setFieldErrors(err.data.errors);
      } else {
        dispatch(registerFailure(err.data?.message || 'Registration failed'));
      }
    }
  };

  const handleFieldChange = (field) => (e) => {
    // Clear field error when user types
    if (fieldErrors[field]) {
      setFieldErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[field];
        return newErrors;
      });
    }
    
    // Update field value
    switch(field) {
      case 'name': setName(e.target.value); break;
      case 'email': setEmail(e.target.value); break;
      case 'password': setPassword(e.target.value); break;
      case 'role': setRole(e.target.value); break;
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom align="center">
            Register
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              value={name}
              onChange={handleFieldChange('name')}
              required
              error={!!fieldErrors.name}
              helperText={fieldErrors.name ? fieldErrors.name[0] : ''}
            />
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={handleFieldChange('email')}
              required
              error={!!fieldErrors.email}
              helperText={fieldErrors.email ? fieldErrors.email[0] : ''}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={handleFieldChange('password')}
              required
              error={!!fieldErrors.password}
              helperText={fieldErrors.password ? fieldErrors.password[0] : ''}
            />
            <FormControl fullWidth margin="normal" error={!!fieldErrors.role}>
              <InputLabel>Role</InputLabel>
              <Select
                value={role}
                onChange={handleFieldChange('role')}
                label="Role"
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
              {fieldErrors.role && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                  {fieldErrors.role[0]}
                </Typography>
              )}
            </FormControl>
            
            {error && !Object.keys(fieldErrors).length && (
              <Typography color="error" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
            
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Register'}
            </Button>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Link href="/login" variant="body2">
                Already have an account? Login
              </Link>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default RegisterPage;