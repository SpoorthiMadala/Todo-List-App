import { FiX, FiAlertCircle } from 'react-icons/fi';
import './TaskModal.css';

const DeleteTaskModal = ({ task, onClose, onConfirm, loading }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>
                        <FiAlertCircle style={{ marginRight: '8px', verticalAlign: 'middle', color: 'var(--figma-red)' }} />
                        Delete Task
                    </h2>
                    <button onClick={onClose} className="modal-close-btn" disabled={loading}>
                        <FiX size={20} />
                    </button>
                </div>

                <div style={{ marginBottom: 'var(--space-6)' }}>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
                        Are you sure you want to delete this task?
                    </p>
                    <div style={{
                        background: 'var(--bg-secondary)',
                        padding: 'var(--space-4)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-light)'
                    }}>
                        <p style={{
                            color: 'var(--text-primary)',
                            fontWeight: '600',
                            marginBottom: '0'
                        }}>
                            {task.title}
                        </p>
                        {task.description && (
                            <p style={{
                                color: 'var(--text-tertiary)',
                                fontSize: '13px',
                                marginTop: 'var(--space-2)',
                                marginBottom: '0'
                            }}>
                                {task.description}
                            </p>
                        )}
                    </div>
                    <p style={{
                        color: 'var(--text-tertiary)',
                        fontSize: '13px',
                        marginTop: 'var(--space-4)',
                        marginBottom: '0'
                    }}>
                        This action cannot be undone.
                    </p>
                </div>

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
                        type="button"
                        onClick={onConfirm}
                        className="btn btn-danger"
                        disabled={loading}
                    >
                        {loading ? (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div className="spinner"></div>
                                Deleting...
                            </span>
                        ) : (
                            'Delete Task'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteTaskModal;
