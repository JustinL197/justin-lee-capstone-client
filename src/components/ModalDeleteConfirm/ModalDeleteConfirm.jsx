// DeleteModal.jsx
import React from 'react';
import './ModalDeleteConfirm.scss';

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3 className="modal-title">Confirm Deletion</h3>
        <p>Are you sure you want to delete this comment?</p>
        <div className="modal-actions">
          <button className="modal-button modal-button--confirm" onClick={onConfirm}>Yes, Delete</button>
          <button className="modal-button modal-button--cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;