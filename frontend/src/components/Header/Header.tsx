import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import WATANglogo from '../../assets/WATA logo.png';
import UserIcon from '../../assets/user-icon.svg';
import CartIcon from '../../assets/cart-icon.svg';
import SearchIcon from '../../assets/search-icon.svg';
import SearchBar from '../SearchBar';
import styled from 'styled-components';

// Styled components (unchanged)
const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #FFFFFF;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const DesktopSearch = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
`;

const MobileSearchIcon = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: block;

  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileSearchContainer = styled.div`
  position: absolute;
  top: 80px;
  left: 20px;
  right: 20px;
  z-index: 10;
  background-color: #FFFFFF;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 10px;

  @media (min-width: 768px) {
    display: none;
  }
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #003366;
`;

const Header: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const [isMobileSearchVisible, setIsMobileSearchVisible] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    if (isMobileSearchVisible && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isMobileSearchVisible]);

  return (
    <HeaderContainer>
      {/* Branding */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={WATANglogo}
          alt="Company Logo"
          style={{ height: '40px', marginRight: '10px', cursor: 'pointer' }}
          onClick={() => navigate('/')} // Navigate to homepage on click
        />
        <span style={{ color: '#003366', fontSize: '18px', fontWeight: 'bold' }}>
          Ikeja
        </span>
      </div>

      {/* Navigation Menu */}
      <Nav>
        {/* SearchBar (visible on desktop) */}
        <DesktopSearch>
          <SearchBar />
        </DesktopSearch>

        {/* Mobile Search Icon (visible on mobile) */}
        <MobileSearchIcon
          onClick={() => setIsMobileSearchVisible(!isMobileSearchVisible)}
        >
          <img
            src={SearchIcon}
            alt="Search"
            style={{ height: '24px' }}
          />
        </MobileSearchIcon>

        {/* Mobile Search Input (visible when toggled) */}
        {isMobileSearchVisible && (
          <MobileSearchContainer>
            <SearchBar ref={searchInputRef} />
            <CloseButton onClick={() => setIsMobileSearchVisible(false)}>
              X
            </CloseButton>
          </MobileSearchContainer>
        )}

        {/* User Icon */}
        <button
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <img
            src={UserIcon}
            alt="User"
            style={{ height: '24px' }}
          />
        </button>

        {/* Cart Icon */}
        <div style={{ position: 'relative' }}>
          <img
            src={CartIcon}
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
      </Nav>
    </HeaderContainer>
  );
};

export default Header;