import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import { FiLock, FiAlertCircle } from 'react-icons/fi';
import './Register.css';

const ResetPassword = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const email = searchParams.get('email');

    const [formData, setFormData] = useState({
        token: '',
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

        if (!formData.token || !formData.password || !formData.confirmPassword) {
            setError('All fields are required');
            return;
        }

        if (formData.token.length !== 6) {
            setError('Reset code must be 6 digits');
            return;
        }

        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }

        if (!/[A-Z]/.test(formData.password)) {
            setError('Password must contain at least one uppercase letter');
            return;
        }

        if (!/[a-z]/.test(formData.password)) {
            setError('Password must contain at least one lowercase letter');
            return;
        }

        if (!/\d/.test(formData.password)) {
            setError('Password must contain at least one digit');
            return;
        }

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
            const response = await authAPI.resetPassword({
                token: formData.token,
                password: formData.password
            });

            if (response.data.success) {
                alert('Password reset successful! You can now login with your new password.');
                navigate('/login');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to reset password. Please try again.');
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
                        <h1>Reset Password</h1>
                        <p>Enter the code sent to {email || 'your email'}</p>
                    </div>

                    {error && (
                        <div className="error-banner">
                            <FiAlertCircle />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="input-group">
                            <label className="input-label">Reset Code</label>
                            <input
                                type="text"
                                name="token"
                                value={formData.token}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="000000"
                                style={{
                                    fontSize: '1.5rem',
                                    letterSpacing: '0.5rem',
                                    textAlign: 'center',
                                    fontWeight: '600'
                                }}
                                maxLength={6}
                                disabled={loading}
                            />
                        </div>

                        <div className="input-group">
                            <label className="input-label">
                                <FiLock style={{ display: 'inline', marginRight: '8px' }} />
                                New Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="Enter new password"
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
                                placeholder="Re-enter new password"
                                disabled={loading}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                            {loading ? (
                                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                    <div className="spinner"></div>
                                    Resetting...
                                </span>
                            ) : (
                                'Reset Password'
                            )}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>
                            <Link to="/login" className="auth-link">
                                Back to Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
