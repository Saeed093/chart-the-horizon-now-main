import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const BudgetChart = ({
  data = [
    { name: 'Software Licences', Estimated: 4.2, Consumed: 2.3 },
    { name: 'Hardware', Estimated: 2.5, Consumed: 4.3 },
    { name: 'Content', Estimated: 3.5, Consumed: 1.8 },
    { name: 'Marketing', Estimated: 4.5, Consumed: 2.8 },
  ],
  plan,
  progress,
}) => {
  // Generate budget data from plan and progress
  const generateBudgetData = () => {
    if (!plan?.budget) return data;
    return plan.budget.map((item, idx) => ({
      name: item.item,
      Estimated: item.cost,
      Consumed: progress?.budget?.[idx]?.actual || 0,
      variance: progress?.budget?.[idx]?.actual 
        ? ((progress.budget[idx].actual - item.cost) / item.cost * 100).toFixed(1)
        : 0,
    }));
  };

  const displayData = generateBudgetData();

  // Custom tooltip to show variance
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const estimated = payload[0].value;
      const consumed = payload[1].value;
      const variance = ((consumed - estimated) / estimated * 100).toFixed(1);
      
      return (
        <div className="bg-white p-3 border rounded shadow-sm">
          <p className="font-medium">{label}</p>
          <p className="text-blue-600">Planned: ${estimated.toLocaleString()}</p>
          <p className="text-purple-600">Actual: ${consumed.toLocaleString()}</p>
          <p className={`${Number(variance) > 0 ? 'text-red-600' : 'text-green-600'}`}>
            Variance: {variance}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Budget Breakdown</h3>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={displayData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              domain={[0, 'auto']}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip content={<CustomTooltip active={undefined} payload={undefined} label={undefined} />} />
            <Legend />
            <Bar dataKey="Estimated" fill="#3b82f6" radius={[2, 2, 0, 0]} name="Planned Budget" />
            <Bar dataKey="Consumed" fill="#a855f7" radius={[2, 2, 0, 0]} name="Actual Spent" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Budget Summary */}
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-sm text-gray-600">Total Planned</p>
          <p className="text-lg font-bold text-blue-600">
            ${displayData.reduce((sum, item) => sum + item.Estimated, 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-sm text-gray-600">Total Spent</p>
          <p className="text-lg font-bold text-purple-600">
            ${displayData.reduce((sum, item) => sum + item.Consumed, 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-sm text-gray-600">Overall Variance</p>
          <p className={`text-lg font-bold ${
            displayData.reduce((sum, item) => sum + item.Consumed - item.Estimated, 0) > 0
              ? 'text-red-600'
              : 'text-green-600'
          }`}>
            {displayData.reduce((sum, item) => sum + Number(item.variance), 0).toFixed(1)}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default BudgetChart;
