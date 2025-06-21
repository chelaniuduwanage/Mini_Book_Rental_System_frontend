import React from 'react';
import { 
  Card, 
  CardContent, 
  CardActionArea, 
  Typography, 
  Chip, 
  Box,
  Avatar,
  Button,
  Tooltip
} from '@mui/material';
import { Link } from 'react-router-dom';
import BookIcon from '@mui/icons-material/Book';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useRentBookMutation } from '../../features/books/booksAPI';
import { toast } from 'react-toastify';

const coverColors = [
  { bg: '#ffebee', color: '#f44336' },
  { bg: '#e3f2fd', color: '#2196f3' },
  { bg: '#e8f5e9', color: '#4caf50' },
  { bg: '#f3e5f5', color: '#9c27b0' },
  { bg: '#fff3e0', color: '#ff9800' },
];

const BookCard = ({ book }) => {
  const [rentBook, { isLoading }] = useRentBookMutation();
  const coverColor = coverColors[book.id % coverColors.length];
  
  const handleRent = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!book.availability) return;
    
    try {
      await rentBook(book.id).unwrap();
      toast.success('Book rented successfully!');
    } catch (error) {
      toast.error(`Error renting book: ${error.data?.message || 'Unknown error'}`);
    }
  };

  return (
    <Card sx={{ 
      width: '100%', 
      height: '340px',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'visible',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
      }
    }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: book.availability ? 'calc(100% - 48px)' : '100%',
        overflow: 'hidden'
      }}>
        <CardActionArea 
          component={Link} 
          to={`/book/${book.id}`}
          sx={{ 
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            width: '100%',
            overflow: 'hidden'
          }}
        >
          {/* Book Cover */}
          <Box sx={{ 
            width: '100%', 
            height: '160px',
            backgroundColor: coverColor.bg,
            position: 'relative'
          }}>
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%'
            }}>
              <BookIcon sx={{ 
                fontSize: 64, 
                color: coverColor.color,
                opacity: 0.3
              }} />
            </Box>
            
            <Chip 
              icon={book.availability ? 
                <CheckCircleOutlineIcon fontSize="small" /> : 
                <HighlightOffIcon fontSize="small" />
              }
              label={book.availability ? 'Available' : 'Rented'}
              size="small"
              sx={{ 
                position: 'absolute',
                top: 12,
                right: 12,
                fontWeight: 600,
                backgroundColor: book.availability ? 'rgba(76, 175, 80, 0.15)' : 'rgba(244, 67, 54, 0.15)',
                color: book.availability ? '#4caf50' : '#f44336',
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(255, 255, 255, 0.5)'
              }}
            />
          </Box>
          
          {/* Card Content */}
          <CardContent sx={{ 
            width: '100%',
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            pt: 2,
            pb: 1,
            boxSizing: 'border-box',
            overflow: 'hidden'
          }}>
            <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
              <Typography 
                variant="h6" 
                component="div" 
                sx={{ 
                  fontWeight: 700,
                  lineHeight: 1.3,
                  mb: 1,
                  height: '2.6em',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical'
                }}
              >
                {book.title}
              </Typography>
              
              <Tooltip title={book.author} placement="top" arrow>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ 
                    fontWeight: 500,
                    mb: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    overflow: 'hidden'
                  }}
                >
                  <Avatar 
                    sx={{ 
                      width: 24, 
                      height: 24,
                      fontSize: 12,
                      bgcolor: 'rgba(63, 81, 181, 0.1)',
                      color: 'primary.main',
                      flexShrink: 0
                    }}
                  >
                    {book.author.charAt(0)}
                  </Avatar>
                  <Box sx={{ 
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    flexGrow: 1
                  }}>
                    {book.author}
                  </Box>
                </Typography>
              </Tooltip>
            </Box>
            
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 'auto'
            }}>
              <Chip 
                label={new Date(book.published_date).toLocaleDateString('en-US', { year: 'numeric' })}
                size="small"
                variant="outlined"
                sx={{ 
                  borderColor: 'divider',
                  color: 'text.secondary'
                }}
              />
              
              <Typography 
                variant="caption" 
                sx={{ 
                  color: 'primary.main',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  flexShrink: 0
                }}
              >
                View details
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Box>
      
      {/* Rent Button */}
      {book.availability && (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={handleRent}
          disabled={isLoading}
          sx={{
            width: 'calc(100% - 32px)',
            borderRadius: '8px',
            mx: 2,
            mt: 1,
            mb: 1,
            opacity: 0.9,
            transition: 'opacity 0.3s',
            '&:hover': {
              opacity: 1
            }
          }}
        >
          {isLoading ? 'Renting...' : 'Rent Now'}
        </Button>
      )}
    </Card>
  );
};

export default BookCard;