// src/components/molecules/FormField.js
import React from 'react';
import Input from '../../atoms/Input/Input';
import './formField.css';

const FormField = ({ label, type = "text", placeholder, value, onChange }) => {
  return (
    <div className="form-field">
      <label className="form-label">{label}</label>
      <Input type={type} placeholder={placeholder} value={value} onChange={onChange} />
    </div>
  );
};

export default FormField;
