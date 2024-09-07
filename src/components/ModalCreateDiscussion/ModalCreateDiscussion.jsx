import React, { useState } from 'react';
import './ModalCreateDiscussion.scss';
import closeIcon from "../../assets/icons/close.svg";

const ModalCreateDiscussion = ({ onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ title, content });

    // Reset form fields after submission
    setTitle('');
    setContent('');
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
        <h2>Create Discussion</h2>
        <div className="modal__form-container">
          <form onSubmit={handleSubmit} className="modal__form">
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
              <label htmlFor="content">Content</label>
              <textarea 
                id="content" 
                value={content} 
                onChange={(e) => setContent(e.target.value)} 
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

export default ModalCreateDiscussion;