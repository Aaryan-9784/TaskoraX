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

const TaskCard = ({ task, onEdit }) => {
  const { deleteTask, toggleTaskStatus } = useTask();
  const overdue = isOverdue(task.dueDate) && task.status !== 'Done';

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
          onClick={() => toggleTaskStatus(task._id || task.id, task.status)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            task.status === 'Done'
              ? 'text-warning-600 hover:bg-warning-50'
              : 'text-success-600 hover:bg-success-50'
          }`}
        >
          <HiOutlineCheckCircle className="h-4 w-4" />
          {task.status === 'Done' ? 'Undo' : 'Complete'}
        </button>
        <button
          onClick={() => onEdit(task)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-primary-600 hover:bg-primary-50 transition-colors"
        >
          <HiOutlinePencilSquare className="h-4 w-4" />
          Edit
        </button>
        <button
          onClick={() => {
            if (window.confirm('Are you sure you want to delete this task?')) {
              deleteTask(task._id || task.id);
            }
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-danger-500 hover:bg-danger-50 transition-colors ml-auto"
        >
          <HiOutlineTrash className="h-4 w-4" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
