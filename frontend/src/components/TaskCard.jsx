import { format, isPast, isToday } from 'date-fns';
import { FiEdit2, FiTrash2, FiCalendar, FiClock } from 'react-icons/fi';
import './TaskCard.css';

const TaskCard = ({ task, onToggleComplete, onEdit, onDelete, style }) => {
    const deadlineDate = new Date(task.deadline);
    const isOverdue = isPast(deadlineDate) && !task.completed;
    const isDueToday = isToday(deadlineDate);

    const getDeadlineColor = () => {
        if (task.completed) return 'var(--success)';
        if (isOverdue) return 'var(--error)';
        if (isDueToday) return 'var(--warning)';
        return 'var(--info)';
    };

    const getDeadlineLabel = () => {
        if (isOverdue && !task.completed) return 'Overdue';
        if (isDueToday) return 'Due Today';
        return 'Upcoming';
    };

    return (
        <div className={`task-card glass-card fade-in ${task.completed ? 'completed' : ''}`} style={style}>
            <div className="task-header">
                <div className="task-checkbox-wrapper">
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => onToggleComplete(task._id)}
                        className="task-checkbox"
                        id={`task-${task._id}`}
                    />
                    <label htmlFor={`task-${task._id}`} className="checkbox-label">
                        <span className="checkbox-custom"></span>
                    </label>
                </div>
                <div className="task-actions">
                    <button
                        onClick={() => onEdit(task)}
                        className="task-action-btn"
                        title="Edit task"
                    >
                        <FiEdit2 />
                    </button>
                    <button
                        onClick={() => onDelete(task._id)}
                        className="task-action-btn delete-btn"
                        title="Delete task"
                    >
                        <FiTrash2 />
                    </button>
                </div>
            </div>

            <div className="task-content">
                <h3 className={`task-title ${task.completed ? 'completed-text' : ''}`}>
                    {task.title}
                </h3>
                {task.description && (
                    <p className="task-description">{task.description}</p>
                )}
            </div>

            <div className="task-footer">
                <div className="task-deadline" style={{ borderColor: getDeadlineColor() }}>
                    <FiCalendar style={{ color: getDeadlineColor() }} />
                    <span>{format(deadlineDate, 'MMM dd, yyyy')}</span>
                </div>
                <div className="task-status" style={{ background: getDeadlineColor() }}>
                    <FiClock size={12} />
                    {getDeadlineLabel()}
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
