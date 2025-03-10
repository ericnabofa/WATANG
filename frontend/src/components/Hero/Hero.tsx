import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Hero: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleCategoryClick = (category: string) => {
    // Navigate to the homepage
    navigate('/');

    // Scroll to the corresponding category section after a short delay
    setTimeout(() => {
      const sectionId = category.toLowerCase().replace(/\s+/g, '-'); // Convert category name to a valid ID
      const sectionElement = document.getElementById(sectionId);
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100); // Small delay to ensure the page has loaded
  };

  return (
    <section style={{
      background: 'linear-gradient(to right, #FFFFFF, #E6F2FF)',
      padding: '40px 20px',
      textAlign: 'center',
    }}>
      <h1 style={{
        fontSize: '48px',
        color: '#003366',
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
              backgroundColor: '#003366',
              color: '#FFFFFF',
              padding: '10px 20px',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              transition: 'background-color 0.3s, transform 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#00509E';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#003366';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            onClick={() => handleCategoryClick(category)} // Handle category button click
          >
            {category}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Hero;