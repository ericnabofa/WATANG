// src/components/ProductCategories.tsx
import React from 'react';
import styled from 'styled-components';

// Styled components for the ProductCategories section
const CategoriesContainer = styled.section`
  padding: 40px 20px;
  background-color: #FFFFFF;
`;

const CategoryHeader = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #003366;
  text-align: center;
  margin-bottom: 20px;
`;

const ViewMoreButton = styled.button`
  background-color: transparent;
  border: 2px solid #003366;
  color: #003366;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 auto;
  margin-bottom: 20px;

  &:hover {
    background-color: #003366;
    color: #FFFFFF;
  }
`;

const ProductCarousel = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding-bottom: 20px;

  &::-webkit-scrollbar {
    display: none; // Hide scrollbar
  }
`;

const ProductCard = styled.div`
  flex: 0 0 auto;
  width: 200px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  background-color: #FFFFFF;
  text-align: center;
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
  color: #FFFFFF;
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

  &:hover {
    background-color: #00509E;
  }
`;

const categories = [
  {
    title: 'Bottled Water',
    products: [
      { id: 1, name: 'Aquafina 500ml', description: 'Pure and refreshing', price: '₦200', image: '/bottled-water-1.jpg' },
      { id: 2, name: 'Eva Water 750ml', description: 'Natural spring water', price: '₦250', image: '/bottled-water-2.jpg' },
      { id: 3, name: 'CWAY 1L', description: 'Premium drinking water', price: '₦300', image: '/bottled-water-3.jpg' },
    ],
  },
  {
    title: 'Flavored Water',
    products: [
      { id: 4, name: 'Lemon Flavored', description: 'Zesty and refreshing', price: '₦350', image: '/flavored-water-1.jpg' },
      { id: 5, name: 'Strawberry Flavored', description: 'Sweet and tangy', price: '₦350', image: '/flavored-water-2.jpg' },
    ],
  },
  {
    title: 'Dispenser Refill',
    products: [
      { id: 6, name: '5L Refill', description: 'For home and office', price: '₦500', image: '/dispenser-refill-1.jpg' },
      { id: 7, name: '10L Refill', description: 'Economical and convenient', price: '₦800', image: '/dispenser-refill-2.jpg' },
    ],
  },
  {
    title: 'Sachet Water',
    products: [
      { id: 8, name: '20 Sachets', description: 'Affordable and portable', price: '₦100', image: '/sachet-water-1.jpg' },
      { id: 9, name: '40 Sachets', description: 'Bulk purchase discount', price: '₦180', image: '/sachet-water-2.jpg' },
    ],
  },
  {
    title: 'Accessories',
    products: [
      { id: 10, name: 'Water Dispenser', description: 'Compact and stylish', price: '₦15,000', image: '/accessories-1.jpg' },
      { id: 11, name: 'Water Bottle', description: 'Reusable and eco-friendly', price: '₦1,500', image: '/accessories-2.jpg' },
    ],
  },
];

const ProductCategories: React.FC = () => {
  return (
    <CategoriesContainer>
      {categories.map((category) => (
        <div key={category.title}>
          <CategoryHeader>{category.title}</CategoryHeader>
          <ViewMoreButton>
            View More <span>→</span>
          </ViewMoreButton>
          <ProductCarousel>
            {category.products.map((product) => (
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
          </ProductCarousel>
        </div>
      ))}
    </CategoriesContainer>
  );
};

export default ProductCategories;