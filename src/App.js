import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import ProtectedRoute from './components/ProtectedRoutes/ProtectedRoutes';
import Dashboard from './pages/Dashboard/Dashboard';
import Discussions from './components/Discussions/Discussions';
import DiscussionDetail from './components/DiscussionDetail/DiscussionDetail';
import MyProfile from './components/MyProfile/MyProfile';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedFirstName = localStorage.getItem('firstName');
    if (token) {
      setIsAuthenticated(true);
      if (storedFirstName) {
        setFirstName(storedFirstName);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('firstName');
    setIsAuthenticated(false);
    setIsSidePanelOpen(false); // Close side panel upon logout
  };

  // Function to update the first name in the app after editing profile
  const handleProfileUpdate = (updatedFirstName) => {
    setFirstName(updatedFirstName);
    localStorage.setItem('firstName', updatedFirstName);
  };

  return (
    <Router>
      <Header
        isAuthenticated={isAuthenticated}
        firstName={firstName}
        onLogout={handleLogout}
        isSidePanelOpen={isSidePanelOpen}
        setIsSidePanelOpen={setIsSidePanelOpen} // Pass function to control side panel
      />
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard/announcements" replace />
            ) : (
              <Login setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard/announcements" replace />
            ) : (
              <Login setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />
        <Route path="/signup" element={<SignUp setIsAuthenticated={setIsAuthenticated} />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route
            path="/dashboard/*"
            element={<Dashboard setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route path="/discussions" element={<Discussions />} />
          <Route path="/discussions/:id" element={<DiscussionDetail />} />
          <Route
            path="/profile"
            element={<MyProfile user={{ firstName }} onProfileUpdate={handleProfileUpdate} />} // Pass the update handler to MyProfile
          />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;