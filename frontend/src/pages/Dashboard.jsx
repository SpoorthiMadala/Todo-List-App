import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { taskAPI, authAPI } from '../services/api';
import TaskCard from '../components/TaskCard';
import AddTaskModal from '../components/AddTaskModal';
import EditTaskModal from '../components/EditTaskModal';
import DeleteAccountModal from '../components/DeleteAccountModal';
import DeleteTaskModal from '../components/DeleteTaskModal';
import { FiPlus, FiLogOut, FiCheckCircle, FiTrash2 } from 'react-icons/fi';
import './Dashboard.css';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
    const [deletingTask, setDeletingTask] = useState(null);
    const [deleteTaskLoading, setDeleteTaskLoading] = useState(false);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await taskAPI.getTasks();
            setTasks(response.data.tasks);
        } catch (error) {
            console.error('Failed to fetch tasks:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleAddTask = async (taskData) => {
        try {
            const response = await taskAPI.createTask(taskData);
            if (response.data.success) {
                await fetchTasks();
                setShowAddModal(false);
            }
        } catch (error) {
            console.error('Failed to create task:', error);
            throw error;
        }
    };

    const handleUpdateTask = async (id, taskData) => {
        try {
            const response = await taskAPI.updateTask(id, taskData);
            if (response.data.success) {
                await fetchTasks();
                setEditingTask(null);
            }
        } catch (error) {
            console.error('Failed to update task:', error);
            throw error;
        }
    };

    const handleDeleteTask = async () => {
        setDeleteTaskLoading(true);
        try {
            const response = await taskAPI.deleteTask(deletingTask._id);
            if (response.data.success) {
                await fetchTasks();
                setDeletingTask(null);
            }
        } catch (error) {
            console.error('Failed to delete task:', error);
            alert('Failed to delete task. Please try again.');
        } finally {
            setDeleteTaskLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        try {
            const response = await authAPI.deleteAccount();
            if (response.data.success) {
                logout();
                navigate('/');
            }
        } catch (error) {
            console.error('Failed to delete account:', error);
            throw error;
        }
    };

    const handleToggleComplete = async (id) => {
        try {
            const response = await taskAPI.toggleComplete(id);
            if (response.data.success) {
                await fetchTasks();
            }
        } catch (error) {
            console.error('Failed to toggle task:', error);
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner" style={{ width: '40px', height: '40px' }}></div>
            </div>
        );
    }

    return (
        <div className="dashboard">

            <div className="dashboard-header">
                <div className="container">
                    <div className="header-content">
                        <div className="header-left">
                            <img src="/fvion-logo.png" alt="Fvion" className="dashboard-logo" />
                            <div className="header-text">
                                <h1>My Tasks</h1>
                                <p className="header-subtitle">Welcome back, {user?.email}</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
                            <button
                                onClick={() => setShowDeleteAccountModal(true)}
                                className="btn btn-danger"
                                style={{ padding: '8px 12px' }}
                                title="Delete Account"
                            >
                                <FiTrash2 />
                            </button>
                            <button onClick={handleLogout} className="btn btn-secondary">
                                <FiLogOut style={{ marginRight: '8px' }} />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="dashboard-content container">
                <div className="tasks-header">
                    <div className="tasks-stats">
                        <div className="stat-card glass-card">
                            <div className="stat-icon">
                                <FiCheckCircle />
                            </div>
                            <div>
                                <div className="stat-value">{tasks.filter(t => t.completed).length}</div>
                                <div className="stat-label">Completed</div>
                            </div>
                        </div>
                        <div className="stat-card glass-card">
                            <div className="stat-icon" style={{ background: 'linear-gradient(135deg, var(--accent-1), var(--accent-2))' }}>
                                <FiCheckCircle />
                            </div>
                            <div>
                                <div className="stat-value">{tasks.filter(t => !t.completed).length}</div>
                                <div className="stat-label">Pending</div>
                            </div>
                        </div>
                        <div className="stat-card glass-card">
                            <div className="stat-icon" style={{ background: 'linear-gradient(135deg, var(--primary-3), var(--primary-4))' }}>
                                <FiCheckCircle />
                            </div>
                            <div>
                                <div className="stat-value">{tasks.length}</div>
                                <div className="stat-label">Total Tasks</div>
                            </div>
                        </div>
                    </div>

                    <button onClick={() => setShowAddModal(true)} className="btn btn-primary add-task-btn">
                        <FiPlus size={20} style={{ marginRight: '8px' }} />
                        Add New Task
                    </button>
                </div>

                {tasks.length === 0 ? (
                    <div className="empty-state fade-in">
                        <div className="empty-icon">📝</div>
                        <h3>No tasks yet</h3>
                        <p>Create your first task to get started!</p>
                        <button onClick={() => setShowAddModal(true)} className="btn btn-primary">
                            <FiPlus style={{ marginRight: '8px' }} />
                            Create Task
                        </button>
                    </div>
                ) : (
                    <div className="tasks-grid">
                        {tasks.map((task, index) => (
                            <TaskCard
                                key={task._id}
                                task={task}
                                onToggleComplete={handleToggleComplete}
                                onEdit={setEditingTask}
                                onDelete={() => setDeletingTask(task)}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            />
                        ))}
                    </div>
                )}
            </div>

            {showAddModal && (
                <AddTaskModal
                    onClose={() => setShowAddModal(false)}
                    onSubmit={handleAddTask}
                />
            )}

            {editingTask && (
                <EditTaskModal
                    task={editingTask}
                    onClose={() => setEditingTask(null)}
                    onSubmit={handleUpdateTask}
                />
            )}

            {showDeleteAccountModal && (
                <DeleteAccountModal
                    onClose={() => setShowDeleteAccountModal(false)}
                    onConfirm={handleDeleteAccount}
                    userEmail={user?.email}
                />
            )}

            {deletingTask && (
                <DeleteTaskModal
                    task={deletingTask}
                    onClose={() => setDeletingTask(null)}
                    onConfirm={handleDeleteTask}
                    loading={deleteTaskLoading}
                />
            )}
        </div>
    );
};

export default Dashboard;
