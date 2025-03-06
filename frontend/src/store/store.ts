// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import metadataReducer from './slices/metadataSlice';
import cartReducer from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    metadata: metadataReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;