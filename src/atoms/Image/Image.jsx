// src/components/atoms/Image.js
import React from 'react';
import './image.css';

const Image = ({ src, alt, className = "" }) => {
  return <img className={`image ${className}`} src={src} alt={alt} />;
};

export default Image;
