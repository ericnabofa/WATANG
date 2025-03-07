// src/components/SearchBar.tsx
import React, { useState, forwardRef } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../store/slices/productSlice';
import SearchIcon from '../assets/search-icon.svg'; // Import the search icon

interface SearchBarProps {
  ref?: React.Ref<HTMLInputElement>;
}

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>((props, ref) => {
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
        ref={ref} // Forward the ref to the input element
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
        <img
          src={SearchIcon}
          alt="Search"
          style={{ height: '16px' }}
        />
      </button>
    </form>
  );
});

export default SearchBar;