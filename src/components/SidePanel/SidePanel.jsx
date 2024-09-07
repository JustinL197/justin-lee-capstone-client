import React from 'react';
import './SidePanel.scss';
import '../MyProfile/MyProfile.scss';
import settingsIcon from '../../assets/icons/settings.svg';
import backIcon from '../../assets/icons/back-arrow.svg';
import chevronRight from '../../assets/icons/chevron-right.svg';
import { useNavigate } from 'react-router-dom';

function SidePanel({ isOpen, onClose, firstName, onLogout }) {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    onClose(); // Close the side panel
    navigate('/profile'); // Navigate to the profile page
  };

  return (
    <div className={`side-panel ${isOpen ? 'side-panel--open' : ''}`}>
      <div className="side-panel__header">
        <img src={backIcon} alt="Back" className="side-panel__back-icon" onClick={onClose} />
        <h3>{firstName}</h3>
        <img src={settingsIcon} alt="Settings" className="side-panel__settings-icon" onClick={handleProfileClick} />
      </div>
      <div className="my-group my-group--sidepanel">
        <h2 className="my-group__header my-group__header--sidepanel">My Groups</h2>
        <div className="my-group__container">
            <div className="my-group__left-container">
                <div className="my-group__avatar"></div>
                <div className="my-group__group-name-subcontainer">
                    <h3 className="my-group__group-name my-group__group-name--sidepanel">Coding 2024</h3>
                    <p className="my-group__timestamp my-group__timestamp--sidepanel">Member since 2024</p>
                </div>
            </div>
            <img src={chevronRight} alt="chevron-right" />
        </div>
        <div className="my-group__container">
            <div className="my-group__left-container">
                <div className="my-group__avatar my-group__avatar--orange"></div>
                <div className="my-group__group-name-subcontainer">
                    <h3 className="my-group__group-name my-group__group-name--sidepanel">MAT365</h3>
                    <p className="my-group__timestamp my-group__timestamp--sidepanel">Member since 2021</p>
                </div>
            </div>
            <img src={chevronRight} alt="chevron-right" />
        </div>
        <div className="my-group__container">
            <div className="my-group__left-container">
                <div className="my-group__avatar my-group__avatar--green"></div>
                <div className="my-group__group-name-subcontainer">
                    <h3 className="my-group__group-name my-group__group-name--sidepanel">Basketball 2024</h3>
                    <p className="my-group__timestamp my-group__timestamp--sidepanel">Member since 2021</p>
                </div>
            </div>
            <img src={chevronRight} alt="chevron-right" />
        </div>
        <div className="my-group__container">
            <div className="my-group__left-container">
                <div className="my-group__avatar my-group__avatar--grey"></div>
                <div className="my-group__group-name-subcontainer">
                    <h3 className="my-group__group-name my-group__group-name--sidepanel">Baking 2024</h3>
                    <p className="my-group__timestamp my-group__timestamp--sidepanel">Member since 2022</p>
                </div>
            </div>
            <img src={chevronRight} alt="chevron-right" />
        </div>
      </div>
      <button className="my-group__button my-group__button--sidepanel">Look for more groups</button>
      <button className="side-panel__logout-btn" onClick={onLogout}>Logout</button>
    </div>
  );
}

export default SidePanel;