// src/components/SearchBar.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../store/slices/productSlice';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setSearchQuery(query));
  };

  return (
    <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center' }}>
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          padding: '8px',
          borderRadius: '4px',
          border: '1px solid #CCCCCC',
          width: '200px',
          marginRight: '10px',
        }}
      />
      <button
        type="submit"
        style={{
          padding: '8px 12px',
          borderRadius: '4px',
          border: 'none',
          backgroundColor: '#003366',
          color: '#FFFFFF',
          cursor: 'pointer',
        }}
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;