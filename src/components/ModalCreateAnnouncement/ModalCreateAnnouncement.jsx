import React, { useState } from 'react';
import './ModalCreateAnnouncement.scss'; // Make sure to create a CSS file for styling
import closeIcon from "../../assets/icons/close.svg";

const ModalCreateAnnouncement = ({ onClose, onSubmit }) => {
  // State for form inputs
  const [topic, setTopic] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    onSubmit({ topic, title, message }); // Call the onSubmit prop with form data
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <img 
          src={closeIcon}
          alt="Close"
          className="modal__close-icon"
          onClick={() => onClose()}
        />
        <h2>Create Announcement</h2>
        <div className="modal__form-container">
          <form onSubmit={handleSubmit} className="modal__form">
            <div className="modal__subcontainer">
              <label htmlFor="topic">Label</label>
              <input
                type="text"
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
              />
            </div>
            <div className="modal__subcontainer">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="modal__subcontainer">
              <label htmlFor="message">Body</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
         
        </div>
        
      </div>
    </div>
  );
};

export default ModalCreateAnnouncement;