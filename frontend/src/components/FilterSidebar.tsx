// src/components/FilterSidebar.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../store/slices/productSlice';
import { RootState } from '../store/store';

const FilterSidebar: React.FC = () => {
  const dispatch = useDispatch();
  const { categories, brands, flavors, volumes, packSizes } = useSelector(
    (state: RootState) => state.metadata
  );

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    dispatch(setFilters({ [name]: Number(value) }));
  };

  const handleClearFilters = () => {
    dispatch(setFilters({}));
  };

  return (
    <div>
      <h3>Filters</h3>
      <div>
        <label>Category:</label>
        <select name="categoryId" onChange={handleFilterChange}>
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Brand:</label>
        <select name="brandId" onChange={handleFilterChange}>
          <option value="">All Brands</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Flavor:</label>
        <select name="flavorId" onChange={handleFilterChange}>
          <option value="">All Flavors</option>
          {flavors.map((flavor) => (
            <option key={flavor.id} value={flavor.id}>
              {flavor.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Volume:</label>
        <select name="volumeId" onChange={handleFilterChange}>
          <option value="">All Volumes</option>
          {volumes.map((volume) => (
            <option key={volume.id} value={volume.id}>
              {volume.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Pack Size:</label>
        <select name="packSizeId" onChange={handleFilterChange}>
          <option value="">All Pack Sizes</option>
          {packSizes.map((packSize) => (
            <option key={packSize.id} value={packSize.id}>
              {packSize.name}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleClearFilters}>Clear Filters</button>
    </div>
  );
};

export default FilterSidebar;