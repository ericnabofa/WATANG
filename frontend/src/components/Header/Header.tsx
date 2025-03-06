// src/components/Header/Header.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import WATANglogo from '../../assets/WATA logo.png';
import UserIcon from '../../assets/user-icon.svg';
import CartIcon from '../../assets/cart-icon.svg';
import SearchBar from '../SearchBar'; // Import the SearchBar component

const Header: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px',
      backgroundColor: '#FFFFFF', // White
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    }}>
      {/* Branding */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={WATANglogo} // Replace with your logo path
          alt="Company Logo"
          style={{ height: '40px', marginRight: '10px' }}
        />
        <span style={{ color: '#003366', fontSize: '18px', fontWeight: 'bold' }}>
          Ikeja
        </span>
      </div>

      {/* Navigation Menu */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <SearchBar /> {/* Use the SearchBar component here */}
        <button
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <img
            src={UserIcon} // Path to the user favicon in the public directory
            alt="User"
            style={{ height: '24px' }}
          />
        </button>
        <div style={{ position: 'relative' }}>
          <img
            src={CartIcon} // Replace with your cart icon path
            alt="Cart"
            style={{ height: '24px', cursor: 'pointer' }}
          />
          {cartItemCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '-10px',
                right: '-10px',
                backgroundColor: '#FF0000',
                color: '#FFFFFF',
                borderRadius: '50%',
                padding: '2px 6px',
                fontSize: '12px',
              }}
            >
              {cartItemCount}
            </span>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;