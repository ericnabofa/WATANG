// src/components/Pagination.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../store/slices/productSlice';
import { RootState } from '../store/store';

const Pagination: React.FC = () => {
  const dispatch = useDispatch();
  const { currentPage, pageSize, totalProducts } = useSelector(
    (state: RootState) => state.products.pagination
  );

  const totalPages = Math.ceil(totalProducts / pageSize);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <div>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => handlePageChange(index + 1)}
          disabled={currentPage === index + 1}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;