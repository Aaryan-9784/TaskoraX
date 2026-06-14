import { useTask } from '../../context/TaskContext';
import { TASK_STATUS, TASK_PRIORITY } from '../../utils/constants';
import { HiOutlineMagnifyingGlass, HiOutlineFunnel } from 'react-icons/hi2';

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
          <select
            value={statusFilter === 'All' ? '' : statusFilter}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="input-field w-auto min-w-[140px] text-sm"
          >
            <option value="">All Statuses</option>
            {Object.values(TASK_STATUS).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <select
            value={priorityFilter === 'All' ? '' : priorityFilter}
            onChange={(e) => handleFilterChange('priority', e.target.value)}
            className="input-field w-auto min-w-[140px] text-sm"
          >
            <option value="">All Priorities</option>
            {Object.values(TASK_PRIORITY).map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={handleSortChange}
            className="input-field w-auto min-w-[140px] text-sm"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="due-date">Due Date</option>
            <option value="priority">Priority</option>
          </select>

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
