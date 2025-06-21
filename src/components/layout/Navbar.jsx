import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  CircularProgress
} from '@mui/material';
import {
  Menu as MenuIcon,
  Book as BookIcon,
  Add as AddIcon,
  AccountCircle as AccountIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';

const Navbar = () => {
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  
  // Safely access auth state
  const authState = useSelector(state => state.auth);
  const isAuthenticated = authState?.isAuthenticated;
  const user = authState?.user;
  const loading = authState?.loading;
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const isActive = (path) => location.pathname === path;
  
  const handleLogout = () => {
    dispatch(logout());
    handleClose();
  };

  // Show loading spinner while auth state is loading
  if (loading) {
    return (
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'center' }}>
          <CircularProgress color="inherit" size={24} />
        </Toolbar>
      </AppBar>
    );
  }

  return (
    <AppBar 
      position="sticky" 
      elevation={1}
      sx={{ 
        backgroundColor: 'background.paper',
        color: 'text.primary',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        py: 1
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <BookIcon color="primary" sx={{ fontSize: 32 }} />
            <Typography 
              variant="h6" 
              component={Link} 
              to="/"
              sx={{ 
                fontWeight: 800, 
                letterSpacing: '-0.5px',
                textDecoration: 'none',
                color: 'primary.main'
              }}
            >
              BookRental
            </Typography>
          </Box>
          
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            <Button
              component={Link}
              to="/"
              variant={isActive('/') ? 'contained' : 'text'}
              color={isActive('/') ? 'primary' : 'inherit'}
              sx={{ 
                fontWeight: 600,
                borderRadius: '12px',
                px: 2,
                color: isActive('/') ? '#fff' : 'text.secondary'
              }}
              startIcon={<BookIcon />}
            >
              Books
            </Button>
            
            {isAuthenticated && user?.role === 'admin' && (
              <Button
                component={Link}
                to="/add-book"
                variant={isActive('/add-book') ? 'contained' : 'text'}
                color={isActive('/add-book') ? 'primary' : 'inherit'}
                sx={{ 
                  fontWeight: 600,
                  borderRadius: '12px',
                  px: 2,
                  color: isActive('/add-book') ? '#fff' : 'text.secondary'
                }}
                startIcon={<AddIcon />}
              >
                Add Book
              </Button>
            )}
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {isAuthenticated ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                  <Avatar 
                    sx={{ 
                      width: 36, 
                      height: 36,
                      bgcolor: 'primary.main',
                      fontSize: 16,
                      fontWeight: 600
                    }}
                  >
                    {user?.name?.charAt(0) || 'U'}
                  </Avatar>
                </IconButton>
                <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' }}}>
                  {user?.name || 'User'}
                </Typography>
              </Box>
              
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 4px 20px rgba(0,0,0,0.1))',
                    mt: 1.5,
                    minWidth: 220,
                    borderRadius: '12px',
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <AccountIcon fontSize="small" />
                  </ListItemIcon>
                  My Profile
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <BookIcon fontSize="small" />
                  </ListItemIcon>
                  My Rentals
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Button
              component={Link}
              to="/login"
              variant="outlined"
              color="inherit"
              sx={{ 
                fontWeight: 600,
                borderRadius: '12px',
                px: 2,
              }}
            >
              Login
            </Button>
          )}
          
          <IconButton sx={{ display: { md: 'none' }}}>
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;