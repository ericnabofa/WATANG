// src/store/slices/metadataSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../services/api';

interface MetadataState {
  categories: Array<{ id: number; name: string }>;
  brands: Array<{ id: number; name: string }>;
  flavors: Array<{ id: number; name: string }>;
  volumes: Array<{ id: number; name: string }>;
  packSizes: Array<{ id: number; name: string }>;
  loading: boolean;
  error: string | null;
}

const initialState: MetadataState = {
  categories: [],
  brands: [],
  flavors: [],
  volumes: [],
  packSizes: [],
  loading: false,
  error: null,
};

// Fetch metadata
export const fetchMetadata = createAsyncThunk('metadata/fetchMetadata', async () => {
  const [categories, brands, flavors, volumes, packSizes] = await Promise.all([
    api.get('/api/metadata/categorys').then((res) => res.data),
    api.get('/api/metadata/brands').then((res) => res.data),
    api.get('/api/metadata/flavors').then((res) => res.data),
    api.get('/api/metadata/volumes').then((res) => res.data),
    api.get('/api/metadata/packsizes').then((res) => res.data),
  ]);

  return { categories, brands, flavors, volumes, packSizes };
});

const metadataSlice = createSlice({
  name: 'metadata',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMetadata.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMetadata.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.categories;
        state.brands = action.payload.brands;
        state.flavors = action.payload.flavors;
        state.volumes = action.payload.volumes;
        state.packSizes = action.payload.packSizes;
      })
      .addCase(fetchMetadata.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch metadata';
      });
  },
});

export default metadataSlice.reducer;