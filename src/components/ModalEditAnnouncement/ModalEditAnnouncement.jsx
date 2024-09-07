import React, { useState } from 'react';
import '../ModalCreateAnnouncement/ModalCreateAnnouncement.scss';
import './ModalEditAnnouncement.scss'
import backIcon from '../../assets/icons/back-arrow.svg'

const EditModalComponent = ({ announcement, onClose, onSubmit }) => {
  const [title, setTitle] = useState(announcement.title);
  const [message, setMessage] = useState(announcement.message);
  const [topic, setTopic] = useState(announcement.topic);
  const [error, setError] = useState(null);

  const handleEditAnnouncement = async (e) => {
    e.preventDefault();
    try {
      const updatedAnnouncement = { ...announcement, title, message, topic };
      await onSubmit(updatedAnnouncement); // Call the parent component's edit function
    } catch (error) {
      console.error('Error updating announcement:', error);
      setError('Failed to update announcement');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
      <img 
          src={backIcon}
          alt="Close"
          className="modal__back-icon"
          onClick={() => onClose()}
        />
        <h2 className="modal__form-container">Edit Announcement</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="modal__form-container">
            <form onSubmit={handleEditAnnouncement} className="modal__form">
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
                className="modal__textarea"
                />
            </div>
            <button type="submit" className="save-changes-button">Save Changes</button>
            </form>
        </div>
       
      </div>
    </div>
  );
};

export default EditModalComponent;