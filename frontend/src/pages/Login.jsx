import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { FiMail, FiLock, FiAlertCircle } from 'react-icons/fi';
import './Register.css';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.email || !formData.password) {
            setError('Email and password are required');
            return;
        }

        setLoading(true);

        try {
            const response = await authAPI.login(formData);

            if (response.data.success) {
                login(response.data.user, response.data.token);
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container fade-in">
                <div className="auth-card">
                    <div className="auth-logo">
                        <img src="/fvion-logo.png" alt="Fvion" />
                    </div>
                    <div className="auth-header">
                        <h1>Welcome Back</h1>
                        <p>Sign in to continue to your tasks</p>
                    </div>

                    {error && (
                        <div className="error-banner">
                            <FiAlertCircle />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="input-group">
                            <label className="input-label">
                                <FiMail style={{ display: 'inline', marginRight: '8px' }} />
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="you@example.com"
                                disabled={loading}
                            />
                        </div>

                        <div className="input-group">
                            <label className="input-label">
                                <FiLock style={{ display: 'inline', marginRight: '8px' }} />
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="Enter your password"
                                disabled={loading}
                            />
                            <div style={{ textAlign: 'right', marginTop: 'var(--space-2)' }}>
                                <Link to="/forgot-password" className="auth-link" style={{ fontSize: '13px' }}>
                                    Forgot Password?
                                </Link>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                            {loading ? (
                                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                    <div className="spinner"></div>
                                    Signing In...
                                </span>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>
                            Don't have an account?{' '}
                            <Link to="/register" className="auth-link">
                                Create Account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
