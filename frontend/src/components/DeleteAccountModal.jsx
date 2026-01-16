import { useState } from 'react';
import { FiX, FiAlertTriangle } from 'react-icons/fi';
import './TaskModal.css';

const DeleteAccountModal = ({ onClose, onConfirm, userEmail }) => {
    const [confirmEmail, setConfirmEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (confirmEmail !== userEmail) {
            setError('Email does not match. Please type your email correctly.');
            return;
        }

        setLoading(true);
        try {
            await onConfirm();
        } catch (err) {
            setError('Failed to delete account. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 style={{ color: 'var(--figma-red)' }}>
                        <FiAlertTriangle style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                        Delete Account
                    </h2>
                    <button onClick={onClose} className="modal-close-btn" disabled={loading}>
                        <FiX size={20} />
                    </button>
                </div>

                <div style={{ marginBottom: 'var(--space-6)' }}>
                    <p style={{ color: 'var(--text-primary)', fontWeight: '600', marginBottom: 'var(--space-3)' }}>
                        This action cannot be undone!
                    </p>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-2)' }}>
                        Deleting your account will permanently remove:
                    </p>
                    <ul style={{
                        color: 'var(--text-secondary)',
                        marginLeft: 'var(--space-6)',
                        marginBottom: 'var(--space-4)'
                    }}>
                        <li>Your account and profile</li>
                        <li>All your tasks and data</li>
                        <li>Your login credentials</li>
                    </ul>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        To confirm, please type your email address: <strong>{userEmail}</strong>
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="email"
                            value={confirmEmail}
                            onChange={(e) => {
                                setConfirmEmail(e.target.value);
                                setError('');
                            }}
                            className="input-field"
                            placeholder="Type your email to confirm"
                            disabled={loading}
                            autoFocus
                        />
                    </div>

                    {error && (
                        <div className="error-message" style={{ marginBottom: 'var(--space-4)' }}>
                            {error}
                        </div>
                    )}

                    <div className="modal-actions">
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn btn-secondary"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-danger"
                            disabled={loading || confirmEmail !== userEmail}
                        >
                            {loading ? (
                                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div className="spinner"></div>
                                    Deleting...
                                </span>
                            ) : (
                                'Delete Account'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DeleteAccountModal;
