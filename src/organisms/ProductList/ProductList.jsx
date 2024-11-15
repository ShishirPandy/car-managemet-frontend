// src/components/organisms/ProductList.js
import React from 'react';
import Card from '../../molecules/Card/Card';
import './productList.css';

const ProductList = ({ products, onView, onDelete }) => {
  const getImageSrc = (images) => {
    if (images && images.length > 0) {
      // Ensure the image path is correct and the backend is serving it properly
      return `http://localhost:5000/uploads/${images[0]}`;
    }
    // Fallback to default image
    return '/default-image.jpg';
  };

  return (
    <div className="product-list">
      {products.map((product) => (
        <Card
          carId={product._id}
          key={product._id}
          imageSrc={getImageSrc(product.images)}
          title={product.title}
          description={product.description}
          onView={() => onView(product._id)}
          onDelete={() => onDelete(product._id)}
        />
      ))}
    </div>
  );
};

export default ProductList;
