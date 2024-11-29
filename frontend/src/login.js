import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext'; 
import { useNavigate, Link } from 'react-router-dom';
import './Styles/Login.css';

function Login() {
    const { login } = useAuth(); 
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        identifier: '',
        password: ''
    });

    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [isCapsLockActive, setIsCapsLockActive] = useState(false);

    
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
    const handleKeyUp = (event) => {
        if (event.getModifierState('CapsLock')) {
            setIsCapsLockActive(true);
        } else {
            setIsCapsLockActive(false);
        }
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

            login(response.data.token);
            setSuccessMessage('Login successful!');
            navigate('/home'); 
        } catch (error) {
            console.error('Login error', error.response || error);
            setError(error.response?.data?.error || 'Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="container">
                <form onSubmit={handleSubmit}>
                    {error && <p className="error-message">{error}</p>}
                    {successMessage && <p className="success-message">{successMessage}</p>}

                    <div className="form-group">
                        <input 
                            type="text"
                            name="identifier"
                            value={formData.identifier}
                            onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                            onKeyUp={handleKeyUp}
                            placeholder="Email or phone number"
                            autoComplete="off" 
                            disabled={isLoading}
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            onKeyUp={handleKeyUp}
                            placeholder="Password"
                            autoComplete="off" 
                            disabled={isLoading}
                        />
                    </div>

                    {isCapsLockActive && (
                        <p className="caps-warning"> Caps Lock is ON</p>
                    )}

                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Log In'}
                    </button>
                    
                    <Link to="/forgot-password" className="forgot-password">
                        Forgot password?
                    </Link>

                    <Link to="/register">
                        <button type="button" className="create-account" disabled={isLoading}>
                            Create new account
                        </button>
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Login;

