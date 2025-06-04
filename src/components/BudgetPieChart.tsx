import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#3b82f6', '#e5e7eb']; // blue, gray

const BudgetPieChart = ({ total = 10, consumed = 6 }) => {
  const data = [
    { name: 'Consumed', value: consumed },
    { name: 'Remaining', value: Math.max(total - consumed, 0) },
  ];
  const percent = total > 0 ? Math.round((consumed / total) * 100) : 0;

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <div className="font-bold text-lg mb-2">Budget Consumed</div>
      <div className="relative flex items-center justify-center" style={{ width: 180, height: 180 }}>
        <ResponsiveContainer width={180} height={180}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {data.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        {/* Centered percent label */}
        <div className="absolute top-1/2 left-1/2 flex flex-col items-center justify-center" style={{ transform: 'translate(-50%, -50%)' }}>
          <span className="text-2xl font-bold text-blue-600">{percent}%</span>
          <span className="text-xs text-gray-500">Consumed</span>
        </div>
      </div>
      <div className="mt-4 flex flex-col items-center">
        <div className="flex items-center mb-1">
          <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ background: COLORS[0] }}></span>
          <span className="text-xs text-gray-700">Consumed</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ background: COLORS[1] }}></span>
          <span className="text-xs text-gray-700">Remaining</span>
        </div>
      </div>
    </div>
  );
};

export default BudgetPieChart; 