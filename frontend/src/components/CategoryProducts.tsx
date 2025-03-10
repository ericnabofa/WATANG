import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import styled from 'styled-components';

// Styled components for product cards (reuse or adapt from ProductCategories.tsx)
const ProductCard = styled.div`
  flex: 0 0 auto;
  width: 280px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  background-color: #ffffff;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
`;

const ProductTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  color: #003366;
  margin: 10px 0;
`;

const ProductDescription = styled.p`
  font-size: 14px;
  color: #666666;
  margin: 5px 0;
`;

const ProductPrice = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #003366;
  margin: 10px 0;
`;

const AddToCartButton = styled.button`
  background-color: #003366;
  color: #ffffff;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  transition: background-color 0.3s;

  &:hover {
    background-color: #00509e;
  }
`;

const ProductsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  justify-content: center;
`;

const CategoryTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #003366;
  text-align: center;
  margin-bottom: 20px;
`;

const CategoryProducts: React.FC = () => {
  const { categoryId, categoryTitle } = useParams<{ categoryId: string; categoryTitle: string }>();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products', {
          params: { categoryId: categoryId }, // Fetch products for the specific category
        });
        setProducts(response.data.products);
      } catch (err) {
        setError('Failed to fetch products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {/* Display the category name as the title */}
      <CategoryTitle>{decodeURIComponent(categoryTitle || 'Category Products')}</CategoryTitle>
      <ProductsContainer>
        {products.map((product) => (
          <ProductCard key={product.id}>
            <ProductImage src={product.image} alt={product.name} />
            <ProductTitle>{product.name}</ProductTitle>
            <ProductDescription>{product.description}</ProductDescription>
            <ProductPrice>{product.price}</ProductPrice>
            <AddToCartButton>
              Add to Cart <span>🛒</span>
            </AddToCartButton>
          </ProductCard>
        ))}
      </ProductsContainer>
    </div>
  );
};

export default CategoryProducts;