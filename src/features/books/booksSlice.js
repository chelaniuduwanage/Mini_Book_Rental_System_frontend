import { createSlice } from '@reduxjs/toolkit';

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    filters: {
      author: '',
      availability: 'all',
    },
    pagination: {
      currentPage: 1,
      itemsPerPage: 12,
    },
    sortOption: 'newest'
  },
  reducers: {
    setAuthorFilter: (state, action) => {
      state.filters.author = action.payload;
    },
    setAvailabilityFilter: (state, action) => {
      state.filters.availability = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    setSortOption: (state, action) => {
      state.sortOption = action.payload;
    }
  }
});

export const { 
  setAuthorFilter, 
  setAvailabilityFilter,
  setCurrentPage,
  setSortOption
} = booksSlice.actions;

export const selectFilters = state => state.books.filters;
export const selectPagination = state => state.books.pagination;
export const selectSortOption = state => state.books.sortOption;

export default booksSlice.reducer;