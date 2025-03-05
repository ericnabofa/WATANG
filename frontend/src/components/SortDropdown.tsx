// src/components/SortDropdown.tsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { setSortOption } from '../store/slices/productSlice';

const SortDropdown: React.FC = () => {
  const dispatch = useDispatch();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortOption(e.target.value));
  };

  return (
    <select onChange={handleSortChange}>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
      <option value="name-asc">Name: A to Z</option>
      <option value="name-desc">Name: Z to A</option>
    </select>
  );
};

export default SortDropdown;