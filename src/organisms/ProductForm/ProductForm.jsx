// src/components/organisms/ProductForm.js
import React, { useState } from 'react';
import FormField from '../../molecules/FormField/FormField';
import Buttonn from '../../atoms/Button/Buttonn';
import './productForm.css';
import axios from 'axios';

const ProductForm = ({ onSubmit, initialData = {} }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset error state

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    images.forEach((image) => formData.append('images', image));

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/cars/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setLoading(false);
      onSubmit(); // Refresh car list after submitting
      setTitle('');
      setDescription('');
      setImages();
    } catch (err) {
      setLoading(false);
      setError('Error creating car. Please try again.');
      console.error('Error creating car:', err);
      console.error("Error in backend:", err);

    }
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      {error && <div className="error-message">{error}</div>}
      <FormField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <FormField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <FormField
        label="Upload Images"
        type="file"
        onChange={handleImageUpload}
        placeholder="Choose images"
        multiple
      />
      <Buttonn type="submit" className="primary" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </Buttonn>
    </form>
  );
};

export default ProductForm;
