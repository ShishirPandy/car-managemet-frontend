import React, { useState } from 'react';
import './modal.css';

const Modal = ({ isOpen, imageSrc, title, description, onClose, onSave, carId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newImageFile, setNewImageFile] = useState(null); // New state for image file

  if (!isOpen) return null;

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    if (newTitle !== title || newDescription !== description || newImageFile) {
      onSave(newTitle, newDescription, newImageFile); // Pass updated values to onSave
    }
    setIsEditing(false); // Close the modal after saving
  };

  const handleCancelClick = () => {
    setNewTitle(title);
    setNewDescription(description);
    setNewImageFile(null); // Reset image file
    setIsEditing(false);
  };

  const handleImageChange = (e) => {
    setNewImageFile(e.target.files[0]); // Store the selected file
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>X</button>
        <img src={imageSrc} alt={title} className="modal-image" />
        
        {isEditing ? (
          <div>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="modal-input"
            />
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="modal-textarea"
            />
            <input
              type="file"
              onChange={handleImageChange} // Handle file change
              className="modal-input"
            />
          </div>
        ) : (
          <div>
            <h3>{newTitle}</h3>
            <p>{newDescription}</p>
          </div>
        )}

        <div className="modal-actions">
          {isEditing ? (
            <>
              <button onClick={handleSaveClick}>Save</button>
              <button onClick={handleCancelClick}>Cancel</button>
            </>
          ) : (
            <button onClick={handleEditClick}>Edit</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
