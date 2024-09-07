import React, { useState, useEffect } from 'react';
import './MyProfile.scss';
import editIcon from '../../assets/icons/edit.svg';
import chevronRight from '../../assets/icons/chevron-right.svg';
import axios from 'axios';

const MyProfile = ({ onProfileUpdate }) => {
  const [isEditing, setIsEditing] = useState({
    username: false,
    password: false,
    name: false,
    email: false,
  });

  const [profileInfo, setProfileInfo] = useState({
    username: '',
    password: '********',
    name: '',
    email: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5050/users/current', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const user = response.data;
        setProfileInfo({
          username: user.username,
          password: '********',
          name: `${user.first_name} ${user.last_name}`,
          email: user.email,
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const toggleEdit = (field) => {
    setIsEditing({ ...isEditing, [field]: !isEditing[field] });
  };

  const handleChange = (e, field) => {
    setProfileInfo({ ...profileInfo, [field]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        'http://localhost:5050/users/current/update',
        {
          first_name: profileInfo.name.split(' ')[0],
          last_name: profileInfo.name.split(' ')[1],
          username: profileInfo.username,
          email: profileInfo.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onProfileUpdate(profileInfo.name.split(' ')[0]);
      setIsEditing({
        username: false,
        password: false,
        name: false,
        email: false,
      });
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="my-profile">
      <div className="my-profile__info-section">
        <h2 className="my-profile__header">Personal Information</h2>
        <div className="my-profile__field">
            <div className="my-profile__label-edit-container">
                <label className="my-profile__label">Username:</label>
                <img
                    src={editIcon}
                    alt="Edit"
                    className="my-profile__edit-icon"
                    onClick={() => toggleEdit('username')}
                />
            </div>
          {isEditing.username ? (
            <input
              type="text"
              value={profileInfo.username}
              onChange={(e) => handleChange(e, 'username')}
              className="my-profile__input"
            />
          ) : (
            <span className="my-profile__input-line">{profileInfo.username}</span>
          )}
        </div>

        <div className="my-profile__field">
            <div className="my-profile__label-edit-container">
                <label className="my-profile__label">Password:</label>
                <img
                    src={editIcon}
                    alt="Edit"
                    className="my-profile__edit-icon"
                    onClick={() => toggleEdit('password')}
                />
            </div>
          <span className="my-profile__input-line">{profileInfo.password}</span>
        </div>

        <div className="my-profile__field">
            <div className="my-profile__label-edit-container">
                <label className="my-profile__label">Name:</label>
                <img
                    src={editIcon}
                    alt="Edit"
                    className="my-profile__edit-icon"
                    onClick={() => toggleEdit('name')}
                />
            </div>
          {isEditing.name ? (
            <input
                type="text"
                value={profileInfo.name}
                onChange={(e) => handleChange(e, 'name')}
                className="my-profile__input"
            />
          ) : (
            <span className="my-profile__input-line">{profileInfo.name}</span>
          )}
        </div>
      </div>

      <button onClick={handleSubmit} className="my-profile__save-btn">
        Save Changes
      </button>

      {/*Nice to have:*/}
      <div className="my-group">
        <h2 className="my-group__header">My Groups</h2>
        <div className="my-group__container">
            <div className="my-group__left-container">
                <div className="my-group__avatar"></div>
                <div className="my-group__group-name-subcontainer">
                    <h3 className="my-group__group-name">Coding 2024</h3>
                    <p className="my-group__timestamp">Member since 2024</p>
                </div>
            </div>
            <img src={chevronRight} alt="chevron-right" />
        </div>
        <div className="my-group__container">
            <div className="my-group__left-container">
                <div className="my-group__avatar my-group__avatar--orange"></div>
                <div className="my-group__group-name-subcontainer">
                    <h3 className="my-group__group-name">MAT365</h3>
                    <p className="my-group__timestamp">Member since 2021</p>
                </div>
            </div>
            <img src={chevronRight} alt="chevron-right" />
        </div>
        <div className="my-group__container">
            <div className="my-group__left-container">
                <div className="my-group__avatar my-group__avatar--green"></div>
                <div className="my-group__group-name-subcontainer">
                    <h3 className="my-group__group-name">Basketball 2024</h3>
                    <p className="my-group__timestamp">Member since 2021</p>
                </div>
            </div>
            <img src={chevronRight} alt="chevron-right" />
        </div>
        <div className="my-group__container">
            <div className="my-group__left-container">
                <div className="my-group__avatar my-group__avatar--grey"></div>
                <div className="my-group__group-name-subcontainer">
                    <h3 className="my-group__group-name">Baking 2024</h3>
                    <p className="my-group__timestamp">Member since 2022</p>
                </div>
            </div>
            <img src={chevronRight} alt="chevron-right" />
        </div>
      </div>
      <button className="my-group__button">Look for more groups</button>
    </div>
  );
};

export default MyProfile;