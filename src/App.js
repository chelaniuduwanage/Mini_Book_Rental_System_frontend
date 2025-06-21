import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

// Pages
import BookListPage from './pages/BookListPage';
import BookDetailPage from './pages/BookDetailsPage';
import AddBookPage from './pages/AddBookPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Navbar from './components/layout/Navbar';

// Theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#6a11cb',
      light: '#8e47f4',
      dark: '#4d00a3',
    },
    secondary: {
      main: '#2575fc',
      light: '#6da0ff',
      dark: '#004bc9',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: [
      '"Inter"',
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 800,
      fontSize: '2.5rem',
      letterSpacing: '-0.5px',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '12px',
          fontWeight: 600,
          padding: '8px 20px',
          transition: 'all 0.3s ease',
        },
        contained: {
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 7px 20px rgba(0,0,0,0.15)',
          }
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s ease',
        },
      },
    },
  },
});

function App() {
  // Safely access auth state
  const authState = useSelector(state => state.auth);
  const isAuthenticated = authState?.isAuthenticated;
  const loading = authState?.loading;
  
  // Don't show navbar while auth state is loading
  const showNavbar = !loading && isAuthenticated !== null;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        {showNavbar && <Navbar />}
        <main style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<BookListPage />} />
            <Route path="/book/:id" element={<BookDetailPage />} />
            <Route 
              path="/add-book" 
              element={
                <ProtectedRoute adminOnly>
                  <AddBookPage />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <ToastContainer 
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          toastStyle={{ 
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
            color: 'white',
            fontWeight: 500,
            fontSize: '14px'
          }}
        />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;