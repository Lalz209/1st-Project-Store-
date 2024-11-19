import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password: '',  
  });

  const [error, setError] = useState('');  // State to handle errors
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/register', formData);
      setSuccessMessage(response.data.message);
      setError('');  // Clear any previous error
    } catch (error) {
      console.error('Registration error:', error.response || error);
      setError(error.response?.data?.error || 'Registration failed');
    }
  };

  return ( 
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
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
    </form>
  );
}

export default Register;
