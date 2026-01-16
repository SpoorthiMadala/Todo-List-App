import { useState } from 'react';
import { Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import { FiMail, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import './Register.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email) {
            setError('Email is required');
            return;
        }

        setLoading(true);

        try {
            const response = await authAPI.forgotPassword({ email });

            if (response.data.success) {
                setSuccess(true);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to send reset code. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="auth-page">
                <div className="auth-container fade-in">
                    <div className="auth-card" style={{ textAlign: 'center' }}>
                        <div className="success-icon">
                            <FiCheckCircle size={40} />
                        </div>
                        <h2>Check Your Email</h2>
                        <p style={{ marginBottom: 'var(--space-6)' }}>
                            We've sent a 6-digit reset code to <strong>{email}</strong>
                        </p>
                        <Link to={`/reset-password?email=${encodeURIComponent(email)}`} className="btn btn-primary btn-full">
                            Enter Reset Code
                        </Link>
                        <div className="auth-footer" style={{ marginTop: 'var(--space-4)' }}>
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
    }

    return (
        <div className="auth-page">
            <div className="auth-container fade-in">
                <div className="auth-card">
                    <div className="auth-logo">
                        <img src="/fvion-logo.png" alt="Fvion" />
                    </div>
                    <div className="auth-header">
                        <h1>Forgot Password?</h1>
                        <p>Enter your email to receive a password reset code</p>
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
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setError('');
                                }}
                                className="input-field"
                                placeholder="you@example.com"
                                disabled={loading}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                            {loading ? (
                                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                    <div className="spinner"></div>
                                    Sending...
                                </span>
                            ) : (
                                'Send Reset Code'
                            )}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>
                            Remember your password?{' '}
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

export default ForgotPassword;
