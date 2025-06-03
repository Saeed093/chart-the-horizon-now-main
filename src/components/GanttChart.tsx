import React from 'react';

const GanttChart = ({
  tasks = [
    { name: 'Task 1', progress: 80, timeline: 90 },
    { name: 'Task 2', progress: 65, timeline: 85 },
    { name: 'Task 3', progress: 45, timeline: 70 },
  ],
  months = ['May', 'Jun', 'Jul'],
  plan,
  progress,
}) => {
  // Generate tasks from plan and progress
  const generateTasks = () => {
    if (!plan?.timeline) return tasks;
    return plan.timeline.map((item, idx) => ({
      name: item.activities || `Task ${idx + 1}`,
      progress: progress?.timeline?.[idx]?.percent || 0,
      timeline: item.percent || 100,
      status: progress?.timeline?.[idx]?.status || 'Planned',
    }));
  };

  // Generate months from plan
  const generateMonths = () => {
    if (!plan?.timeline) return months;
    return plan.timeline.map(item => item.month || '');
  };

  const displayTasks = generateTasks();
  const displayMonths = generateMonths();

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Gantt Chart</h3>

      {/* Legend */}
      <div className="flex items-center space-x-6 mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-purple-300 rounded"></div>
          <span className="text-sm text-gray-600">Planned</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span className="text-sm text-gray-600">Actual Progress</span>
        </div>
      </div>

      {/* Month Headers */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div></div>
        {displayMonths.map((month, index) => (
          <div key={index} className="text-center font-medium text-gray-600">
            {month}
          </div>
        ))}
      </div>

      {/* Task Rows */}
      <div className="space-y-4">
        {displayTasks.map((task, index) => (
          <div key={index} className="grid grid-cols-4 gap-4 items-center">
            <div className="text-sm font-medium text-gray-700">{task.name}</div>
            <div className="col-span-3">
              <div className="relative h-8 bg-gray-100 rounded">
                {/* Planned timeline */}
                <div
                  className="absolute top-0 left-0 h-full bg-purple-300 rounded"
                  style={{ width: `${task.timeline}%` }}
                ></div>
                {/* Actual progress */}
                <div
                  className="absolute top-0 left-0 h-full bg-blue-500 rounded"
                  style={{ width: `${task.progress}%` }}
                ></div>
                {/* Status indicator */}
                {task.status && (
                  <div className="absolute -right-2 top-1/2 transform -translate-y-1/2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      task.status === 'Completed' ? 'bg-green-100 text-green-700' :
                      task.status === 'Delayed' ? 'bg-red-100 text-red-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {task.status}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GanttChart;
