import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Styles/Login.css'

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        identifier: '', // email or user
        password: ''
    });

    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = () => {
        if (!formData.identifier.trim()) {
            setError('Username or email is required');
            return false;
        }
        if (!formData.password) {
            setError('Password is required');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        
        if (!validateForm()) return;
    
        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/auth/api/login', {
                identifier: formData.identifier,
                password: formData.password
            });
    
            setSuccessMessage('Login successful!');
            localStorage.setItem('token', response.data.token);
            setTimeout(() => {
                navigate('/game');
            }, 1000);
        } catch (error) {
            console.error('Login error', error.response || error);
            setError(error.response?.data?.error || 'Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                {error && <p className="error-message">{error}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}

                <div className="form-group">
                    <p>Username, or email</p>
                    <input 
                        type="text"
                        value={formData.identifier}
                        onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                        placeholder="Username or Email"
                        disabled={isLoading}
                    />
                </div>

                <div className="form-group">
                    <p>Password</p>
                    <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="Password"
                        disabled={isLoading}
                    />
                </div>

                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
}

export default Login;