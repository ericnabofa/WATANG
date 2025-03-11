import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { fetchProducts } from './store/slices/productSlice';
import { fetchMetadata } from './store/slices/metadataSlice';
import { RootState, AppDispatch } from './store/store';
import ProductList from './components/ProductList';
import Pagination from './components/Pagination';
import UtilityBar from './components/UtilityBar/UtilityBar';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import ProductCategories from './components/ProductCategories';
import CategoryProducts from './components/CategoryProducts';
import SingleProduct from './components/SingleProduct';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error, searchQuery, sortOption, filters, pagination } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchMetadata());
    dispatch(fetchProducts());
  }, [dispatch, searchQuery, sortOption, filters, pagination.currentPage]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Router>
      <div>
        <UtilityBar />
        <Header />
        <Hero />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <ProductCategories />
                <h1>Products</h1>
                <ProductList products={products} />
                <Pagination />
              </>
            }
          />
          {/* Route for displaying all products in a specific category */}
          <Route path="/category/:categoryId/:categoryTitle" element={<CategoryProducts />} />
          {/* New route for displaying a single product detail */}
          <Route path="/product/:productId" element={<SingleProduct />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;