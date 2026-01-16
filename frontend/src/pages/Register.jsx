import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import { FiMail, FiLock, FiAlertCircle } from 'react-icons/fi';
import './Register.css';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
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

        // Validation
        if (!formData.email || !formData.password || !formData.confirmPassword) {
            setError('All fields are required');
            return;
        }

        // Enhanced password validation
        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }

        // Check for uppercase letter
        if (!/[A-Z]/.test(formData.password)) {
            setError('Password must contain at least one uppercase letter');
            return;
        }

        // Check for lowercase letter
        if (!/[a-z]/.test(formData.password)) {
            setError('Password must contain at least one lowercase letter');
            return;
        }

        // Check for digit
        if (!/\d/.test(formData.password)) {
            setError('Password must contain at least one digit');
            return;
        }

        // Check for special character
        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password)) {
            setError('Password must contain at least one special character');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);

        try {
            const response = await authAPI.register({
                email: formData.email,
                password: formData.password
            });

            if (response.data.success) {
                // Navigate to OTP verification with email
                navigate('/verify-otp', { state: { email: formData.email } });
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
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
                        <h1>Create Account</h1>
                        <p>Start organizing your tasks today</p>
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
                                placeholder="Enter strong password"
                                disabled={loading}
                            />
                            <p style={{
                                fontSize: '12px',
                                color: 'var(--text-tertiary)',
                                marginTop: 'var(--space-2)',
                                marginBottom: 0
                            }}>
                                Min 8 characters, 1 uppercase, 1 lowercase, 1 digit, 1 special character
                            </p>
                        </div>

                        <div className="input-group">
                            <label className="input-label">
                                <FiLock style={{ display: 'inline', marginRight: '8px' }} />
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="Re-enter your password"
                                disabled={loading}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                            {loading ? (
                                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                    <div className="spinner"></div>
                                    Creating Account...
                                </span>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>
                            Already have an account?{' '}
                            <Link to="/login" className="auth-link">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
