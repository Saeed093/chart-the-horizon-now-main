import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const initialMilestones = [
  { milestone: 'Project Kick-off & Partner Onboarding', target: 'May 2025', status: '✅ Completed', notes: 'NLB, PA, and vendors onboarded successfully' },
  { milestone: 'Site Setup and Software Procurement', target: 'June 2025', status: '✅ Completed', notes: 'AI tutor software (SmartLearn) deployed' },
  { milestone: 'Curriculum Design & UX Testing', target: 'June 2025', status: '✅ Completed', notes: 'Focus on seniors, jobseekers, and caregivers' },
  { milestone: 'Learning Hubs Installation', target: 'July 2025', status: '✅ Completed', notes: 'All 10 locations operational' },
  { milestone: 'Official Public Launch', target: 'August 2025', status: '✅ Completed', notes: 'Media coverage by CNA and Zaobao' },
  { milestone: 'Mid-Pilot User Feedback Round', target: 'September 2025', status: '✅ Completed', notes: '88% user satisfaction (n = 1,206)' },
  { milestone: 'AI System Tuning and Content Iteration', target: 'Oct–Nov 2025', status: '🟡 In Progress', notes: 'Improving localised content and voice interface' },
];
const initialBudget = [
  { category: 'Hardware & Installation', budgeted: 200000, actual: 198000, variance: -2000, notes: 'Under budget' },
  { category: 'AI Software Licenses', budgeted: 150000, actual: 150000, variance: 0, notes: 'Fully deployed' },
  { category: 'Content Development & Translation', budgeted: 100000, actual: 89000, variance: -11000, notes: 'Some translations postponed' },
  { category: 'Publicity & Engagement', budgeted: 50000, actual: 45000, variance: -5000, notes: 'Final push in Dec' },
  { category: 'Evaluation & Data Analysis', budgeted: 50000, actual: 30000, variance: -20000, notes: 'Final analysis in progress' },
  { category: 'Total', budgeted: 605000, actual: 512000, variance: -93000, notes: 'On track' },
];
const initialRisks = [
  { risk: 'Lower adoption in 2 sites (Bedok, Bukit Merah)', status: '⏳ Ongoing', mitigation: 'Additional outreach with grassroots leaders' },
  { risk: 'AI misinterpreting dialects', status: '✅ Resolved', mitigation: 'Added toggle for simplified language options' },
  { risk: 'Data privacy concerns from elderly users', status: '⏳ Mitigated', mitigation: 'Enhanced PDPA compliance briefing at each site' },
];

const Progress = () => {
  const [executiveSummary, setExecutiveSummary] = useState(
    'The CLH project is progressing on schedule and within budget. All 10 Community Learning Hubs have been successfully deployed, and usage is steadily increasing. Early indicators suggest strong interest among seniors and low-income jobseekers. User feedback is positive, especially for the multilingual AI tutor and scam prevention modules.\nWe are currently in the evaluation and optimisation phase. Engagement activities and content refinement are ongoing. A final impact report is expected in December 2025.'
  );
  const [milestones, setMilestones] = useState(initialMilestones);
  const [achievements, setAchievements] = useState([
    '4,130 unique users across 10 hubs (exceeded target of 1,500 for this stage)',
    '72% of users are above age 50',
    '550 learners completed at least one structured learning path',
    'High engagement in scam prevention and PayNow tutorials',
    'Partnered with SkillsFuture to trial 2 micro-certifications',
    'AI interface upgraded with Mandarin, Malay, Tamil voice support',
  ]);
  const [budget, setBudget] = useState(initialBudget);
  const [risks, setRisks] = useState(initialRisks);
  const [nextSteps, setNextSteps] = useState([
    'Run final public engagement campaign (e.g. "Digital Ready Week")',
    'Complete final data collection and impact evaluation',
    'Prepare and present Phase 2 proposal for wider rollout in Q1 2026',
    'Explore corporate and NGO partnerships for sustainability',
  ]);
  const [recommendations, setRecommendations] = useState([
    'Early results support scaling to 30–50 hubs in 2026',
    'Focus future content development on:',
    'Digital job-readiness (e.g. e-commerce fulfilment, remote freelancing)',
    'Financial safety and scam resilience',
    'Potential to deploy AI tutors in heartland polyclinics and HDB void decks via mobile kiosks',
  ]);

  // Editable handlers for tables and lists
  const handleMilestoneChange = (idx, field, value) => {
    setMilestones(milestones.map((m, i) => i === idx ? { ...m, [field]: value } : m));
  };
  const handleBudgetChange = (idx, field, value) => {
    setBudget(budget.map((b, i) => i === idx ? { ...b, [field]: value } : b));
  };
  const handleRiskChange = (idx, field, value) => {
    setRisks(risks.map((r, i) => i === idx ? { ...r, [field]: value } : r));
  };
  const handleAchievementChange = (idx, value) => {
    setAchievements(achievements.map((a, i) => i === idx ? value : a));
  };
  const handleNextStepChange = (idx, value) => {
    setNextSteps(nextSteps.map((n, i) => i === idx ? value : n));
  };
  const handleRecommendationChange = (idx, value) => {
    setRecommendations(recommendations.map((r, i) => i === idx ? value : r));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 z-30">
        <Sidebar />
      </div>
      {/* Main Content with fixed header */}
      <div className="ml-64 flex flex-col h-screen">
        <div className="sticky top-0 z-20 bg-gray-50">
          <Header title="Current Progress" />
        </div>
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-5xl mx-auto space-y-10">
            {/* Progress at the top */}
            <section>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Progress</h1>
            </section>
            {/* a) Executive Summary */}
            <section>
              <h2 className="text-xl font-semibold mb-2">1. Executive Summary</h2>
              <textarea
                className="w-full min-h-[100px] p-3 border rounded bg-white text-gray-800"
                value={executiveSummary}
                onChange={e => setExecutiveSummary(e.target.value)}
              />
            </section>
            {/* b) Progress Against Key Milestones */}
            <section>
              <h2 className="text-xl font-semibold mb-2">2. Progress Against Key Milestones</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border rounded">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2 border">Milestone</th>
                      <th className="p-2 border">Target Date</th>
                      <th className="p-2 border">Status</th>
                      <th className="p-2 border">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {milestones.map((m, idx) => (
                      <tr key={idx}>
                        <td className="border p-2">
                          <input className="w-full" value={m.milestone} onChange={e => handleMilestoneChange(idx, 'milestone', e.target.value)} />
                        </td>
                        <td className="border p-2">
                          <input className="w-full" value={m.target} onChange={e => handleMilestoneChange(idx, 'target', e.target.value)} />
                        </td>
                        <td className="border p-2">
                          <input className="w-full" value={m.status} onChange={e => handleMilestoneChange(idx, 'status', e.target.value)} />
                        </td>
                        <td className="border p-2">
                          <input className="w-full" value={m.notes} onChange={e => handleMilestoneChange(idx, 'notes', e.target.value)} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
            {/* c) Key Achievements */}
            <section>
              <h2 className="text-xl font-semibold mb-2">3. Key Achievements</h2>
              <ul className="space-y-2">
                {achievements.map((a, idx) => (
                  <li key={idx}>
                    <input className="w-full" value={a} onChange={e => handleAchievementChange(idx, e.target.value)} />
                  </li>
                ))}
              </ul>
            </section>
            {/* d) Budget Status */}
            <section>
              <h2 className="text-xl font-semibold mb-2">4. Budget Status</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border rounded">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2 border">Category</th>
                      <th className="p-2 border">Budgeted</th>
                      <th className="p-2 border">Actual (to date)</th>
                      <th className="p-2 border">Variance</th>
                      <th className="p-2 border">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {budget.map((b, idx) => (
                      <tr key={idx}>
                        <td className="border p-2">
                          <input className="w-full" value={b.category} onChange={e => handleBudgetChange(idx, 'category', e.target.value)} />
                        </td>
                        <td className="border p-2">
                          <input className="w-full" type="number" value={b.budgeted} onChange={e => handleBudgetChange(idx, 'budgeted', e.target.value)} />
                        </td>
                        <td className="border p-2">
                          <input className="w-full" type="number" value={b.actual} onChange={e => handleBudgetChange(idx, 'actual', e.target.value)} />
                        </td>
                        <td className="border p-2">
                          <input className="w-full" type="number" value={b.variance} onChange={e => handleBudgetChange(idx, 'variance', e.target.value)} />
                        </td>
                        <td className="border p-2">
                          <input className="w-full" value={b.notes} onChange={e => handleBudgetChange(idx, 'notes', e.target.value)} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
            {/* e) Risks & Mitigations */}
            <section>
              <h2 className="text-xl font-semibold mb-2">5. Risks & Mitigations</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border rounded">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2 border">Risk</th>
                      <th className="p-2 border">Status</th>
                      <th className="p-2 border">Mitigation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {risks.map((r, idx) => (
                      <tr key={idx}>
                        <td className="border p-2">
                          <input className="w-full" value={r.risk} onChange={e => handleRiskChange(idx, 'risk', e.target.value)} />
                        </td>
                        <td className="border p-2">
                          <input className="w-full" value={r.status} onChange={e => handleRiskChange(idx, 'status', e.target.value)} />
                        </td>
                        <td className="border p-2">
                          <input className="w-full" value={r.mitigation} onChange={e => handleRiskChange(idx, 'mitigation', e.target.value)} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
            {/* f) Next Steps */}
            <section>
              <h2 className="text-xl font-semibold mb-2">6. Next Steps (Nov–Dec 2025)</h2>
              <ul className="space-y-2">
                {nextSteps.map((n, idx) => (
                  <li key={idx}>
                    <input className="w-full" value={n} onChange={e => handleNextStepChange(idx, e.target.value)} />
                  </li>
                ))}
              </ul>
            </section>
            {/* g) Preliminary Recommendations */}
            <section>
              <h2 className="text-xl font-semibold mb-2">7. Preliminary Recommendations</h2>
              <ul className="space-y-2">
                {recommendations.map((r, idx) => (
                  <li key={idx}>
                    <input className="w-full" value={r} onChange={e => handleRecommendationChange(idx, e.target.value)} />
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Progress; 