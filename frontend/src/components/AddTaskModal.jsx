import { useState } from 'react';
import { FiX } from 'react-icons/fi';
import './TaskModal.css';

const AddTaskModal = ({ onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        deadline: ''
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

        if (!formData.title.trim()) {
            setError('Task title is required');
            return;
        }

        if (!formData.deadline) {
            setError('Deadline is required');
            return;
        }

        setLoading(true);

        try {
            await onSubmit(formData);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create task');
        } finally {
            setLoading(false);
        }
    };

    // Get today's date in YYYY-MM-DD format for min attribute
    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="text-gradient">Add New Task</h2>
                    <button onClick={onClose} className="modal-close-btn">
                        <FiX size={24} />
                    </button>
                </div>

                {error && (
                    <div className="error-banner">
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="task-form">
                    <div className="input-group">
                        <label className="input-label">Task Title *</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="Enter task title"
                            disabled={loading}
                            maxLength={100}
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="input-field textarea-field"
                            placeholder="Add task description (optional)"
                            rows={4}
                            disabled={loading}
                            maxLength={500}
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Deadline *</label>
                        <input
                            type="date"
                            name="deadline"
                            value={formData.deadline}
                            onChange={handleChange}
                            className="input-field"
                            min={today}
                            disabled={loading}
                        />
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
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? (
                                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div className="spinner"></div>
                                    Creating...
                                </span>
                            ) : (
                                'Create Task'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTaskModal;
