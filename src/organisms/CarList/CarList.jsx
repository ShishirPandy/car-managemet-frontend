import React, { useEffect, useState } from 'react';
import ProductForm from '../ProductForm/ProductForm';
import ProductList from '../ProductList/ProductList';
import axios from 'axios';
import './carList.css';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch cars from the backend
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/cars/`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setCars(response.data); // Assuming the response contains an array of cars
        setFilteredCars(response.data); // Initially show all cars
      } catch (err) {
        setError('Failed to fetch cars');
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Filter cars based on search query
  useEffect(() => {
    const filtered = cars.filter((car) => {
      return (
        car.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (car.tags && car.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
      );
    });
    setFilteredCars(filtered);
  }, [searchQuery, cars]);

  const handleView = (carId) => {
    console.log('Viewing car:', carId);
  };

  const handleDelete = async (carId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/cars/${carId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setCars(cars.filter(car => car._id !== carId)); // Remove deleted car from the list
      setFilteredCars(filteredCars.filter(car => car._id !== carId)); // Remove from filtered list as well
    } catch (err) {
      console.error('Error deleting car:', err);
    }
  };

  const handleFormSubmit = () => {
    // After a car is added, refetch the cars
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/cars/`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then((response) => {
        setCars(response.data);
        setFilteredCars(response.data); // Reset the filtered cars
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch cars after adding.');
      });
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // Update search query state
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="car-list-container">
      <div className="search-bar">
        <input
          className='searchbar'
          type="text"
          placeholder="Search by title, description, or tags"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="car-form">
        <ProductForm onSubmit={handleFormSubmit} />
      </div>
      {filteredCars.length > 0 && (
        <div className="car-list">
          <h2>Your Cars</h2>
          <ProductList products={filteredCars} onView={handleView} onDelete={handleDelete} />
        </div>
      )}
    </div>
  );
};

export default CarList;
