// src/store/slices/productSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product } from '../../types/product'; 
import api from '../../services/api';
import { RootState } from '../store';

// Define the initial state
interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  sortOption: string;
  filters: {
    categoryId?: number;
    brandId?: number;
    flavorId?: number;
    volumeId?: number;
    packSizeId?: number;
  };
  pagination: {
    currentPage: number;
    pageSize: number;
    totalProducts: number;
  };
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  searchQuery: '',
  sortOption: 'price-asc',
  filters: {},
  pagination: {
    currentPage: 1,
    pageSize: 10,
    totalProducts: 0,
  },
};

// Define an async thunk to fetch products
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (_, { getState }) => {
      const state = getState() as RootState;
      const { searchQuery, sortOption, filters, pagination } = state.products;
  
      const params = {
        search: searchQuery,
        sort: sortOption,
        ...filters,
        page: pagination.currentPage,
        limit: pagination.pageSize,
      };
  
      const response = await api.get('/products', { params });
      return response.data;
    }
  );

// Create the slice
const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
      setSearchQuery: (state, action: PayloadAction<string>) => {
        state.searchQuery = action.payload;
      },
      setSortOption: (state, action: PayloadAction<string>) => {
        state.sortOption = action.payload;
      },
      setFilters: (state, action: PayloadAction<ProductState['filters']>) => {
        state.filters = action.payload;
      },
      setCurrentPage: (state, action: PayloadAction<number>) => {
        state.pagination.currentPage = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchProducts.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
          state.loading = false;
          state.products = action.payload.products;
          state.pagination.totalProducts = action.payload.totalProducts;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Failed to fetch products';
        });
    },
  });
  
  export const { setSearchQuery, setSortOption, setFilters, setCurrentPage } = productSlice.actions;
  export default productSlice.reducer;
  