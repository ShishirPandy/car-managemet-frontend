import React, { useState, useEffect } from 'react';
import Modal from '../../atoms/Modal/Modal';
import './card.css';
import axios from 'axios';

const Card = ({ imageSrc, title, description, carId, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageSrc, setCurrentImageSrc] = useState(imageSrc);  // Use imageSrc prop initially
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentDescription, setCurrentDescription] = useState(description);

  // Ensure image path is correctly formatted
  const formattedImageSrc = currentImageSrc 
    ? `http://localhost:5000/uploads/${currentImageSrc.split('\\').pop()}`
    : '/default-image.jpg';  // Default image if no image path

  const handleViewClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = async (newTitle, newDescription, newImageFile) => {
    const formData = new FormData();

    formData.append('title', newTitle);
    formData.append('description', newDescription);

    // Only append image if a file exists
    if (newImageFile) {
      formData.append('images', newImageFile); 
    }

    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/cars/${carId}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      // Dynamically update the image
      if (response.data.images && response.data.images.length > 0) {
        setCurrentImageSrc(response.data.images[0]); // Update with new image
      }

      // Handle title and description update
      setCurrentTitle(response.data.title);
      setCurrentDescription(response.data.description);

    } catch (err) {
      console.error('Error updating car:', err);
    }
  };

  // Effect hook to update currentImageSrc if imageSrc prop changes
  useEffect(() => {
    setCurrentImageSrc(imageSrc);
  }, [imageSrc]);

  return (
    <>
      <div className="card">
        <img
          src={formattedImageSrc}
          alt={currentTitle}
          className="card-image"
          onError={() => console.error(`Failed to load image at ${formattedImageSrc}`)}
          onLoad={() => console.log(`Image loaded successfully from ${formattedImageSrc}`)}
        />
        <div className="card-details">
          <h3>{currentTitle}</h3>
          <p>{currentDescription}</p>
        </div>
        <div className="card-actions">
          <button onClick={handleViewClick}>View</button>
          <button onClick={onDelete}>Delete</button>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        imageSrc={formattedImageSrc}
        title={currentTitle}
        description={currentDescription}
        carId={carId}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
    </>
  );
};

export default Card;
