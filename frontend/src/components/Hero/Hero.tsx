// src/components/Hero/Hero.tsx
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section style={{
      background: 'linear-gradient(to right, #FFFFFF, #E6F2FF)', // White to Light Blue gradient
      padding: '40px 20px',
      textAlign: 'center',
    }}>
      <h1 style={{
        fontSize: '48px',
        color: '#003366', // Deep Blue
        marginBottom: '20px',
      }}>
        Pure Hydration, Delivered.
      </h1>

      {/* Category Buttons */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        flexWrap: 'wrap',
      }}>
        {['Bottled Water', 'Flavored Water', 'Dispenser Refill', 'Sachet Water', 'Accessories'].map((category) => (
          <button
            key={category}
            style={{
              backgroundColor: '#003366', // Deep Blue
              color: '#FFFFFF', // White
              padding: '10px 20px',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              transition: 'background-color 0.3s, transform 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#00509E'; // Lighter Blue on hover
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#003366';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {category}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Hero;