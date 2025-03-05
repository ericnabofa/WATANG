// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import metadataReducer from './slices/metadataSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    metadata: metadataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;