import { configureStore } from '@reduxjs/toolkit';
import { booksApi } from '../features/books/booksAPI';
import booksReducer from '../features/books/booksSlice';
import authReducer from '../features/auth/authSlice';
import { authApi } from '../features/auth/authAPI';

export const store = configureStore({
  reducer: {
    [booksApi.reducerPath]: booksApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    books: booksReducer,
    auth: authReducer, // Make sure this key exists
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(booksApi.middleware)
      .concat(authApi.middleware),
});