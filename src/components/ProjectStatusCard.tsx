import React from 'react';

const ProjectStatusCard = ({
  statusPercent = 67,
  startDate = '19-12-2025',
  completionDate = '19-12-2025',
  milestone = '19-12-2025',
  projectedDate = '19-12-2025',
  plan,
  progress,
}) => {
  // Calculate overall progress
  const calculateProgress = () => {
    if (!plan || !progress || !plan.timeline || !progress.timeline) return 67;
    const total = plan.timeline.length;
    const completed = progress.timeline.filter((m) => m.status === 'Completed').length;
    return total > 0 ? Math.round((completed / total) * 100) : 67;
  };

  const currentProgress = calculateProgress();

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">Project Status</h3>
        <div className="text-right">
          <span className="text-2xl font-bold text-gray-800">{currentProgress}%</span>
          <p className="text-sm text-gray-500">Overall Progress</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-orange-400 h-3 rounded-full transition-all duration-500" 
            style={{ width: `${currentProgress}%` }}
          ></div>
        </div>
      </div>

      {/* Project Details Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm font-medium text-gray-600 mb-1">Start Date</p>
          <p className="text-lg font-bold text-gray-800">{plan?.startDate || startDate}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm font-medium text-gray-600 mb-1">Planned Completion</p>
          <p className="text-lg font-bold text-gray-800">{plan?.completionDate || completionDate}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm font-medium text-gray-600 mb-1">Current Milestone</p>
          <p className="text-lg font-bold text-gray-800">
            {progress?.currentMilestone || plan?.milestone || milestone}
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm font-medium text-gray-600 mb-1">Projected Completion</p>
          <p className="text-lg font-bold text-gray-800">
            {progress?.projectedCompletion || plan?.projectedDate || projectedDate}
          </p>
        </div>
      </div>

      {/* Milestone Progress */}
      {plan?.timeline && progress?.timeline && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-600 mb-3">Recent Milestones</h4>
          <div className="space-y-2">
            {plan.timeline.slice(0, 3).map((milestone, idx) => {
              const progressMilestone = progress.timeline[idx];
              const isCompleted = progressMilestone?.status === 'Completed';
              const isDelayed = progressMilestone?.status === 'Delayed';
              
              return (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">{milestone.activities}</span>
                  <span className={`px-2 py-1 rounded ${
                    isCompleted ? 'bg-green-100 text-green-700' :
                    isDelayed ? 'bg-red-100 text-red-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {progressMilestone?.status || 'Planned'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectStatusCard;
