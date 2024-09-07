import React from "react";
import { useLocation, useNavigate } from 'react-router-dom'; // To detect the current path
import "./Header.scss";
import logo from "../../assets/logo/logo-1.png";
import notificationIcon from '../../assets/icons/notification.svg';
import menuIcon from '../../assets/icons/menu.svg';
import SidePanel from '../SidePanel/SidePanel';
import backIcon from '../../assets/icons/back-arrow.svg';

const Header = ({ isAuthenticated, firstName, onShowProfile, onLogout, isSidePanelOpen, setIsSidePanelOpen }) => {
  const location = useLocation(); // Hook to get the current location
  const navigate = useNavigate();

  const toggleSidePanel = () => {
    setIsSidePanelOpen(!isSidePanelOpen);
  };

  // Conditional rendering based on the current path
  const isProfilePage = location.pathname === '/profile';

  return (
    <header className={`header ${isAuthenticated ? 'header--authenticated' : 'header--unauthenticated'}`}>
      <div className="header__container">
        {isAuthenticated ? (
          <div className="header__sub-container">
            {isProfilePage ? (
              <div className="header__profile-page">
                <img src={backIcon} className="header__back-btn" onClick={() => navigate('/dashboard/announcements')} />
                <h2 className="header__profile-title">My Profile</h2>
                <div className="header__profile-subcontainer">
                  <div className="header__avatar-image"></div> 
                  <button className="header__edit-avatar-btn">
                    Edit Picture
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="header__profile-section-container">
                  <div className="header__avatar"></div>
                  <div className="header__icons-container">
                    <img src={notificationIcon} alt="Notifications" className="header__icon" />
                    <img
                      src={menuIcon}
                      alt="Menu"
                      className="header__icon"
                      onClick={toggleSidePanel}  // Toggle side panel on menu icon click
                    />
                  </div>
                </div>
                <div className="header__greeting-container">
                  <p className="header__greeting-message">Good Evening, {firstName}!</p>
                </div>
              </>
            )}
          </div>
        ) : (
          <img src={logo} className="header__logo" alt="Logo" />
        )}
      </div>

      {/* Side Panel */}
      <SidePanel
        isOpen={isSidePanelOpen}
        onClose={toggleSidePanel}
        firstName={firstName}
        onShowProfile={onShowProfile}  // Pass the function to navigate to profile
        onLogout={onLogout}  // Pass the logout handler
      />
    </header>
  );
};

export default Header;