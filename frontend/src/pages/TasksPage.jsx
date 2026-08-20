import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTask } from '../context/TaskContext';
import TaskCard from '../components/tasks/TaskCard';
import TaskFilters from '../components/tasks/TaskFilters';
import CreateTaskModal from '../components/tasks/CreateTaskModal';
import EditTaskModal from '../components/tasks/EditTaskModal';
import Pagination from '../components/common/Pagination';
import Button from '../components/common/Button';
import { HiOutlinePlusCircle } from 'react-icons/hi2';

const TasksPage = () => {
  const {
    tasks,
    totalCount,
    currentPage,
    setCurrentPage,
    totalPages,
  } = useTask();

  const [searchParams] = useSearchParams();
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Open create modal if ?new=true
  useEffect(() => {
    if (searchParams.get('new') === 'true') {
      setCreateOpen(true);
    }
  }, [searchParams]);

  const handleEdit = (task) => {
    setEditingTask(task);
    setEditOpen(true);
  };

  const handleCloseEdit = () => {
    setEditOpen(false);
    setEditingTask(null);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/50">
        <div>
          <h1 className="text-2xl font-extrabold text-text-primary tracking-tight">Tasks</h1>
          <p className="text-sm text-text-secondary mt-1">
            Manage, organize, and track your daily priorities and workflow.
          </p>
        </div>
        <Button
          icon={HiOutlinePlusCircle}
          onClick={() => setCreateOpen(true)}
        >
          Add Task
        </Button>
      </div>

      {/* Filters */}
      <TaskFilters />

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-text-secondary">
          Showing{' '}
          <span className="font-medium text-text-primary">
            {tasks.length}
          </span>{' '}
          of{' '}
          <span className="font-medium text-text-primary">
            {totalCount}
          </span>{' '}
          tasks
        </p>
      </div>

      {/* Task grid */}
      {tasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <TaskCard key={task._id || task.id} task={task} onEdit={handleEdit} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="w-16 h-16 bg-surface-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-text-tertiary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-1">
            No tasks found
          </h3>
          <p className="text-sm text-text-secondary mb-6">
            Try adjusting your filters or create a new task.
          </p>
          <Button onClick={() => setCreateOpen(true)} icon={HiOutlinePlusCircle}>
            Create Your First Task
          </Button>
        </div>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* Modals */}
      <CreateTaskModal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
      />
      <EditTaskModal
        isOpen={editOpen}
        onClose={handleCloseEdit}
        task={editingTask}
      />
    </div>
  );
};

export default TasksPage;
