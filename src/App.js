import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import your components
import Header from './components/Header/Header';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import ProtectedRoute from './components/ProtectedRoutes/ProtectedRoutes';
import Dashboard from './pages/Dashboard/Dashboard';
import Discussions from './components/Discussions/Discussions';
import DiscussionDetail from './components/DiscussionDetail/DiscussionDetail';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [firstName, setFirstName] = useState('');

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

  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} firstName={firstName} />
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

        {/* Use ProtectedRoute component */}
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/dashboard/*" element={<Dashboard setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/discussions" element={<Discussions />} />
          <Route path="/discussions/:id" element={<DiscussionDetail />} /> {/* Ensure protected discussion details */}
        </Route>
        
        {/* Fallback to login for unknown routes */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;