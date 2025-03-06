// src/components/UtilityBar/UtilityBar.tsx
import React from 'react';

const UtilityBar: React.FC = () => {
  return (
    <div style={{
      backgroundColor: '#003366', // Deep Blue
      color: '#FFFFFF', // White
      textAlign: 'center',
      padding: '10px',
      fontSize: '14px',
    }}>
      Have questions or want to order? Call us at{' '}
      <a href="tel:08109957139" style={{ color: '#FFFFFF', textDecoration: 'underline' }}>
        08109957139
      </a>
    </div>
  );
};

export default UtilityBar;