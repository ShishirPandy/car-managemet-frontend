// src/components/atoms/Button.js
import React from 'react';
import './button.css';

const Buttonn = ({ children, onClick, type = "button", className = "" }) => {
  return (
    <button className={`button ${className}`} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Buttonn;
