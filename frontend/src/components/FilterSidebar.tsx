import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import styled from 'styled-components';

const FilterContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const FilterLabel = styled.label`
  font-size: 14px;
  color: #003366;
  margin-right: 8px;
`;

const FilterSelect = styled.select`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 14px;
`;

const ClearButton = styled.button`
  background-color: #003366;
  color: #ffffff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #00509e;
  }
`;

interface FilterSidebarProps {
  onFilterChange: (filters: { [key: string]: number }) => void; // Callback for filter changes
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ onFilterChange }) => {
  const { categories, brands, flavors, volumes, packSizes } = useSelector(
    (state: RootState) => state.metadata
  );

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (value === "") {
      // If "All" is selected, pass an empty object to remove the filter
      onFilterChange({});
    } else {
      // Pass the selected filter as a number
      onFilterChange({ [name]: Number(value) });
    }
  };

  return (
    <FilterContainer>
      <div>
        <FilterLabel>Brand:</FilterLabel>
        <FilterSelect name="brandId" onChange={handleFilterChange}>
          <option value="">All Brands</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </FilterSelect>
      </div>
      <div>
        <FilterLabel>Flavor:</FilterLabel>
        <FilterSelect name="flavorId" onChange={handleFilterChange}>
          <option value="">All Flavors</option>
          {flavors.map((flavor) => (
            <option key={flavor.id} value={flavor.id}>
              {flavor.name}
            </option>
          ))}
        </FilterSelect>
      </div>
      <div>
        <FilterLabel>Volume:</FilterLabel>
        <FilterSelect name="volumeId" onChange={handleFilterChange}>
          <option value="">All Volumes</option>
          {volumes.map((volume) => (
            <option key={volume.id} value={volume.id}>
              {volume.name}
            </option>
          ))}
        </FilterSelect>
      </div>
      <div>
        <FilterLabel>Pack Size:</FilterLabel>
        <FilterSelect name="packSizeId" onChange={handleFilterChange}>
          <option value="">All Pack Sizes</option>
          {packSizes.map((packSize) => (
            <option key={packSize.id} value={packSize.id}>
              {packSize.name}
            </option>
          ))}
        </FilterSelect>
      </div>
    </FilterContainer>
  );
};

export default FilterSidebar;