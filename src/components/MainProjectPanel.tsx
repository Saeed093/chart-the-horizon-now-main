import React from 'react';

const MainProjectPanel = ({
  projectName = 'AI-Powered Learning Hubs',
  division = 'Planning Division',
  dateRange = 'May 2025 – Dec 2025',
  statusPercent = 75,
  deployed = '10/10',
  engagements = 430,
  completion = 550,
  satisfaction = '4.4 / 4.5',
  risks = [
    { icon: '⚠️', text: 'Low usage at 2 locations' },
    { icon: '•', text: 'Final impact data pending' },
  ],
  milestones = [
    { icon: '📢', text: 'Outreach event–Nov' },
    { icon: '📊', text: 'Impact study–Dec' },
    { icon: '📄', text: 'Phase 2 proposal–Dec' },
  ],
  hideRisksAndMilestones = false,
  projectNameOptions,
  onProjectNameChange,
}) => {
  return (
    <>
      <div className="">
        <div className="flex items-center gap-2 text-2xl font-bold mb-1">
          {projectNameOptions && onProjectNameChange ? (
            <select
              className="border rounded px-2 py-1 text-lg font-bold"
              value={projectName}
              onChange={e => onProjectNameChange(e.target.value)}
            >
              {projectNameOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          ) : (
            <span>{projectName}</span>
          )}
        </div>
        <div className="text-gray-500 mb-2">{division}</div>
        <div className="flex items-center justify-between mb-2">
          <div className="text-gray-600">{dateRange}</div>
          <div className="text-gray-700 font-semibold">Overall. Status <span className="ml-2">{statusPercent}%</span></div>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded mb-6">
          <div className="h-2 bg-green-500 rounded" style={{ width: `${statusPercent}%` }}></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-2">
          <div className="bg-gray-50 rounded p-4 flex flex-col items-center">
            <div className="text-gray-500 text-sm mb-1">Learning Hubs Deployed</div>
            <div className="text-2xl font-bold">{deployed}</div>
          </div>
          <div className="bg-gray-50 rounded p-4 flex flex-col items-center">
            <div className="text-gray-500 text-sm mb-1">User Engagements</div>
            <div className="text-2xl font-bold">{engagements}</div>
          </div>
          <div className="bg-gray-50 rounded p-4 flex flex-col items-center">
            <div className="text-gray-500 text-sm mb-1">Completion Rate</div>
            <div className="text-2xl font-bold">{completion}</div>
          </div>
          <div className="bg-gray-50 rounded p-4 flex flex-col items-center">
            <div className="text-gray-500 text-sm mb-1">Satisfaction Score</div>
            <div className="text-2xl font-bold">{satisfaction}</div>
            <div className="text-yellow-500 mt-1">{'★★★★★'}</div>
          </div>
        </div>
      </div>
      {!hideRisksAndMilestones && (
        <div className="bg-gray-50 rounded-lg p-6 mt-6 w-full flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <div className="font-semibold mb-2">Risks</div>
            <ul className="space-y-1">
              {risks.map((r, i) => (
                <li key={i} className="flex items-center text-gray-700"><span className="mr-2">{r.icon}</span>{r.text}</li>
              ))}
            </ul>
          </div>
          <div className="flex-1">
            <div className="font-semibold mb-2">Next Milestones</div>
            <ul className="space-y-1">
              {milestones.map((m, i) => (
                <li key={i} className="flex items-center text-gray-700"><span className="mr-2">{m.icon}</span>{m.text}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default MainProjectPanel; 