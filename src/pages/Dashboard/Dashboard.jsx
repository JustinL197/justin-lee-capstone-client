import './Dashboard.scss';

import {React} from 'react';
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom';
import Announcements from '../../components/Announcements/Announcements';
import Discussions from '../../components/Discussions/Discussions';

const Dashboard = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('firstName');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <div className="dashboard">
      {/* Tab Navigation */}
      <div className="dashboard__navbar">
        <NavLink 
          to="announcements" 
          className={({ isActive }) => `dashboard__links ${isActive ? 'active' : ''}`}
        >
          Announcements
        </NavLink>
        <NavLink 
          to="discussions" 
          className={({ isActive }) => `dashboard__links ${isActive ? 'active' : ''}`}
        >
          Discussions
        </NavLink>
      </div>

      {/* Routes for Tab Content */}
      <Routes>
        <Route path="announcements" element={<Announcements />} />
        <Route path="discussions" element={<Discussions />} />
      </Routes>
      
      {/* Logout Button */}
      <button onClick={handleLogout}>Logout</button>
  </div>
  );
};

export default Dashboard;