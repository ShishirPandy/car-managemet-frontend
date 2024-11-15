// src/pages/ProductDetail.js
import React from 'react';
import Buttonn from '../../atoms/Button/Buttonn';

const ProductDetail = ({ product, onEdit, onDelete }) => {
  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div className="product-detail">
      <h1>{product.title}</h1>
      <img src={product.image} alt={product.title} />
      <p>{product.description}</p>
      <div className="product-detail-actions">
        <Buttonn onClick={() => onEdit(product.id)} className="primary">Edit</Buttonn>
        <Buttonn onClick={() => onDelete(product.id)} className="secondary">Delete</Buttonn>
      </div>
    </div>
  );
};

export default ProductDetail;
