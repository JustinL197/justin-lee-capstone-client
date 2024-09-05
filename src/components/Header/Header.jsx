import "./Header.scss";
import React from "react";
import logo from "../../assets/logo/logo-1.png";
import notificationIcon from '../../assets/icons/notification.svg';
import menuIcon from '../../assets/icons/menu.svg';
import { useState } from "react";

const getTimeOfDayGreeting = () => {
  const currentHour = new Date().getHours();
  if (currentHour < 12) {
    return "Good Morning,";
  } else if (currentHour < 18) {
    return "Good Afternoon,";
  } else {
    return "Good Evening,";
  }
};

function Header({ isAuthenticated, firstName }) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleSettingsPanel = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };
  return (
    <header className={`header ${isAuthenticated ? 'header--authenticated' : 'header--unauthenticated'}`}>
      <div className="header__container">
        {isAuthenticated ? (
          <div className="header__sub-container">
            <div className="header__profile-section-container">
              <div className="header__avatar"></div>
              <div className="header__icons-container">
                <img src={notificationIcon} alt="Notifications" className="header__icon" />
                <img
                  src={menuIcon}
                  alt="Settings"
                  className="header__icon"
                  onClick={toggleSettingsPanel}
                />
              </div>
            </div>
            <div className="header__greeting-container">
              <p className="header__greeting-message">{getTimeOfDayGreeting()}</p>
              <p className="header__greeting-message">{firstName}!</p>
            </div>
          </div>
        ) : (
          <img src={logo} className="header__logo" alt="Logo" />
        )}
      </div>
    </header>
  );
}

export default Header;