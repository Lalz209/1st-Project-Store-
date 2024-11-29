import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password: '',  
  });

  const [error, setError] = useState('');  
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/api/register', formData);
      setSuccessMessage(response.data.message);
      setError('');  
    } catch (error) {
      console.error('Registration error:', error.response || error);
      setError(error.response?.data?.error || 'Registration failed');
    }
  };

  return ( 
    <div className='login-container'>
      <div className='container'>
          <form onSubmit={handleSubmit}>
            {error && <p className='error-message'>{error}</p>}
            {successMessage && <p className='success-message'>{successMessage}</p>}
            <div className='form-group'>
            
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              placeholder="Username"
            />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Email"
            />
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Password"
            />
            <input
              type="password"
              value={formData.confirm_password}
              onChange={(e) => setFormData({ ...formData, confirm_password: e.target.value })}
              placeholder="Confirm Password"
            />
            <button type="submit">Register</button>

            <p>already have an account?</p>
            <Link to="/register">
                        <button type="button" className="create-account">
                            Log in
                        </button>
            </Link>

            </div>
          </form>    
      </div>
      </div>
  );
}

export default Register;
