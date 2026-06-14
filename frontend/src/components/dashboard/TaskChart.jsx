import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { useTask } from '../../context/TaskContext';

const COLORS = ['#2563EB', '#F59E0B', '#22C55E'];

const TaskChart = () => {
  const { stats } = useTask();

  // Bar chart data — tasks by day of week
  const barData = [
    { name: 'Mon', tasks: 8 },
    { name: 'Tue', tasks: 12 },
    { name: 'Wed', tasks: 6 },
    { name: 'Thu', tasks: 15 },
    { name: 'Fri', tasks: 10 },
    { name: 'Sat', tasks: 4 },
    { name: 'Sun', tasks: 3 },
  ];

  // Pie chart data — tasks by status
  const pieData = [
    { name: 'Todo', value: stats.todo },
    { name: 'In Progress', value: stats.inProgress },
    { name: 'Completed', value: stats.completed },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-border rounded-xl px-3 py-2 shadow-medium text-sm">
          <p className="font-medium text-text-primary">{label || payload[0].name}</p>
          <p className="text-text-secondary">{payload[0].value} tasks</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* Bar Chart */}
      <div className="lg:col-span-3 bg-white border border-border/50 rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-text-primary mb-4">
          Tasks Overview
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} barCategoryGap="30%">
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F8FAFC' }} />
              <Bar dataKey="tasks" fill="#2563EB" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="lg:col-span-2 bg-white border border-border/50 rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-text-primary mb-4">
          Task Distribution
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="45%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => (
                  <span className="text-xs text-text-secondary">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default TaskChart;
