// src/components/ModalConfirmDelete/ModalConfirmDelete.jsx
import './ModalDeleteDiscussion.scss';
import React from 'react';
import closeIcon from '../../assets/icons/close.svg';

const ModalDeleteDiscussion = ({ onClose, onConfirm }) => {
  return (
    <div className="delete-modal-overlay">
      <div className="delete-modal">
        <img 
          src={closeIcon} 
          alt="Close" 
          className="delete-modal__close-icon" 
          onClick={onClose} 
        />
        <h2>Delete Discussion</h2>
        <p>Are you sure you want to delete this discussion? This action cannot be undone.</p>
        <div className="delete-modal__actions">
          <button className="delete-modal__button delete-modal__button--cancel" onClick={onClose}>Cancel</button>
          <button className="delete-modal__button delete-modal__button--confirm" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ModalDeleteDiscussion;