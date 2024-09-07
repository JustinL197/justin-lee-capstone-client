import './Announcements.scss';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AnnouncementCard from '../AnnouncementCard/AnnouncementCard';
import ModalCreateAnnouncement from '../ModalCreateAnnouncement/ModalCreateAnnouncement';
import ModalViewAnnouncement from '../ModalViewAnnouncement/ModalViewAnnouncement';
import ModalEditAnnouncement from '../ModalEditAnnouncement/ModalEditAnnouncement';
import addPostIcon from '../../assets/icons/add-post.svg';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false); // State for create announcement modal
  const [isViewModalOpen, setViewModalOpen] = useState(false); // State for view announcement modal
  const [isEditModalOpen, setEditModalOpen] = useState(false); // State for edit announcement modal
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null); // State to manage which announcement is selected
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5050/users/current', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchAnnouncements = async () => {
      try {
        const token = localStorage.getItem('token');
        
        const response = await axios.get('http://localhost:5050/announcements', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAnnouncements(response.data);
      } catch (error) {
        console.error('Error fetching announcements:', error);
        setError('Failed to fetch announcements');
      }
    };

    fetchUser();
    fetchAnnouncements();
  }, []);

  const handleCreateAnnouncement = async (newAnnouncement) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5050/announcements', newAnnouncement, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('New announcement created', response.data);
      setAnnouncements((prevAnnouncements) => [...prevAnnouncements, response.data]);
      setModalOpen(false); 
    } catch (error) {
      console.error('Error creating announcement:', error);
      setError('Failed to create announcement');
    }
  };

  const handleCardClick = (announcement) => {
    setSelectedAnnouncement(announcement);
    setViewModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setViewModalOpen(false);
    setEditModalOpen(false);
    setSelectedAnnouncement(null);
  };

  const handleDeleteAnnouncement = async (announcementId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5050/announcements/${announcementId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAnnouncements((prevAnnouncements) => 
        prevAnnouncements.filter((announcement) => announcement.id !== announcementId)
      );
      handleCloseModal();
    } catch (error) {
      console.error('Error deleting announcement:', error);
      setError('Failed to delete announcement');
    }
  };

  const handleEditAnnouncement = async (updatedAnnouncement) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:5050/announcements/${updatedAnnouncement.id}`,
        updatedAnnouncement,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedData = response.data;

      // Update the announcements state with the updated announcement
      setAnnouncements((prevAnnouncements) =>
        prevAnnouncements.map((announcement) =>
          announcement.id === updatedData.id ? updatedData : announcement
        )
      );

      // Update the selectedAnnouncement with the updated data
      setSelectedAnnouncement(updatedData);

      setEditModalOpen(false); // Close edit modal after saving
      setViewModalOpen(true); // Reopen view modal
    } catch (error) {
      console.error('Error updating announcement:', error);
      setError('Failed to update announcement');
    }
  };
  
  return (
    <div className="announcements-container">
      {error && <p className="error-message">{error}</p>}
      {announcements.map((announcement) => (
        <AnnouncementCard 
          key={announcement.id} 
          announcement={announcement} 
          onClick={() => handleCardClick(announcement)} // Add click handler
        />
      ))}

      {user && user.role_id === 1 && (  // Check if the user is logged in and is an admin
        <button className="floating-button" onClick={() => setModalOpen(true)}>
          <img src={addPostIcon} alt="add-post-icon"/>
          Create Announcement
        </button>
      )}

      {isModalOpen && (
        <ModalCreateAnnouncement
          onClose={handleCloseModal}
          onSubmit={handleCreateAnnouncement}
        />
      )}

      {isViewModalOpen && selectedAnnouncement && (
        <ModalViewAnnouncement
          announcement={selectedAnnouncement}
          userId={user.id}
          onClose={handleCloseModal}
          onDelete={handleDeleteAnnouncement}
          onEdit={() => {
            setEditModalOpen(true); // Open edit modal
            setViewModalOpen(false); // Close view modal
          }}
        />
      )}

      {isEditModalOpen && selectedAnnouncement && (
        <ModalEditAnnouncement
          announcement={selectedAnnouncement}
          onClose={() => {
            setEditModalOpen(false); // Close edit modal
            setViewModalOpen(true); // Reopen view modal
          }}
          onSubmit={handleEditAnnouncement}
        />
      )}
    </div>
  );
};

export default Announcements;