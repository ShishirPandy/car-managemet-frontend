// src/components/atoms/Input.js
import React from 'react';
import './input.css';

const Input = ({ type = "text", placeholder, value, onChange, className = "" }) => {
  return (
    <input
      className={`input ${className}`}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
