import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ProjectStatusCard from '../components/ProjectStatusCard';
import GanttChart from '../components/GanttChart';
import BudgetChart from '../components/BudgetChart';
import RiskChart from '../components/RiskChart';
import { db } from '../lib/db';

const Index = () => {
  const [plan, setPlan] = useState<any>(null);
  const [progress, setProgress] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const planRec = await db.projectPlan.get(1);
      const progRec = await db.progress.get(1);
      setPlan(planRec?.data || null);
      setProgress(progRec?.data || null);
      setLoading(false);
    };
    fetchData();
  }, []);

  // Helper: get status percent (e.g. based on completed milestones)
  const getStatusPercent = () => {
    if (!plan || !progress || !plan.timeline || !progress.timeline) return 67;
    const total = plan.timeline.length;
    const completed = progress.timeline.filter((m) => m.status === 'Completed').length;
    return total > 0 ? Math.round((completed / total) * 100) : 67;
  };

  // Helper: get Gantt tasks
  const getGanttTasks = () => {
    if (!plan || !plan.timeline) return undefined;
    return plan.timeline.map((item, idx) => ({
      name: item.activities || `Task ${idx + 1}`,
      progress: progress && progress.timeline && progress.timeline[idx] && progress.timeline[idx].percent !== undefined
        ? progress.timeline[idx].percent
        : 0,
      timeline: item.percent !== undefined ? item.percent : 100,
    }));
  };

  // Helper: get months for Gantt
  const getGanttMonths = () => {
    if (!plan || !plan.timeline) return undefined;
    return plan.timeline.map((item) => item.month || '');
  };

  // Helper: get budget data
  const getBudgetData = () => {
    if (!plan || !plan.budget) return undefined;
    return plan.budget.map((item, idx) => ({
      name: item.item,
      Estimated: item.cost,
      Consumed:
        progress && progress.budget && progress.budget[idx] && progress.budget[idx].actual !== undefined
          ? progress.budget[idx].actual
          : 0,
    }));
  };

  // Helper: get risk data
  const getRiskData = () => {
    if (!progress || !progress.risks) return undefined;
    // Example: count by status
    const statusCounts = progress.risks.reduce(
      (acc, r) => {
        acc[r.status] = (acc[r.status] || 0) + 1;
        return acc;
      },
      { Resolved: 0, 'In progress': 0, Pending: 0 }
    );
    return [
      { name: 'Resolved', value: statusCounts['Resolved'], color: '#22c55e' },
      { name: 'In progress', value: statusCounts['In progress'], color: '#3b82f6' },
      { name: 'Pending', value: statusCounts['Pending'], color: '#ef4444' },
    ];
  };

  if (loading) return <div className="p-8">Loading...</div>;

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
          <div className="max-w-7xl mx-auto">
            {/* Top Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <ProjectStatusCard plan={plan} progress={progress} />
              <GanttChart plan={plan} progress={progress} />
            </div>
            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <BudgetChart plan={plan} progress={progress} />
              </div>
              <div>
                <RiskChart plan={plan} progress={progress} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
