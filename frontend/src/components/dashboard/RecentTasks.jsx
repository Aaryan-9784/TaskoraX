import { useTask } from '../../context/TaskContext';
import { formatDate, truncateText } from '../../utils/helpers';
import Badge from '../common/Badge';
import { PRIORITY_COLORS, STATUS_COLORS } from '../../utils/constants';

const RecentTasks = () => {
  const { tasks } = useTask();

  const recentTasks = [...tasks]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="bg-white border border-border/50 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-text-primary">
          Recent Tasks
        </h3>
        <span className="text-xs text-text-tertiary">{tasks.length} total</span>
      </div>

      <div className="space-y-3">
        {recentTasks.map((task) => {
          const priorityColor = PRIORITY_COLORS[task.priority] || {};
          const statusColor = STATUS_COLORS[task.status] || {};

          return (
            <div
              key={task.id}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-secondary transition-colors group"
            >
              {/* Completion indicator */}
              <div
                className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                  task.completed ? 'bg-success-500' : 'bg-gray-200'
                }`}
              />

              {/* Task info */}
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-medium truncate ${
                    task.completed
                      ? 'text-text-tertiary line-through'
                      : 'text-text-primary'
                  }`}
                >
                  {task.title}
                </p>
                <p className="text-xs text-text-tertiary mt-0.5">
                  Due {formatDate(task.dueDate)}
                </p>
              </div>

              {/* Badges */}
              <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
                <Badge
                  variant={
                    task.priority === 'High'
                      ? 'danger'
                      : task.priority === 'Medium'
                      ? 'warning'
                      : 'success'
                  }
                >
                  {task.priority}
                </Badge>
                <Badge
                  variant={
                    task.status === 'Done'
                      ? 'success'
                      : task.status === 'In Progress'
                      ? 'primary'
                      : 'default'
                  }
                >
                  {task.status}
                </Badge>
              </div>
            </div>
          );
        })}

        {recentTasks.length === 0 && (
          <p className="text-center text-sm text-text-tertiary py-8">
            No tasks yet. Create your first task!
          </p>
        )}
      </div>
    </div>
  );
};

export default RecentTasks;
