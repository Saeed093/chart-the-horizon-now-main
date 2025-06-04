import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import MainProjectPanel from '../components/MainProjectPanel';
import BudgetChart from '../components/BudgetChart';
import BudgetPieChart from '../components/BudgetPieChart';

const risks = [
  { icon: '⚠️', text: 'Low usage at 2 locations' },
  { icon: '•', text: 'Final impact data pending' },
];
const milestones = [
  { icon: '📢', text: 'Outreach event–Nov' },
  { icon: '📊', text: 'Impact study–Dec' },
  { icon: '📄', text: 'Phase 2 proposal–Dec' },
];
const projectOptions = ['AI-Powered Learning Hubs'];

const Index = () => {
  const [selectedProject, setSelectedProject] = useState(projectOptions[0]);

  // Dummy values for pie chart
  const totalBudget = 14.7;
  const consumedBudget = 11.2;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 z-30">
        <Sidebar />
      </div>
      {/* Main Content with fixed header */}
      <div className="ml-64 flex flex-col h-screen">
        <div className="sticky top-0 z-20 bg-gray-50">
          <Header title="Dashboard" />
        </div>
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Top Section: Two columns */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left: Project Info, Progress, Metrics */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow p-6 h-full flex flex-col justify-between">
                  <MainProjectPanel
                    projectName={selectedProject}
                    projectNameOptions={projectOptions}
                    onProjectNameChange={setSelectedProject}
                    hideRisksAndMilestones
                  />
                </div>
              </div>
              {/* Right: Risks and Next Milestones */}
              <div>
                <div className="bg-white rounded-lg shadow p-6 h-full flex flex-col gap-8">
                  <div>
                    <div className="font-semibold mb-2">Risks</div>
                    <ul className="space-y-1">
                      {risks.map((r, i) => (
                        <li key={i} className="flex items-center text-gray-700"><span className="mr-2">{r.icon}</span>{r.text}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="font-semibold mb-2">Next Milestones</div>
                    <ul className="space-y-1">
                      {milestones.map((m, i) => (
                        <li key={i} className="flex items-center text-gray-700"><span className="mr-2">{m.icon}</span>{m.text}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* Bottom: Budget Chart and Pie Chart */}
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="bg-white rounded-lg shadow p-6 flex-1">
                <BudgetChart plan={{}} progress={{}} />
              </div>
              <div className="bg-white rounded-lg shadow p-6 flex items-center justify-center w-full lg:w-96">
                <BudgetPieChart total={totalBudget} consumed={consumedBudget} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
