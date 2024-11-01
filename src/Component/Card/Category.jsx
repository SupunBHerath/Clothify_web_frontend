import React from 'react';
import { useNavigate } from 'react-router-dom';

const CategoryCard = ({ img, path }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      style={{
      
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        transition: "box-shadow 0.3s ease",
        cursor: "pointer", // Indicates that the card is clickable
        position: "relative",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
      }}
    >
      <img
        alt="Category"
        src={img}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "transform 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      />
    </div>
  );
};

export default CategoryCard;
