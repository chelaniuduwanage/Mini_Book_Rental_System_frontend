import React, { useEffect } from 'react';
import { 
  Container, 
  TextField, 
  Typography, 
  Box,
  Pagination,
  InputAdornment,
  Skeleton,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import BookCard from '../components/books/BookCard';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import SortIcon from '@mui/icons-material/Sort';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { 
  useGetBooksQuery
} from '../features/books/booksAPI';
import { 
  selectFilters, 
  selectPagination,
  selectSortOption,
  setAuthorFilter,
  setAvailabilityFilter,
  setCurrentPage,
  setSortOption
} from '../features/books/booksSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const BookListPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  // Get state from Redux
  const filters = useAppSelector(selectFilters);
  const pagination = useAppSelector(selectPagination);
  const sortOption = useAppSelector(selectSortOption);
  
  // Fetch books
  const { 
    data: booksData, 
    isLoading, 
    isError,
    error
  } = useGetBooksQuery({
    page: pagination.currentPage,
    author: filters.author,
    availability: filters.availability
  });

  // Handle errors
  useEffect(() => {
    if (isError) {
      toast.error(`Failed to load books: ${error?.data?.message || 'Unknown error'}`);
    }
  }, [isError, error]);

  const handleSearchChange = (e) => {
    dispatch(setAuthorFilter(e.target.value));
    dispatch(setCurrentPage(1));
  };

  const handleAvailabilityChange = (e) => {
    dispatch(setAvailabilityFilter(e.target.value));
    dispatch(setCurrentPage(1));
  };

  const handlePageChange = (event, value) => {
    dispatch(setCurrentPage(value));
  };

  const handleSortChange = (option) => {
    dispatch(setSortOption(option));
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Hero Section with Background Image */}
      <Box sx={{ 
        textAlign: 'center', 
        mb: 6,
        position: 'relative',
        borderRadius: '20px',
        py: 8,
        px: 3,
        color: 'white',
        minHeight: 350,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url(/bookshero.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.7)',
          zIndex: 1,
        }
      }}>
        {/* Dark overlay */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.4))',
          zIndex: 2,
        }} />
        
        <Box sx={{ position: 'relative', zIndex: 3, maxWidth: 800, px: 2 }}>
          <Typography variant="h1" sx={{ 
            mb: 3, 
            fontWeight: 800,
            fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
            lineHeight: 1.2
          }}>
            Discover Your Next Favorite Book
          </Typography>
          <Typography variant="h5" sx={{ 
            mb: 4, 
            fontWeight: 400,
            maxWidth: 700,
            mx: 'auto',
            opacity: 0.9,
            textShadow: '0 1px 4px rgba(0,0,0,0.5)',
            fontSize: { xs: '1.1rem', sm: '1.3rem' }
          }}>
            Explore our curated collection of timeless classics and modern masterpieces
          </Typography>
          
          <Box sx={{ 
            maxWidth: 700, 
            mx: 'auto',
            position: 'relative',
            zIndex: 3
          }}>
            <TextField
              placeholder="Search books or authors..."
              variant="outlined"
              fullWidth
              value={filters.author}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: '50px',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  height: 56,
                  fontSize: '1.1rem',
                  '& fieldset': { border: 'none' },
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 1)',
                  }
                }
              }}
            />
          </Box>
        </Box>
      </Box>
      
      {/* Header with Sort and Add Book */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 4,
        flexWrap: 'wrap',
        gap: 2
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LocalLibraryIcon color="primary" sx={{ fontSize: 32 }} />
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Book Collection
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<SortIcon />}
            onClick={() => handleSortChange(sortOption === 'newest' ? 'oldest' : 'newest')}
            sx={{
              textTransform: 'none',
              borderRadius: '12px',
              px: 3,
              borderColor: 'divider',
              color: 'text.primary',
              fontWeight: 600
            }}
          >
            {sortOption === 'newest' ? 'Newest First' : 'Oldest First'}
          </Button>
          
          <FormControl variant="outlined" sx={{ minWidth: 180 }}>
            <InputLabel>Availability</InputLabel>
            <Select
              value={filters.availability}
              onChange={handleAvailabilityChange}
              label="Availability"
              sx={{
                borderRadius: '12px',
                height: '100%',
              }}
            >
              <MenuItem value="all">All Books</MenuItem>
              <MenuItem value="available">Available Only</MenuItem>
              <MenuItem value="rented">Rented Only</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      
      {/* Book Grid */}
      {isLoading ? (
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 4
        }}>
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton 
              key={index}
              variant="rectangular" 
              height={360} 
              sx={{ 
                borderRadius: '16px',
                bgcolor: 'background.paper',
              }} 
            />
          ))}
        </Box>
      ) : (
        <>
          {booksData?.data?.length > 0 ? (
            <>
              <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: 4
              }}>
                {booksData.data.map(book => (
                  <BookCard key={book.id} book={book} />
                ))}
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                <Pagination 
                  count={booksData.last_page || 1} 
                  page={booksData.current_page || 1} 
                  onChange={handlePageChange} 
                  color="primary"
                  shape="rounded"
                  size="large"
                  sx={{ 
                    '& .MuiPaginationItem-root': { 
                      borderRadius: '10px',
                      height: 42,
                      minWidth: 42,
                      fontSize: '1rem',
                      margin: '0 6px',
                      fontWeight: 600
                    },
                    '& .Mui-selected': {
                      background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
                      color: 'white'
                    }
                  }}
                />
              </Box>
            </>
          ) : (
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              py: 10,
              textAlign: 'center',
              borderRadius: '20px',
              backgroundColor: 'background.paper',
              boxShadow: 1
            }}>
              <Box sx={{ 
                width: 160, 
                height: 160,
                background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 3,
              }}>
                <SearchIcon sx={{ fontSize: 70, color: 'white' }} />
              </Box>
              <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
                No books found
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500, mb: 3 }}>
                We couldn't find any books matching "{filters.author}"
              </Typography>
              <Button
                variant="outlined"
                onClick={() => dispatch(setAuthorFilter(''))}
                sx={{
                  textTransform: 'none',
                  borderRadius: '12px',
                  px: 4,
                  fontWeight: 600,
                  borderWidth: 2,
                  '&:hover': { borderWidth: 2 }
                }}
              >
                Clear Search
              </Button>
            </Box>
          )}
        </>
      )}
      
      {/* Floating Add Button for Mobile */}
      <Box sx={{
        position: 'fixed',
        bottom: 32,
        right: 32,
        zIndex: 1000,
        display: { xs: 'block', md: 'none' }
      }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/add-book')}
          sx={{
            textTransform: 'none',
            borderRadius: '16px',
            px: 3,
            py: 1.5,
            fontWeight: 600,
            background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
            boxShadow: '0 8px 20px rgba(106, 17, 203, 0.3)'
          }}
        >
          Add Book
        </Button>
      </Box>
    </Container>
  );
};

export default BookListPage;