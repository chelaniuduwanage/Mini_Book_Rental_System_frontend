// src/pages/AddBookPage.jsx
import React, { useState } from 'react';
import { 
  Container, 
  Card, 
  CardContent, 
  Typography, 
  TextField, 
  Button, 
  CircularProgress,
  Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAddBookMutation } from '../features/books/booksAPI'; // Add this import

const AddBookPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    published_date: ''
  });
  const [errors, setErrors] = useState({});
  
  // Use the actual mutation hook
  const [addBook, { isLoading }] = useAddBookMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.author.trim()) newErrors.author = 'Author is required';
    if (!formData.published_date) newErrors.published_date = 'Published date is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    try {
      // Use the actual mutation to call the backend
      await addBook(formData).unwrap();
      toast.success('Book added successfully!');
      navigate('/');
    } catch (error) {
      // Handle backend validation errors
      if (error.data && error.data.errors) {
        setErrors(error.data.errors);
      } else {
        toast.error(`Failed to add book: ${error.data?.message || 'Unknown error'}`);
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Add New Book
          </Typography>
          
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={!!errors.title}
              helperText={errors.title}
            />
            
            <TextField
              label="Author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={!!errors.author}
              helperText={errors.author}
            />
            
            <TextField
              label="Published Date"
              name="published_date"
              type="date"
              value={formData.published_date}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              error={!!errors.published_date}
              helperText={errors.published_date}
            />
            
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoading}
              sx={{ mt: 3 }}
              fullWidth
            >
              {isLoading ? <CircularProgress size={24} /> : 'Add Book'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AddBookPage;