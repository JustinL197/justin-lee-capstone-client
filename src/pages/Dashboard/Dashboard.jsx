import './Dashboard.scss';
import React, { useState } from 'react';
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom';
import Announcements from '../../components/Announcements/Announcements';
import Discussions from '../../components/Discussions/Discussions';
import MyProfile from '../../components/MyProfile/MyProfile';

const Dashboard = ({ setIsAuthenticated, user }) => {
  const [showProfile, setShowProfile] = useState(false);  // Add state to control the visibility of MyProfile

  const handleHideProfile = () => {
    setShowProfile(false);  // Hide profile (could be used for a "back" button in MyProfile)
  };

  return (
    <div className="dashboard">
      {/* Tab Navigation (except for My Profile) */}
      <div className="dashboard__navbar">
        <NavLink 
          to="/dashboard/announcements" 
          className={({ isActive }) => `dashboard__links ${isActive ? 'active' : ''}`}
        >
          Announcements
        </NavLink>
        <NavLink 
          to="/dashboard/discussions" 
          className={({ isActive }) => `dashboard__links ${isActive ? 'active' : ''}`}
        >
          Discussions
        </NavLink>
      </div>

      {/* Conditionally Render MyProfile or Regular Dashboard Content */}
      {showProfile ? (
        <MyProfile user={user} onClose={handleHideProfile} />  
      ) : (
        <Routes>
          <Route path="announcements" element={<Announcements />} />
          <Route path="discussions" element={<Discussions />} />
        </Routes>
      )}
    </div>
  );
};

export default Dashboard;