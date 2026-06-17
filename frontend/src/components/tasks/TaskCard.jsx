import { useState } from 'react';
import {
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineExclamationTriangle,
} from 'react-icons/hi2';
import Badge from '../common/Badge';
import { formatDate, isOverdue, truncateText } from '../../utils/helpers';
import { useTask } from '../../context/TaskContext';
import toast from 'react-hot-toast';

const TaskCard = ({ task, onEdit }) => {
  const { deleteTask, toggleTaskStatus } = useTask();
  const [isUpdating, setIsUpdating] = useState(false);
  const overdue = isOverdue(task.dueDate) && task.status !== 'Done';

  const handleDelete = async () => {
    if (isUpdating) return;
    if (window.confirm('Are you sure you want to delete this task?')) {
      setIsUpdating(true);
      try {
        await deleteTask(task._id || task.id);
        toast.success('Task deleted successfully.', { id: 'task-action' });
      } catch (err) {
        toast.error(err.message || 'Failed to delete task.', { id: 'task-error' });
      } finally {
        setIsUpdating(false);
      }
    }
  };

  const handleToggle = async () => {
    if (isUpdating) return;
    setIsUpdating(true);
    try {
      await toggleTaskStatus(task._id || task.id, task.status);
      const newStatus = task.status === 'Done' ? 'Todo' : 'Done';
      toast.success(`Task marked as ${newStatus}.`, { id: 'task-action' });
    } catch (err) {
      toast.error(err.message || 'Failed to update task status.', { id: 'task-error' });
    } finally {
      setIsUpdating(false);
    }
  };

  const priorityVariant =
    task.priority === 'High'
      ? 'danger'
      : task.priority === 'Medium'
      ? 'warning'
      : 'success';

  const statusVariant =
    task.status === 'Done'
      ? 'success'
      : task.status === 'In Progress'
      ? 'primary'
      : 'default';

  return (
    <div
      className={`bg-white border rounded-3xl p-6 transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 group ${
        overdue ? 'border-danger-300 bg-danger-50/10' : 'border-border/40'
      }`}
    >
      {/* Top row — badges */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Badge variant={priorityVariant}>{task.priority}</Badge>
          <Badge variant={statusVariant}>{task.status}</Badge>
        </div>
        {overdue && (
          <div className="flex items-center gap-1 text-danger-500">
            <HiOutlineExclamationTriangle className="h-4 w-4" />
            <span className="text-xs font-medium">Overdue</span>
          </div>
        )}
      </div>

      {/* Title */}
      <h3
        className={`text-base font-semibold mb-1.5 ${
          task.status === 'Done'
            ? 'text-text-tertiary line-through'
            : 'text-text-primary'
        }`}
      >
        {task.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-text-secondary leading-relaxed mb-4">
        {truncateText(task.description, 100)}
      </p>

      {/* Due date */}
      <div className="flex items-center gap-1.5 text-xs text-text-tertiary mb-4">
        <HiOutlineClock className="h-3.5 w-3.5" />
        <span>Due {formatDate(task.dueDate)}</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-3 border-t border-border/50">
        <button
          onClick={handleToggle}
          disabled={isUpdating}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            task.status === 'Done'
              ? 'text-warning-600 hover:bg-warning-50'
              : 'text-success-600 hover:bg-success-50'
          } ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <HiOutlineCheckCircle className="h-4 w-4" />
          {task.status === 'Done' ? 'Undo' : 'Complete'}
        </button>
        <button
          onClick={() => onEdit(task)}
          disabled={isUpdating}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-primary-600 hover:bg-primary-50 transition-colors ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <HiOutlinePencilSquare className="h-4 w-4" />
          Edit
        </button>
        <button
          onClick={handleDelete}
          disabled={isUpdating}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-danger-500 hover:bg-danger-50 transition-colors ml-auto ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <HiOutlineTrash className="h-4 w-4" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
