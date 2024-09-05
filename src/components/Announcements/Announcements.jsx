import './Announcements.scss';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AnnouncementCard from '../AnnouncementCard/AnnouncementCard';
import ModalCreateAnnouncement from '../ModalCreateAnnouncement/ModalCreateAnnouncement';
import addPostIcon from '../../assets/icons/add-post.svg';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
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

      console.log('New announcement created', response.data)
      setAnnouncements((prevAnnouncements) => [...prevAnnouncements, response.data]);
      console.log('Updated announcements list:', newAnnouncement);
      setModalOpen(false); 
    } catch (error) {
      console.error('Error creating announcement:', error);
      setError('Failed to create announcement');
    }
  };

  return (
    <div className="announcements-container">
      {error && <p className="error-message">{error}</p>}
      {announcements.map((announcement) => (
        <AnnouncementCard key={announcement.id} announcement={announcement} />
      ))}

      {user && user.role_id === 1 && (  // Check if the user is logged in and is an admin
        <button className="floating-button" onClick={() => setModalOpen(true)}>
          <img src={addPostIcon} />
          Create Announcement
        </button>
      )}

      {isModalOpen && (
        <ModalCreateAnnouncement
          onClose={() => setModalOpen(false)}
          onSubmit={handleCreateAnnouncement}
        />
      )}
    </div>
  );
};

export default Announcements;