import React from 'react';
import styled from 'styled-components';

const SortDropdownContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SortLabel = styled.label`
  font-size: 14px;
  color: #003366;
`;

const SortSelect = styled.select`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 14px;
`;

interface SortDropdownProps {
  onSortChange: (sortOption: string) => void; // Callback for sort changes
}

const SortDropdown: React.FC<SortDropdownProps> = ({ onSortChange }) => {
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortOption = e.target.value;
    onSortChange(newSortOption); // Pass the selected sort option to the parent component
  };

  return (
    <SortDropdownContainer>
      <SortLabel>Sort by:</SortLabel>
      <SortSelect onChange={handleSortChange}>
        <option value="">Default</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="name-asc">Name: A to Z</option>
        <option value="name-desc">Name: Z to A</option>
      </SortSelect>
    </SortDropdownContainer>
  );
};

export default SortDropdown;