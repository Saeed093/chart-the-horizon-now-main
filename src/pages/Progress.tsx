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
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSave = () => {
    if (file) {
      // TODO: Implement save logic here
      console.log('Saving file:', file.name);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed inset-y-0 left-0 w-64 z-30">
        <Sidebar />
      </div>
      <div className="ml-64 flex flex-col h-screen">
        <div className="sticky top-0 z-20 bg-gray-50">
          <Header title="Update Progress" />
        </div>
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Upload Progress Update</h2>
              <p className="text-gray-600 mb-4">Please upload a PDF or Word document to update the progress.</p>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {file && <p className="mt-2 text-sm text-gray-600">Selected file: {file.name}</p>}
              <button
                onClick={handleSave}
                disabled={!file}
                className={`mt-4 px-4 py-2 rounded bg-blue-600 text-white font-semibold ${!file ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
              >
                Save
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Progress; 