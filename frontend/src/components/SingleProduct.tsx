import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import api from '../services/api';
import { FaShoppingCart } from 'react-icons/fa';
import { AxiosResponse } from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice'; // Import the Redux action
import { Product, CartItem } from '../types/product'; 


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


const SingleProduct: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const dispatch = useDispatch(); // Initialize Redux dispatch
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string>('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response: AxiosResponse<Product> = await api.get(`/products/${productId}`);
        setProduct(response.data);
        setSelectedImage(response.data.image || '/default-image.jpg');
      } catch (err) {
        setError('Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      console.log("Adding to cart:", product); // Debugging
      const cartItem: CartItem = {
        ...product,
        quantity,
      };
  
      dispatch(addToCart(cartItem));
    }
  };
  
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error} <button onClick={() => window.location.reload()}>Retry</button></div>;
  if (!product) return <div>Product not found</div>;

  return (
    <>
      <BreadcrumbNavigation>
        <span>Home / Products / {product.name}</span>
      </BreadcrumbNavigation>
      <ProductPageContainer>
        <ProductDetails>
          <ProductImageSection>
            <ProductImage src={selectedImage} alt={product.name || 'Product'} />
            <ProductCarousel>
  {(product.images && product.images.length > 0 ? product.images : [product.image]).map((img: string, index: number) => (
    <Thumbnail
      key={index}
      src={img}
      alt={`Thumbnail ${index + 1}`}
      onClick={() => setSelectedImage(img)}
    />
  ))}
</ProductCarousel>

          </ProductImageSection>
          <ProductInfo>
            <ProductTitle>{product.name}</ProductTitle>
            <ProductPrice>{product.price}</ProductPrice>
            <QuantitySelector>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              />
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </QuantitySelector>
            <SubscriptionDropdown>
              <option>One Time</option>
              <option>Every Week</option>
              <option>Every Month</option>
            </SubscriptionDropdown>
            <AddToCartButton onClick={handleAddToCart}>
              <FaShoppingCart />
              Add to Cart
            </AddToCartButton>
          </ProductInfo>
        </ProductDetails>
      </ProductPageContainer>
    </>
  );
};

export default SingleProduct;
