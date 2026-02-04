import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const OfficerOverviewChart = ({ data, t }) => {
  const chartData = [
    { name: t.statAssigned, value: data?.assigned || 0, color: '#9333ea' },
    { name: t.statProgress, value: data?.inProgress || data?.progress || 0, color: '#f59e0b' },
    { name: t.statResolved, value: data?.resolved || 0, color: '#10b981' },
    { name: t.statRejected, value: data?.rejected || 0, color: '#ef4444' },
    { name: t.statOverdue, value: data?.overdue || 0, color: '#e11d48' }, 
  ];

  // Logic to calculate and format the label
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    // Only show label if the percentage is greater than 5% to avoid overlapping
    if (percent < 0.05) return null;

    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor="middle" 
        dominantBaseline="central" 
        className="text-[10px] font-black"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

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
              innerRadius={0}      
              outerRadius="90%"    
              paddingAngle={2}     
              stroke="#fff"        
              strokeWidth={4}      
              startAngle={90}      
              endAngle={450}
              labelLine={false}
              label={renderCustomizedLabel} // Added the label function here
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color} 
                />
              ))}
            </Pie>
            <Tooltip 
               contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
               // Shows percentage in the tooltip too
               formatter={(value, name, props) => {
                 const total = chartData.reduce((acc, curr) => acc + curr.value, 0);
                 const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                 return [`${value} (${percentage}%)`, name];
               }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OfficerOverviewChart;