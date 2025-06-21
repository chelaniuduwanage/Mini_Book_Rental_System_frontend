// src/pages/BookDetailsPage.jsx
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Card, 
  CardContent, 
  Typography, 
  Chip, 
  Button, 
  CircularProgress,
  Box,
  Alert
} from '@mui/material';
import { toast } from 'react-toastify';
import { 
  useGetBookDetailsQuery,
  useRentBookMutation,
  useReturnBookMutation
} from '../features/books/booksAPI';

const BookDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { 
    data: book, 
    isLoading, 
    isError,
    error,
    refetch
  } = useGetBookDetailsQuery(id);
  
  const [rentBook, { isLoading: isRenting }] = useRentBookMutation();
  const [returnBook, { isLoading: isReturning }] = useReturnBookMutation();

  useEffect(() => {
    if (isError) {
      toast.error(`Failed to load book: ${error?.data?.message || 'Unknown error'}`);
    }
  }, [isError, error]);

  const handleRent = async () => {
    try {
      await rentBook(id).unwrap();
      toast.success('Book rented successfully!');
      refetch(); // Refresh book data
    } catch (err) {
      toast.error(`Error renting book: ${err.data?.message || 'Unknown error'}`);
    }
  };

  const handleReturn = async () => {
    try {
      await returnBook(id).unwrap();
      toast.success('Book returned successfully!');
      refetch(); // Refresh book data
    } catch (err) {
      toast.error(`Error returning book: ${err.data?.message || 'Unknown error'}`);
    }
  };

  if (isLoading) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (!book || isError) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error">
          Book not found. Please try again.
          <Button 
            onClick={() => navigate('/')} 
            sx={{ ml: 2 }}
            variant="outlined"
          >
            Back to Books
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {book.title}
          </Typography>
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1" gutterBottom>
              <strong>Author:</strong> {book.data.author}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Published:</strong> {new Date(book.data.published_date).toLocaleDateString()}
            </Typography>
            <Chip 
              label={book.data.availability ? 'Available' : 'Rented'}
              color={book.data.availability ? 'success' : 'error'}
              sx={{ mb: 2 }}
            />
          </Box>
          
          {book.data.description && (
            <Typography variant="body1" paragraph>
              {book.data.description}
            </Typography>
          )}
          
          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            {book.data.availability ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleRent}
                disabled={isRenting}
              >
                {isRenting ? 'Renting...' : 'Rent This Book'}
              </Button>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                onClick={handleReturn}
                disabled={isReturning}
              >
                {isReturning ? 'Returning...' : 'Return Book'}
              </Button>
            )}
            
            <Button
              variant="outlined"
              onClick={() => navigate('/')}
            >
              Back to Books
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default BookDetailPage;