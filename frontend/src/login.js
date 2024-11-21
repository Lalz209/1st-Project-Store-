import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    const [formData, setFormData] = useState({
        identifier: '', // email or user
        password: ''
    });

    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // send login request to server
            const response = await axios.post('http://localhost:5000/api/login', {
                username: formData.identifier.includes('@') ? '' : formData.identifier,
                email: formData.identifier.includes('@') ? formData.identifier : '',
                password: formData.password
            });

            setSuccessMessage(response.data.message);
            setError('');
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            console.error('Login error', error.response || error)
            setError(error.response?.data?.error || 'Login failed') 
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <p style={{color: 'red'}}>{error}</p>}
            {successMessage && <p style={{color: 'green'}}>{successMessage}</p>}

            <input 
            type='text'
            value={formData.identifier}
            onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
            placeholder="Username or Email"
            />

            <input
            type='password'
            onChange={(e) => setFormData({ ...formData, password: e.target.value})}
            placeholder="Password"
            />

            <button type='submit'>Login</button>
        </form>
    );
}

export default Login;