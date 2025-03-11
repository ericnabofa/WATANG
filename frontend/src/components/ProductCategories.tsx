import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import api from '../services/api';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useNavigate, Link } from 'react-router-dom';

// Styled components (unchanged)
const CategoriesContainer = styled.section`
  padding: 40px 20px;
  background-color: #ffffff;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 40px;
`;

const CategoryWrapper = styled.div`
  position: relative;
  margin-bottom: 40px;
`;

const CategoryHeader = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #003366;
  text-align: center;
  margin-bottom: 20px;
`;

const ViewMoreButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
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
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #003366;
    color: #ffffff;
  }

  @media (max-width: 768px) {
    top: -40px;
    right: 50%;
    transform: translateX(50%);
  }
`;

const CarouselContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  overflow: hidden;
  padding: 0 20px;
`;

const CarouselArrow = styled.button`
  background-color: rgba(0, 51, 102, 0.8);
  border: none;
  color: #ffffff;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  transition: background-color 0.3s;

  &:hover {
    background-color: #00509e;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const LeftArrow = styled(CarouselArrow)`
  left: 0;
`;

const RightArrow = styled(CarouselArrow)`
  right: 0;
`;

const ProductCarousel = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding-bottom: 20px;
  scroll-behavior: smooth;
  justify-content: flex-start;
  width: 100%;
  scroll-snap-type: x mandatory;

  &::-webkit-scrollbar {
    display: none;
  }
`;

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
  scroll-snap-align: start;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    width: 100%;
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

const PaginationDots = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
`;

const Dot = styled.button<{ $active: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ $active }) => ($active ? '#003366' : '#cccccc')};
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #00509e;
  }
`;

interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    image: string;
  }
  
  interface Category {
    id: number; // Add category ID
    title: string;
    products: Product[];
  }
  
  const ProductCategories: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPages, setCurrentPages] = useState<{ [key: string]: number }>({});
    const carouselRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const navigate = useNavigate();
  
    const searchQuery = useSelector((state: RootState) => state.products.searchQuery);
  
    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const response = await api.get('/api/metadata/categorys');
          const categoriesData = response.data;
  
          const categoriesWithProducts = await Promise.all(
            categoriesData.map(async (category: any) => {
              const productsResponse = await api.get('/products', {
                params: { categoryId: category.id, search: searchQuery },
              });
              return {
                id: category.id, // Include category ID
                title: category.name,
                products: productsResponse.data.products.map((product: any) => ({
                  id: product.id,
                  name: product.name,
                  description: product.description || 'No description available',
                  price: `₦${product.price}`,
                  image: product.image || '/placeholder-image.jpg',
                })),
              };
            })
          );
  
          setCategories(categoriesWithProducts);
          const initialPages = categoriesWithProducts.reduce((acc, category) => {
            acc[category.title] = 0;
            return acc;
          }, {} as { [key: string]: number });
          setCurrentPages(initialPages);
        } catch (err) {
          setError('Failed to fetch categories and products');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchCategories();
    }, [searchQuery]);
  
    // Function to handle scrolling the carousel
    const handleScroll = (categoryTitle: string, direction: 'left' | 'right') => {
      const carousel = carouselRefs.current[categoryTitle];
      if (carousel) {
        const scrollAmount = direction === 'left' ? -200 : 200; // Adjust scroll amount as needed
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  
        // Update the current page state
        const newPage =
          direction === 'left'
            ? currentPages[categoryTitle] - 1
            : currentPages[categoryTitle] + 1;
        setCurrentPages((prev) => ({ ...prev, [categoryTitle]: newPage }));
      }
    };
  
    // Function to handle pagination dot clicks
    const handleDotClick = (categoryTitle: string, index: number) => {
      const carousel = carouselRefs.current[categoryTitle];
      if (carousel) {
        const scrollAmount = index * 200; // Adjust scroll amount based on card width
        carousel.scrollTo({ left: scrollAmount, behavior: 'smooth' });
        setCurrentPages((prev) => ({ ...prev, [categoryTitle]: index }));
      }
    };
  
    // Function to handle "View More" button clicks
    const handleViewMore = (categoryId: number, categoryTitle: string) => {
        navigate(`/category/${categoryId}/${encodeURIComponent(categoryTitle)}`); // Pass both categoryId and categoryTitle
      };
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
  
    return (
      <CategoriesContainer>
        {categories.map((category) => {
          const productsPerPage = 5;
          const totalPages = Math.ceil(category.products.length / productsPerPage);
          const startIndex = currentPages[category.title] * productsPerPage;
          const visibleProducts = category.products.slice(startIndex, startIndex + productsPerPage);
  
          return (
            <CategoryWrapper key={category.title} id={category.title.toLowerCase().replace(/\s+/g, '-')}>
              <CategoryHeader>{category.title}</CategoryHeader>
              <ViewMoreButton onClick={() => handleViewMore(category.id, category.title)}>
                View More →
              </ViewMoreButton>
              <CarouselContainer>
                <LeftArrow
                  onClick={() => handleScroll(category.title, 'left')}
                  disabled={currentPages[category.title] === 0}
                >
                  &lt;
                </LeftArrow>
                <ProductCarousel
                  ref={(el) => {
                    if (el) {
                      carouselRefs.current[category.title] = el;
                    }
                  }}
                >
                  {visibleProducts.map((product) => (
                    <Link key={product.id} to={`/product/${product.id}`}>
                    <ProductCard key={product.id}>
                    <ProductImage src={product.image} alt={product.name} />
                    <ProductTitle>{product.name}</ProductTitle>
                    <ProductDescription>{product.description}</ProductDescription>
                    <ProductPrice>{product.price}</ProductPrice>
                      <AddToCartButton>
                      Add to Cart <span>🛒</span>
                      </AddToCartButton>
                  </ProductCard>
                  </Link>
                  ))}
                </ProductCarousel>
                <RightArrow
                  onClick={() => handleScroll(category.title, 'right')}
                  disabled={currentPages[category.title] === totalPages - 1}
                >
                  &gt;
                </RightArrow>
              </CarouselContainer>
              <PaginationDots>
                {Array.from({ length: totalPages }).map((_, index) => (
                  <Dot
                    key={index}
                    $active={index === currentPages[category.title]}
                    onClick={() => handleDotClick(category.title, index)}
                  />
                ))}
              </PaginationDots>
            </CategoryWrapper>
          );
        })}
      </CategoriesContainer>
    );
  };
  
  export default ProductCategories;