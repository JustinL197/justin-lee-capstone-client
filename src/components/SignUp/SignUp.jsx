import './SignUp.scss';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

function SignUp({ setIsAuthenticated }) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    username: '',
    role_id: ''
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
  
    setFormData({ 
      ...formData, 
      [name]: name === 'role_id' ? Number(value) : value 
    });

    if (errors[name]) {
      setErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };
        delete updatedErrors[name];
        return updatedErrors;
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5050/users/register', formData);
      console.log('User registered successfully:', response.data);
      setErrors({}); // Clear all errors on successful registration
      navigate('/login');
    } catch (error) {
      console.error('Error registering user:', error.response?.data);
  
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors); // Set all errors returned from the server
      } else {
        setErrors({ general: 'An unexpected error occurred. Please try again.' });
      }
    }
  };

  return (
    <div className="signup">
        <form onSubmit={handleSubmit} className="signup__form">
          <div className="signup__subcontainer">
          <label htmlFor="firstName" className="signup__label">First Name</label>
          <input type="text" name="first_name" onChange={handleChange} id="firstName" className={`signup__input signup__input--line ${errors.first_name ? 'error' : ''}`} required />
          {errors.first_name && <span className="error-message">{errors.first_name}</span>}

          <label htmlFor="lastName" className="signup__label">Last Name</label>
          <input type="text" name="last_name" onChange={handleChange} id="lastName" className={`signup__input signup__input--line ${errors.first_name ? 'error' : ''}`} required />
          {errors.last_name && <span className="error-message">{errors.last_name}</span>}

          <label htmlFor="email" className="signup__label">Email</label>
          <input type="email" name="email" onChange={handleChange} id="email" className={`signup__input signup__input--line ${errors.first_name ? 'error' : ''}`} required />
          {errors.email && <span className="error-message">{errors.email}</span>}

          <label htmlFor="username" className="signup__label">Username</label>
          <input type="text" name="username" onChange={handleChange} id="username" className={`signup__input signup__input--line ${errors.first_name ? 'error' : ''}`} required />
          {errors.username && <span className="error-message">{errors.username}</span>}

          <label htmlFor="password" className="signup__label">Password</label>
          <input type="password" name="password" onChange={handleChange} id="password" className={`signup__input signup__input--line ${errors.first_name ? 'error' : ''}`} required />
          {errors.password && <span className="error-message">{errors.password}</span>}

          <label className="signup__label">Role</label>
          <div className="signup__radio-group">
            <label>
              <input 
                type="radio" 
                name="role_id" 
                value={1} 
                checked={formData.role_id === 1} 
                onChange={handleChange} 
                className="signup__radio-input"
              />
              Faculty Member
            </label>
            <label>
              <input 
                type="radio" 
                name="role_id" 
                value={2} 
                checked={formData.role_id === 2} 
                onChange={handleChange} 
                className="signup__radio-input"
              />
              Student
            </label>
          </div>
          {errors.role_id && <span className="error-message">{errors.role_id}</span>}

          <button type="submit" className="signup__button">Sign Up</button>
          </div>
        </form>
    </div>
  );
}

export default SignUp;