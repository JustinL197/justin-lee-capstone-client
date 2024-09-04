import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AnnouncementCard from '../AnnouncementCard/AnnouncementCard';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    fetchAnnouncements();
  }, []);

  return (
    <div className="announcements-container">
      {error && <p className="error-message">{error}</p>}
      {announcements.map((announcement) => (
        <AnnouncementCard key={announcement.id} announcement={announcement} />
      ))}
    </div>
  );
};

export default Announcements;