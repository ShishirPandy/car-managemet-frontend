import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './dashboard.css';
import CarList from '../../organisms/CarList/CarList';

const Dashboard = ({ products, onProductView, onProductDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Fetch filtered products when searchTerm changes
  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        if (searchTerm) {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/cars/search`, {
            params: { keyword: searchTerm },
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`, // Add token for auth
            },
          });
          setFilteredProducts(response.data); // Update filtered products based on search
        } else {
          setFilteredProducts(products); // If no search term, show all products
        }
      } catch (err) {
        console.error('Error fetching search results:', err);
      }
    };

    fetchSearchResults();
  }, [searchTerm, products]);

  return (
    <div className="dashboard">
      <h1>Your Cars</h1>
      <CarList 
        products={filteredProducts}    // Pass filtered products to CarList
        onView={onProductView}         // Pass view handler to CarList
        onDelete={onProductDelete}     // Pass delete handler to CarList
      />
    </div>
  );
};

export default Dashboard;
