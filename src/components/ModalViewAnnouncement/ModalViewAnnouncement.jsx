// AnnouncementModalComponent.js
import './ModalViewAnnouncement.scss';
import closeIcon from '../../assets/icons/close.svg';
import editIcon from '../../assets/icons/edit.svg';
import deleteIcon from '../../assets/icons/delete.svg';
import React from 'react';

function ModalViewAnnouncement({ announcement, userId, onClose, onDelete, onEdit }) {
  const isCreator = announcement.user_id === userId;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <img src={closeIcon} onClick={() => onClose()} alt="close-icon"/>
        <div className="modal-header">
            <h2 className="modal__title">{announcement.title}</h2>
        </div>
        <p className="modal__content">{announcement.message}</p>
        <div className="subcontainer">
            <p><strong>Posted on:</strong> {new Date(announcement.created_at).toLocaleDateString()}</p>
            {isCreator && (
                <div className="modal__actions">
                    <img src={editIcon} alt="edit icon" onClick={() => onEdit(announcement)} />
                    <img src={deleteIcon} alt="delete icon" onClick={() => onDelete(announcement.id)} />
                </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default ModalViewAnnouncement;