import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API } from '../../services/api';

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: API.defaults.baseURL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  tagTypes: ['Books'],
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: ({ page = 1, author = '', availability = 'all' }) => {
        const params = new URLSearchParams();
        if (author) params.append('author', author);
        if (availability !== 'all') params.append('available', availability === 'available');
        params.append('page', page);
        
        return `/books?${params.toString()}`;
      },
      providesTags: ['Books'],
      transformResponse: (response) => ({
        data: response.data || [],
        current_page: response.meta?.current_page || 1,
        last_page: response.meta?.last_page || 1,
        total: response.meta?.total || 0,
      }),
    }),
    getBookDetails: builder.query({
      query: (id) => `/books/${id}`,
      providesTags: (result, error, id) => [{ type: 'Books', id }],
    }),
    addBook: builder.mutation({
      query: (bookData) => ({
        url: '/books',
        method: 'POST',
        body: bookData,
      }),
      invalidatesTags: ['Books'],
    }),
    rentBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}/rent`,
        method: 'POST',
      }),
      invalidatesTags: ['Books'],
    }),
    returnBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}/return`,
        method: 'POST',
      }),
      invalidatesTags: ['Books'],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useLazyGetBooksQuery,
  useGetBookDetailsQuery,
  useAddBookMutation,
  useRentBookMutation,
  useReturnBookMutation
} = booksApi;
