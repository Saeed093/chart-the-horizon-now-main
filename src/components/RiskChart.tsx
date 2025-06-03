import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const RiskChart = ({
  data = [
    { name: 'Resolved', value: 60, color: '#22c55e' },
    { name: 'In progress', value: 25, color: '#3b82f6' },
    { name: 'Pending', value: 15, color: '#ef4444' },
  ],
  plan,
  progress,
}) => {
  // Generate risk data from progress
  const generateRiskData = () => {
    if (!progress?.risks) return data;
    
    // Count risks by status
    const statusCounts = progress.risks.reduce(
      (acc, risk) => {
        acc[risk.status] = (acc[risk.status] || 0) + 1;
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

  const displayData = generateRiskData();
  const totalRisks = displayData.reduce((sum, item) => sum + item.value, 0);

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.value / totalRisks) * 100).toFixed(1);
      
      return (
        <div className="bg-white p-3 border rounded shadow-sm">
          <p className="font-medium">{data.name}</p>
          <p className="text-gray-600">{data.value} risks</p>
          <p className="text-gray-600">{percentage}% of total</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Risk Status</h3>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={displayData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {displayData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              iconType="circle"
              formatter={(value, entry) => (
                <span style={{ color: entry.color }}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Risk Summary */}
      <div className="mt-4 space-y-2">
        {displayData.map((item, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-gray-600">{item.name}</span>
            </div>
            <span className="font-medium">{item.value}</span>
          </div>
        ))}
        <div className="pt-2 border-t">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Total Risks</span>
            <span className="font-medium">{totalRisks}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskChart;
