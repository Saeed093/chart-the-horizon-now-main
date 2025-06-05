import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { db } from '../lib/db';

const ProjectPlan = () => {
  const [mode, setMode] = useState('none'); // 'none', 'upload', 'create'
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(true);
  const [saveMsg, setSaveMsg] = useState('');
  const [form, setForm] = useState({
    title: '',
    duration: '',
    owner: '',
    manager: '',
    summary: '',
    objectives: [''],
    scopeIn: [''],
    scopeOut: [''],
    timeline: [{ month: '', activities: '' }],
    stakeholders: [{ name: '', role: '' }],
    budget: [{ item: '', cost: 0 }],
    risks: [{ risk: '', mitigation: '' }],
    metrics: [''],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const record = await db.projectPlan.get(1);
      if (record && record.data) {
        setForm(record.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const addToArray = (field, defaultValue) => {
    setForm({ ...form, [field]: [...form[field], defaultValue] });
  };

  const removeFromArray = (field, idx) => {
    setForm({ ...form, [field]: form[field].filter((_: any, i: number) => i !== idx) });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await db.projectPlan.put({ id: 1, data: form });
      setSaveMsg('Saved successfully!');
      setTimeout(() => setSaveMsg(''), 3000);
    } catch (error) {
      console.error('Error saving data:', error);
      setSaveMsg('Error saving data');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed inset-y-0 left-0 w-64 z-30">
        <Sidebar />
      </div>
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