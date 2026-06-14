import { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Input from '../common/Input';
import { useTask } from '../../context/TaskContext';
import { TASK_STATUS, TASK_PRIORITY } from '../../utils/constants';
import toast from 'react-hot-toast';

const EditTaskModal = ({ isOpen, onClose, task }) => {
  const { updateTask } = useTask();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    status: 'Todo',
    dueDate: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || 'Medium',
        status: task.status || 'Todo',
        dueDate: task.dueDate || '',
      });
      setErrors({});
    }
  }, [task]);

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'Title is required';
    if (!form.description.trim()) newErrors.description = 'Description is required';
    if (!form.dueDate) newErrors.dueDate = 'Due date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await updateTask(task._id || task.id, form);
      toast.success('Task updated successfully!');
      onClose();
    } catch (err) {
      toast.error(err.message || 'Failed to update task.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Task" size="md">
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Task Title"
          placeholder="Enter task title..."
          value={form.title}
          onChange={(e) => handleChange('title', e.target.value)}
          error={errors.title}
        />

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-text-primary">
            Description
          </label>
          <textarea
            rows={3}
            placeholder="Describe the task..."
            value={form.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className={`input-field resize-none ${
              errors.description ? 'border-danger-500' : ''
            }`}
          />
          {errors.description && (
            <p className="text-sm text-danger-500">{errors.description}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-text-primary">
              Priority
            </label>
            <select
              value={form.priority}
              onChange={(e) => handleChange('priority', e.target.value)}
              className="input-field"
            >
              {Object.values(TASK_PRIORITY).map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-text-primary">
              Status
            </label>
            <select
              value={form.status}
              onChange={(e) => handleChange('status', e.target.value)}
              className="input-field"
            >
              {Object.values(TASK_STATUS).map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Input
          label="Due Date"
          type="date"
          value={form.dueDate}
          onChange={(e) => handleChange('dueDate', e.target.value)}
          error={errors.dueDate}
        />

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="secondary" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditTaskModal;
