import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const OfficerOverviewChart = ({ data, t }) => {
  // Mapping API data to Recharts format
  const chartData = [
    { name: t.statAssigned, value: data?.assigned || 0, color: '#3b82f6' }, // Blue
    { name: t.statProgress, value: data?.inProgress || 0, color: '#f59e0b' }, // Amber
    { name: t.statResolved, value: data?.resolved || 0, color: '#10b981' }, // Emerald
    { name: t.statRejected, value: data?.rejected || 0, color: '#ef4444' }, // Red
  ];

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm h-full">
      <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Workload Distribution</h3>
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
               contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            />
            <Legend verticalAlign="bottom" height={36}/>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OfficerOverviewChart;