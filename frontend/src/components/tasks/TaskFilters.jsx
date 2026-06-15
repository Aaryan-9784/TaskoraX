import { useTask } from '../../context/TaskContext';
import { TASK_STATUS, TASK_PRIORITY } from '../../utils/constants';
import { HiOutlineMagnifyingGlass, HiOutlineFunnel } from 'react-icons/hi2';
import Select from '../common/Select';

const TaskFilters = () => {
  const {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    sortBy,
    setSortBy,
    setCurrentPage,
  } = useTask();

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (key, value) => {
    if (key === 'status') setStatusFilter(value || 'All');
    if (key === 'priority') setPriorityFilter(value || 'All');
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearch('');
    setStatusFilter('All');
    setPriorityFilter('All');
    setSortBy('newest');
    setCurrentPage(1);
  };

  const hasActiveFilters = search || statusFilter !== 'All' || priorityFilter !== 'All' || sortBy !== 'newest';

  return (
    <div className="bg-white border border-border/50 rounded-2xl p-4">
      <div className="flex flex-col lg:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <HiOutlineMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={handleSearch}
            className="input-field pl-10"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <Select
            value={statusFilter === 'All' ? '' : statusFilter}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="w-40"
            options={[
              { label: 'All Statuses', value: '' },
              ...Object.values(TASK_STATUS).map((status) => ({ label: status, value: status }))
            ]}
          />

          <Select
            value={priorityFilter === 'All' ? '' : priorityFilter}
            onChange={(e) => handleFilterChange('priority', e.target.value)}
            className="w-40"
            options={[
              { label: 'All Priorities', value: '' },
              ...Object.values(TASK_PRIORITY).map((priority) => ({ label: priority, value: priority }))
            ]}
          />

          <Select
            value={sortBy}
            onChange={handleSortChange}
            className="w-40"
            options={[
              { label: 'Newest First', value: 'newest' },
              { label: 'Oldest First', value: 'oldest' },
              { label: 'Due Date', value: 'due-date' },
              { label: 'Priority', value: 'priority' },
            ]}
          />

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="btn-ghost text-xs text-danger-500 hover:text-danger-600 hover:bg-danger-50"
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskFilters;
