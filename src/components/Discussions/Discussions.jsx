import './Discussions.scss';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DiscussionCard from '../DiscussionCard/DiscussionCard';
import addPostIcon from '../../assets/icons/add-post.svg';
import ModalCreateDiscussion from '../ModalCreateDiscussion/ModalCreateDiscussion';  // Import your modal component

const Discussions = () => {
  const [discussions, setDiscussions] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);  // State to manage modal open/close

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

    const fetchDiscussions = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5050/discussions', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDiscussions(response.data);
      } catch (error) {
        console.error('Error fetching discussions:', error);
        setError('Failed to fetch discussions');
      }
    };

    fetchUser();
    fetchDiscussions();
  }, []);

  const handleCreateDiscussion = async (newDiscussion) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5050/discussions', newDiscussion, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Add new discussion to the top of the list
      setDiscussions((prevDiscussions) => [response.data, ...prevDiscussions]); 
      setModalOpen(false);  // Close the modal after creation
    } catch (error) {
      console.error('Error creating discussion:', error);
      setError('Failed to create discussion');
    }
  };

  return (
    <div className="discussions-container">
      {error && <p className="error-message">{error}</p>}
      {discussions.map((discussion) => (
        <DiscussionCard 
          key={discussion.id} 
          discussion={discussion}
        />
      ))}

      
      <button className="floating-button" onClick={() => setModalOpen(true)}>
        <img src={addPostIcon} alt="add-post-icon" />
        Create Discussion
      </button>


      {/* Modal for creating new discussions */}
      {isModalOpen && (
        <ModalCreateDiscussion
          onClose={() => setModalOpen(false)}  // Close the modal
          onSubmit={handleCreateDiscussion}  // Handle form submission
        />
      )}
    </div>
  );
};

export default Discussions;