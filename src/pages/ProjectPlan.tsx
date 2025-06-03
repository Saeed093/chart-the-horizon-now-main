import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { db } from '../lib/db';

const initialForm = {
  title: 'Digital Inclusion through AI-Powered Community Learning Hubs',
  duration: 'May 2025 – December 2025',
  owner: 'Governance Policy & Planning Division, IMDA',
  manager: 'Gerald Tan',
  summary: `The AI-Powered Community Learning Hubs (CLH) project aims to pilot AI-enabled digital learning stations at selected public libraries and community centres in underserved neighbourhoods. The hubs will provide on-demand, multilingual training in basic digital literacy, cybersecurity awareness, and emerging job skills such as e-commerce, content creation, and remote freelancing. The project will leverage IMDA's existing infrastructure and partnerships and will explore the integration of AI tutors and adaptive learning systems.`,
  objectives: [
    'Enhance digital inclusion by targeting low-income, elderly, and non-English speaking residents.',
    'Deploy AI tutors capable of personalised learning journeys and multilingual support.',
    'Pilot skill-based microlearning with certification paths aligned to SkillsFuture.',
    'Generate insights for nationwide expansion by evaluating uptake, usability, and effectiveness.'
  ],
  scopeIn: [
    'Setup of 10 AI-powered Community Learning Hubs',
    'Procurement and deployment of AI tutoring software',
    'Curriculum development in three key areas:',
    'Basic digital literacy (e.g. using MyInfo, Singpass, PayNow)',
    'Cybersecurity & scam prevention',
    'Job-readiness (e.g. e-commerce, remote work tools)',
    'Public awareness and community engagement campaigns',
    'Data collection and analysis for program refinement',
  ],
  scopeOut: [
    'Development of new AI models (off-the-shelf solutions preferred for the pilot)',
    'Deep-skilling programs (e.g., software development, cloud engineering)',
  ],
  timeline: [
    { month: 'May 2025', activities: 'Project kick-off, partner onboarding, site selection' },
    { month: 'Jun 2025', activities: 'Procurement of hardware/software; curriculum design; UX testing begins' },
    { month: 'Jul 2025', activities: 'Installation of AI stations; dry runs with community groups' },
    { month: 'Aug 2025', activities: 'Official launch of pilot at all 10 locations' },
    { month: 'Sep 2025', activities: 'Mid-pilot user feedback round; media/PR push' },
    { month: 'Oct 2025', activities: 'Content updates; AI performance tuning; data analysis begins' },
    { month: 'Nov 2025', activities: 'Final round of engagement events; initial impact analysis' },
    { month: 'Dec 2025', activities: 'Final evaluation report submitted; proposal for Phase 2 rollout' },
  ],
  stakeholders: [
    { name: 'IMDA Planning Division', role: 'Project ownership, strategic oversight' },
    { name: 'National Library Board (NLB)', role: 'Host locations and outreach' },
    { name: 'PA Community Centres', role: 'Additional pilot locations' },
    { name: 'Local AI Vendors / EdTech Startups', role: 'Software and platform providers' },
    { name: 'SkillsFuture Singapore', role: 'Alignment of content and credentialing' },
    { name: 'Silver Infocomm Junction (SIJ)', role: 'Outreach to senior citizens' },
  ],
  budget: [
    { item: 'Hardware (touchscreens, cameras, etc.)', cost: 200000 },
    { item: 'AI Tutoring Software Licenses', cost: 150000 },
    { item: 'Content Development & Translation', cost: 100000 },
    { item: 'Publicity & Engagement', cost: 50000 },
    { item: 'Research & Evaluation', cost: 50000 },
    { item: 'Contingency (10%)', cost: 55000 },
    { item: 'Total', cost: 605000 },
  ],
  risks: [
    { risk: 'Low community adoption', mitigation: 'Partner with grassroots and run incentives' },
    { risk: 'AI tool inaccuracy or language gaps', mitigation: 'Pre-test with diverse user base; human facilitator support' },
    { risk: 'Tech maintenance issues', mitigation: 'Vendor SLAs; onsite technical support' },
    { risk: 'Privacy and data protection concerns', mitigation: 'Compliance with PDPA; anonymised data collection' },
  ],
  metrics: [
    'At least 1,500 unique users across all hubs during the pilot',
    'Minimum of 80% satisfaction score in user feedback',
    'At least 500 users complete a micro-certification path',
    'Improvement in digital confidence for >70% of senior users surveyed',
    'Viability assessment for nationwide rollout completed by Dec 2025',
  ],
};

const ProjectPlan = () => {
  const [mode, setMode] = useState<'none' | 'upload' | 'create'>('none');
  const [form, setForm] = useState(initialForm);
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(true);
  const [saveMsg, setSaveMsg] = useState('');

  useEffect(() => {
    // Load from db on mount
    db.projectPlan.get(1).then((record) => {
      if (record && record.data) setForm(record.data);
      setLoading(false);
    });
  }, []);

  const handleFormChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  // Dynamic array handlers
  const addToArray = (field, emptyVal) => {
    setForm({ ...form, [field]: [...form[field], emptyVal] });
  };
  const removeFromArray = (field, idx) => {
    setForm({ ...form, [field]: form[field].filter((_: any, i: number) => i !== idx) });
  };

  // Save to db
  const handleSave = async (e) => {
    e.preventDefault();
    await db.projectPlan.put({ id: 1, data: form });
    setSaveMsg('Saved!');
    setTimeout(() => setSaveMsg(''), 2000);
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
          <Header title="Project Plan" />
        </div>
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex gap-4 mb-8">
              <button
                className={`px-4 py-2 rounded font-semibold border ${mode === 'upload' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border-blue-600'}`}
                onClick={() => setMode('upload')}
              >
                Upload Plan
              </button>
              <button
                className={`px-4 py-2 rounded font-semibold border ${mode === 'create' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border-blue-600'}`}
                onClick={() => setMode('create')}
              >
                Create Plan
              </button>
            </div>
            {/* Upload Plan */}
            {mode === 'upload' && (
              <div className="mb-8">
                <label className="block mb-2 font-semibold">Upload Word Document (.doc, .docx):</label>
                <input
                  type="file"
                  accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={e => setFileName(e.target.files?.[0]?.name || '')}
                  className="mb-2"
                />
                {fileName && <div className="text-green-700 font-medium">Selected: {fileName}</div>}
              </div>
            )}
            {/* Create Plan */}
            {mode === 'create' && (
              <form className="space-y-8" onSubmit={handleSave}>
                <div>
                  <h2 className="text-xl font-bold mb-2">Project Plan</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold">Project Title</label>
                      <input className="w-full border rounded p-2" value={form.title} onChange={e => handleFormChange('title', e.target.value)} />
                    </div>
                    <div>
                      <label className="block font-semibold">Project Duration</label>
                      <input className="w-full border rounded p-2" value={form.duration} onChange={e => handleFormChange('duration', e.target.value)} />
                    </div>
                    <div>
                      <label className="block font-semibold">Project Owner</label>
                      <input className="w-full border rounded p-2" value={form.owner} onChange={e => handleFormChange('owner', e.target.value)} />
                    </div>
                    <div>
                      <label className="block font-semibold">Project Manager</label>
                      <input className="w-full border rounded p-2" value={form.manager} onChange={e => handleFormChange('manager', e.target.value)} />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block font-semibold mb-1">a) Project Summary</label>
                  <textarea className="w-full border rounded p-2 min-h-[80px]" value={form.summary} onChange={e => handleFormChange('summary', e.target.value)} />
                </div>
                <div>
                  <label className="block font-semibold mb-1">b) Project Objectives</label>
                  <ul className="space-y-2">
                    {form.objectives.map((obj, idx) => (
                      <li key={idx} className="flex gap-2 items-center">
                        <input className="w-full border rounded p-2" value={obj} onChange={e => {
                          const newArr = [...form.objectives]; newArr[idx] = e.target.value; handleFormChange('objectives', newArr);
                        }} />
                        <button type="button" className="text-red-500 px-2" onClick={() => removeFromArray('objectives', idx)}>-</button>
                      </li>
                    ))}
                  </ul>
                  <button type="button" className="mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded" onClick={() => addToArray('objectives', '')}>Add Objective</button>
                </div>
                <div>
                  <label className="block font-semibold mb-1">c) Scope</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="font-semibold">In Scope:</span>
                      <ul className="space-y-2">
                        {form.scopeIn.map((item, idx) => (
                          <li key={idx} className="flex gap-2 items-center">
                            <input className="w-full border rounded p-2" value={item} onChange={e => {
                              const newArr = [...form.scopeIn]; newArr[idx] = e.target.value; handleFormChange('scopeIn', newArr);
                            }} />
                            <button type="button" className="text-red-500 px-2" onClick={() => removeFromArray('scopeIn', idx)}>-</button>
                          </li>
                        ))}
                      </ul>
                      <button type="button" className="mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded" onClick={() => addToArray('scopeIn', '')}>Add In Scope</button>
                    </div>
                    <div>
                      <span className="font-semibold">Out of Scope:</span>
                      <ul className="space-y-2">
                        {form.scopeOut.map((item, idx) => (
                          <li key={idx} className="flex gap-2 items-center">
                            <input className="w-full border rounded p-2" value={item} onChange={e => {
                              const newArr = [...form.scopeOut]; newArr[idx] = e.target.value; handleFormChange('scopeOut', newArr);
                            }} />
                            <button type="button" className="text-red-500 px-2" onClick={() => removeFromArray('scopeOut', idx)}>-</button>
                          </li>
                        ))}
                      </ul>
                      <button type="button" className="mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded" onClick={() => addToArray('scopeOut', '')}>Add Out of Scope</button>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block font-semibold mb-1">d) Timeline & Key Milestones</label>
                  <table className="min-w-full bg-white border rounded">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-2 border">Month</th>
                        <th className="p-2 border">Activities & Milestones</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {form.timeline.map((row, idx) => (
                        <tr key={idx}>
                          <td className="border p-2">
                            <input className="w-full" value={row.month} onChange={e => {
                              const newArr = [...form.timeline]; newArr[idx].month = e.target.value; handleFormChange('timeline', newArr);
                            }} />
                          </td>
                          <td className="border p-2">
                            <input className="w-full" value={row.activities} onChange={e => {
                              const newArr = [...form.timeline]; newArr[idx].activities = e.target.value; handleFormChange('timeline', newArr);
                            }} />
                          </td>
                          <td className="border p-2 text-center">
                            <button type="button" className="text-red-500 px-2" onClick={() => removeFromArray('timeline', idx)}>-</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button type="button" className="mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded" onClick={() => addToArray('timeline', { month: '', activities: '' })}>Add Milestone</button>
                </div>
                <div>
                  <label className="block font-semibold mb-1">e) Key Stakeholders</label>
                  <table className="min-w-full bg-white border rounded">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-2 border">Stakeholder</th>
                        <th className="p-2 border">Role / Contribution</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {form.stakeholders.map((row, idx) => (
                        <tr key={idx}>
                          <td className="border p-2">
                            <input className="w-full" value={row.name} onChange={e => {
                              const newArr = [...form.stakeholders]; newArr[idx].name = e.target.value; handleFormChange('stakeholders', newArr);
                            }} />
                          </td>
                          <td className="border p-2">
                            <input className="w-full" value={row.role} onChange={e => {
                              const newArr = [...form.stakeholders]; newArr[idx].role = e.target.value; handleFormChange('stakeholders', newArr);
                            }} />
                          </td>
                          <td className="border p-2 text-center">
                            <button type="button" className="text-red-500 px-2" onClick={() => removeFromArray('stakeholders', idx)}>-</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button type="button" className="mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded" onClick={() => addToArray('stakeholders', { name: '', role: '' })}>Add Stakeholder</button>
                </div>
                <div>
                  <label className="block font-semibold mb-1">f) Budget Estimate (SGD)</label>
                  <table className="min-w-full bg-white border rounded">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-2 border">Item</th>
                        <th className="p-2 border">Estimated Cost</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {form.budget.map((row, idx) => (
                        <tr key={idx}>
                          <td className="border p-2">
                            <input className="w-full" value={row.item} onChange={e => {
                              const newArr = [...form.budget]; newArr[idx].item = e.target.value; handleFormChange('budget', newArr);
                            }} />
                          </td>
                          <td className="border p-2">
                            <input className="w-full" type="number" value={row.cost} onChange={e => {
                              const newArr = [...form.budget]; newArr[idx].cost = Number(e.target.value); handleFormChange('budget', newArr);
                            }} />
                          </td>
                          <td className="border p-2 text-center">
                            <button type="button" className="text-red-500 px-2" onClick={() => removeFromArray('budget', idx)}>-</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button type="button" className="mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded" onClick={() => addToArray('budget', { item: '', cost: 0 })}>Add Budget Item</button>
                </div>
                <div>
                  <label className="block font-semibold mb-1">g) Risks and Mitigation</label>
                  <table className="min-w-full bg-white border rounded">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-2 border">Risk</th>
                        <th className="p-2 border">Mitigation Strategy</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {form.risks.map((row, idx) => (
                        <tr key={idx}>
                          <td className="border p-2">
                            <input className="w-full" value={row.risk} onChange={e => {
                              const newArr = [...form.risks]; newArr[idx].risk = e.target.value; handleFormChange('risks', newArr);
                            }} />
                          </td>
                          <td className="border p-2">
                            <input className="w-full" value={row.mitigation} onChange={e => {
                              const newArr = [...form.risks]; newArr[idx].mitigation = e.target.value; handleFormChange('risks', newArr);
                            }} />
                          </td>
                          <td className="border p-2 text-center">
                            <button type="button" className="text-red-500 px-2" onClick={() => removeFromArray('risks', idx)}>-</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button type="button" className="mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded" onClick={() => addToArray('risks', { risk: '', mitigation: '' })}>Add Risk</button>
                </div>
                <div>
                  <label className="block font-semibold mb-1">h) Success Metrics</label>
                  <ul className="space-y-2">
                    {form.metrics.map((metric, idx) => (
                      <li key={idx} className="flex gap-2 items-center">
                        <input className="w-full border rounded p-2" value={metric} onChange={e => {
                          const newArr = [...form.metrics]; newArr[idx] = e.target.value; handleFormChange('metrics', newArr);
                        }} />
                        <button type="button" className="text-red-500 px-2" onClick={() => removeFromArray('metrics', idx)}>-</button>
                      </li>
                    ))}
                  </ul>
                  <button type="button" className="mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded" onClick={() => addToArray('metrics', '')}>Add Metric</button>
                </div>
                <div className="flex items-center gap-4">
                  <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded font-semibold">Save</button>
                  {saveMsg && <span className="text-green-700 font-semibold">{saveMsg}</span>}
                </div>
              </form>
            )}
            {mode === 'none' && (
              <div className="text-gray-500">Select an option above to upload or create a project plan.</div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProjectPlan; 