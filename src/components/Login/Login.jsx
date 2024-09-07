import './Login.scss';

import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LoginPage = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5050/users/signin', { username, password });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('firstName', response.data.user.first_name);
      localStorage.setItem('userId', response.data.user.id);
      setIsAuthenticated(true);

      // Force a page reload to fetch new user data
      window.location.reload();
    } catch (err) {
      setError(err.response.data.error || 'An error occurred during login.');
    }
  };

  return (
    <div className="login">
      {error && <p style={{ color: 'red', marginLeft: '32px' }}>{error}</p>}
      <form onSubmit={handleLogin} className="login__form">
        <div className="login__subcontainer">
          <label htmlFor="username" className="login__label">Username</label>
          <input
            type="text"
            id="username"
            className="login__input login__input--line"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password" className="login__label">Password</label>
          <input
            type="password"
            id="password"
            className="login__input login__input--line"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login__button">Sign In</button>
        </div>
        <div className="login__signup-container">
          <Link to="/signup" className="login__signup">Register for an account</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;