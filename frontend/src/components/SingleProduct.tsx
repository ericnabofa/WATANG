import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import api from '../services/api';
import { FaShoppingCart } from 'react-icons/fa';

const ProductPageContainer = styled.div`
  max-width: 1200px;
  margin: 40px auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const BreadcrumbNavigation = styled.div`
  font-size: 14px;
  margin-bottom: 20px;
  color: #003366;
`;

const ProductDetails = styled.div`
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
`;

const ProductImageSection = styled.div`
  flex: 1;
  max-width: 600px;
`;

const ProductImage = styled.img`
  width: 100%;
  max-width: 100%;
  border-radius: 10px;
  object-fit: cover;
`;

const ProductCarousel = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const Thumbnail = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const ProductInfo = styled.div`
  flex: 1;
  max-width: 500px;
`;

const ProductTitle = styled.h1`
  font-size: 28px;
  color: #003366;
  margin-bottom: 10px;
`;

const ProductPrice = styled.p`
  font-size: 26px;
  font-weight: bold;
  color: #003366;
  margin-bottom: 20px;
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  button {
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    padding: 5px 15px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #ddd;
    }
  }

  input {
    text-align: center;
    width: 50px;
    border: 1px solid #ccc;
    padding: 5px;
    margin: 0 10px;
  }
`;

const SubscriptionDropdown = styled.select`
  padding: 8px;
  margin-bottom: 20px;
  font-size: 16px;
  border: 1px solid #ccc;
  width: 100%;
  border-radius: 5px;
`;

const AddToCartButton = styled.button`
  background-color: #003366;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #00509e;
  }
`;

const ProductDescription = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 15px;
`;

const Accordion = styled.div`
  margin-top: 20px;
  background: #f7f7f7;
  border-radius: 10px;
  padding: 10px;
`;

const AccordionSection = styled.div`
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
  cursor: pointer;
  display: flex;
  justify-content: space-between;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f1f1f1;
  }
`;

interface ChevronProps {
  isOpen: boolean;
}

const Chevron = styled.span<ChevronProps>`
  transform: rotate(${(props) => (props.isOpen ? '180deg' : '0')});
  transition: transform 0.3s;
`;

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  details: string[];
}

const SingleProduct: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAccordionOpen, setAccordionOpen] = useState<boolean[]>(new Array(5).fill(false));

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${productId}`);
        setProduct(response.data);
      } catch (err) {
        setError('Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleAccordionToggle = (index: number) => {
    const newAccordionState = [...isAccordionOpen];
    newAccordionState[index] = !newAccordionState[index];
    setAccordionOpen(newAccordionState);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <>
      <BreadcrumbNavigation>
        <span>Home / Products / {product.name}</span>
      </BreadcrumbNavigation>
      <ProductPageContainer>
        <ProductDetails>
          <ProductImageSection>
            <ProductImage src={product.image || '/default-image.jpg'} alt={product.name || 'Product'} />
            <ProductCarousel>
              <Thumbnail src={product.image || '/default-thumbnail.jpg'} alt="Product thumbnail" />
              {/* Add more thumbnails as necessary */}
            </ProductCarousel>
          </ProductImageSection>
          <ProductInfo>
            <ProductTitle>{product.name}</ProductTitle>
            <ProductPrice>{product.price}</ProductPrice>

            <QuantitySelector>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <input type="number" value={quantity} readOnly />
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </QuantitySelector>

            <SubscriptionDropdown>
              <option>One Time</option>
              <option>Every Week</option>
              <option>Every Month</option>
            </SubscriptionDropdown>

            <AddToCartButton>
              <FaShoppingCart />
              Add to Cart
            </AddToCartButton>
            <ProductDescription>{product.description}</ProductDescription>
          </ProductInfo>
        </ProductDetails>

        <Accordion>
          {(product.details || []).map((detail, index) => (
            <AccordionSection key={index} onClick={() => handleAccordionToggle(index)}>
              <span>{detail}</span>
              <Chevron isOpen={isAccordionOpen[index]}>▼</Chevron>
            </AccordionSection>
          ))}
        </Accordion>
      </ProductPageContainer>
    </>
  );
};

export default SingleProduct;
