import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const OfficerOverviewChart = ({ data, t }) => {
  // Keeping your colors exactly as requested
  const chartData = [
    { name: t.statAssigned, value: data?.assigned || 0, color: '#9333ea' },
    { name: t.statProgress, value: data?.inProgress || data?.progress || 0, color: '#f59e0b' },
    { name: t.statResolved, value: data?.resolved || 0, color: '#10b981' },
    { name: t.statRejected, value: data?.rejected || 0, color: '#ef4444' },
  ];

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm h-full">
      <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Workload Distribution</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              dataKey="value"
              // STRUCTURE FIXES:
              innerRadius={0}      // Solid circle, no hole
              outerRadius="90%"    // Sizes it like the image
              paddingAngle={2}     // Adds a small gap between slices
              stroke="#fff"        // White divider color
              strokeWidth={4}      // Thick dividers like the image
              startAngle={90}      // Standard starting position
              endAngle={450}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color} 
                  stroke="#fff" 
                  strokeWidth={4} 
                />
              ))}
            </Pie>
            <Tooltip 
               contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OfficerOverviewChart;