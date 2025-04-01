import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { updateQuantity, removeFromCart } from '../store/slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface CartItem {
  id: number;
  name: string;
  price: number | string;
  quantity: number;
  image: string;
}

const Cart: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [subscriptionType, setSubscriptionType] = useState<{ [productId: number]: string }>({});
  const [isSubscribed, setIsSubscribed] = useState<{ [productId: number]: boolean }>({});

  const handleSubscriptionChange = (productId: number, type: string) => {
    setSubscriptionType((prev) => ({
      ...prev,
      [productId]: type,
    }));

    setIsSubscribed((prev) => ({
      ...prev,
      [productId]: type !== 'one-time',
    }));
  };

  const calculateTotalPrice = (price: number, quantity: number, productId: number) => {
    let totalPrice = price * quantity;
    if (subscriptionType[productId] === 'weekly' || subscriptionType[productId] === 'monthly') {
      totalPrice = totalPrice * 0.9; // 10% discount for subscription
    }
    return totalPrice;
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.toString().replace(/[^\d.-]/g, ''));
      const totalPrice = calculateTotalPrice(price, item.quantity, item.id);
      return total + totalPrice;
    }, 0);
  };

  const handleQuantityChange = (productId: number, amount: number) => {
    const type = amount === 1 ? 'increment' : 'decrement';
    dispatch(updateQuantity({ id: productId, type }));
  };

  const handleRemoveItem = (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <Container>
      <CartItemsSection>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <EmptyCart>
            <p>Your cart is empty.</p>
            <button onClick={() => navigate('/')}>Go Back to Shopping</button>
          </EmptyCart>
        ) : (
          <div>
            <ItemHeaders>
              <HeaderColumn>Product</HeaderColumn>
              <HeaderColumn>Price</HeaderColumn>
              <HeaderColumn>Quantity</HeaderColumn>
              <HeaderColumn>Total</HeaderColumn>
            </ItemHeaders>
            {cartItems.map((item) => {
              const price = parseFloat(item.price.toString().replace(/[^\d.-]/g, ''));
              const totalPrice = calculateTotalPrice(price, item.quantity, item.id);

              return (
                <Item key={item.id}>
                  <ItemColumn>
                    <ImageNameWrapper>
                      <img src={item.image} alt={item.name} />
                      <h4>{item.name}</h4>
                    </ImageNameWrapper>
                    {!isSubscribed[item.id] ? (
                      <UpgradeButton
                        onClick={() => {
                          setIsSubscribed((prev) => ({
                            ...prev,
                            [item.id]: true,
                          }));
                          handleSubscriptionChange(item.id, 'weekly');
                        }}
                      >
                        Upgrade to Subscription & Save 10%
                      </UpgradeButton>
                    ) : (
                      <SubscriptionSelect
                        onChange={(e) => handleSubscriptionChange(item.id, e.target.value)}
                        value={subscriptionType[item.id] || 'weekly'}
                      >
                        <option value="weekly">Every Week</option>
                        <option value="monthly">Every Month</option>
                        <option value="one-time">One-time</option>
                      </SubscriptionSelect>
                    )}
                  </ItemColumn>

                  <ItemColumn>
                    {/* Show price with strike-through when subscription is applied */}
                    {!isSubscribed[item.id] ? (
                      <OriginalPrice>
                        {price.toLocaleString('en-US', { style: 'currency', currency: 'NGN' })}
                      </OriginalPrice>
                    ) : (
                      <>
                        <DiscountedPrice>
                          {(price * 0.9).toLocaleString('en-US', { style: 'currency', currency: 'NGN' })}
                        </DiscountedPrice>
                        <OriginalPriceStrikethrough>
                          {price.toLocaleString('en-US', { style: 'currency', currency: 'NGN' })}
                        </OriginalPriceStrikethrough>
                      </>
                    )}
                  </ItemColumn>

                  <ItemColumn>
                    <QuantityControls>
                      <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                      <RemoveButton onClick={() => handleRemoveItem(item.id)}>🗑️</RemoveButton>
                    </QuantityControls>
                  </ItemColumn>

                  <ItemColumn>
                    <p>{totalPrice.toLocaleString('en-US', { style: 'currency', currency: 'NGN' })}</p>
                  </ItemColumn>
                </Item>
              );
            })}
          </div>
        )}
      </CartItemsSection>

      <OrderSummary>
        <h2>Order Summary</h2>
        <div>
          <strong>Subtotal:</strong> {calculateSubtotal().toLocaleString('en-US', { style: 'currency', currency: 'NGN' })}
        </div>
        <div>
          <strong>Shipping:</strong> Free
        </div>
        <div>
          <strong>Total:</strong> {calculateSubtotal().toLocaleString('en-US', { style: 'currency', currency: 'NGN' })}
        </div>
        <CheckoutButton>Checkout</CheckoutButton>
      </OrderSummary>
    </Container>
  );
};

export default Cart;

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: auto;
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 20px;
`;

const CartItemsSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 10px;
  margin-bottom: 20px;
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

const EmptyCart = styled.div`
  text-align: center;
  button {
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #003366;
    color: #fff;
    border: none;
    border-radius: 8px;
  }
`;

const ItemHeaders = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 10px;
  margin-bottom: 10px;
`;

const HeaderColumn = styled.div`
  font-weight: bold;
  text-align: center;
`;

const Item = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 10px;
  margin-bottom: 20px;
  align-items: center;
`;

const ItemColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const ImageNameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
  }
  h4 {
    margin: 0;
    font-size: 16px;
  }
`;

const UpgradeButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #003366;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  font-weight: bold;
  text-align: center;
  white-space: normal;
  line-height: 1.4;
  width: 100%;
  transition: background-color 0.3s;
  max-width: 200px;
  overflow-wrap: break-word;
  word-wrap: break-word;

  &:hover {
    background-color: #002d53;
  }
`;

const SubscriptionSelect = styled.select`
  padding: 5px 10px;
  border-radius: 5px;
  margin-top: 10px;
  width: 150px;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  button {
    padding: 5px 10px;
    margin: 0;
    font-size: 16px;
    cursor: pointer;
  }

  span {
    margin: 0 10px;
  }
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: red;
  font-size: 18px;
  cursor: pointer;
`;

const OriginalPrice = styled.p`
  text-decoration: none;
  color: #000;
`;

const OriginalPriceStrikethrough = styled.p`
  text-decoration: line-through;
  color: #888;
`;

const DiscountedPrice = styled.p`
  color: red;
  font-weight: bold;
  margin-bottom: 5px;
`;

const OrderSummary = styled.div`
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  height: 250px;
  position: sticky;
  top: 0;
  overflow-y: auto;

  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const CheckoutButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #003366;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;
