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
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;