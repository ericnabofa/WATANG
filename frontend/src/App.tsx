// src/App.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './store/slices/productSlice';
import { fetchMetadata } from './store/slices/metadataSlice';
import { RootState, AppDispatch } from './store/store';
import ProductList from './components/ProductList';
import SortDropdown from './components/SortDropdown';
import FilterSidebar from './components/FilterSidebar';
import Pagination from './components/Pagination';
import UtilityBar from './components/UtilityBar/UtilityBar';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import ProductCategories from './components/ProductCategories'; // Import the ProductCategories component

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error, searchQuery, sortOption, filters, pagination } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchMetadata()); // Fetch metadata
    dispatch(fetchProducts()); // Fetch products
  }, [dispatch, searchQuery, sortOption, filters, pagination.currentPage]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <UtilityBar />
      <Header />
      <Hero />
      <ProductCategories /> {/* Add the ProductCategories component */}
      <h1>Products</h1>
      <SortDropdown />
      <FilterSidebar />
      <ProductList products={products} />
      <Pagination />
    </div>
  );
};

export default App;