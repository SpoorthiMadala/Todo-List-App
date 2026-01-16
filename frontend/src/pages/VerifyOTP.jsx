import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { FiCheck, FiAlertCircle } from 'react-icons/fi';
import './Register.css';

const VerifyOTP = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
    const email = location.state?.email;

    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (!email) {
            navigate('/register');
        }
    }, [email, navigate]);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!otp || otp.length !== 6) {
            setError('Please enter a valid 6-digit OTP');
            return;
        }

        setLoading(true);

        try {
            const response = await authAPI.verifyOTP({ email, otp });

            if (response.data.success) {
                setSuccess(true);
                login(response.data.user, response.data.token);

                // Delay navigation for success animation
                setTimeout(() => {
                    navigate('/dashboard');
                }, 1500);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleResendOTP = async () => {
        if (countdown > 0) return;

        setResending(true);
        setError('');

        try {
            const response = await authAPI.resendOTP({ email });

            if (response.data.success) {
                setCountdown(60);
                setOtp('');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to resend OTP');
        } finally {
            setResending(false);
        }
    };

    if (success) {
        return (
            <div className="auth-page">
                <div className="auth-container fade-in">
                    <div className="auth-card" style={{ textAlign: 'center' }}>
                        <div className="success-icon">
                            <FiCheck size={40} />
                        </div>
                        <h2>Verification Successful!</h2>
                        <p>Redirecting to your dashboard...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-page">
            <div className="auth-container fade-in">
                <div className="auth-card">
                    <div className="auth-header">
                        <h1>Verify Your Email</h1>
                        <p>We've sent a 6-digit code to</p>
                        <p style={{ color: 'var(--figma-purple)', fontWeight: '600' }}>{email}</p>
                    </div>

                    {error && (
                        <div className="error-banner">
                            <FiAlertCircle />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="input-group">
                            <label className="input-label">Enter OTP</label>
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                                    setOtp(value);
                                    setError('');
                                }}
                                className="input-field"
                                placeholder="000000"
                                style={{
                                    fontSize: '1.5rem',
                                    letterSpacing: '0.5rem',
                                    textAlign: 'center',
                                    fontWeight: '600'
                                }}
                                disabled={loading}
                                maxLength={6}
                                autoFocus
                            />
                            <p style={{
                                fontSize: '0.875rem',
                                color: 'var(--text-muted)',
                                marginTop: 'var(--space-xs)'
                            }}>
                                Enter the 6-digit code from your email
                            </p>
                        </div>

                        <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                            {loading ? (
                                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                    <div className="spinner"></div>
                                    Verifying...
                                </span>
                            ) : (
                                'Verify Email'
                            )}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>
                            Didn't receive the code?{' '}
                            <button
                                onClick={handleResendOTP}
                                disabled={countdown > 0 || resending}
                                className="auth-link"
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: countdown > 0 ? 'not-allowed' : 'pointer',
                                    opacity: countdown > 0 ? 0.5 : 1
                                }}
                            >
                                {resending ? 'Sending...' : countdown > 0 ? `Resend in ${countdown}s` : 'Resend OTP'}
                            </button>
                        </p>
                        <p style={{ marginTop: 'var(--space-sm)' }}>
                            <Link to="/register" className="auth-link">
                                Change Email
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyOTP;
