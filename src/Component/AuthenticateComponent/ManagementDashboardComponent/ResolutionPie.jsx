import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Resolved', value: 942 },
  { name: 'Pending', value: 242 },
  { name: 'Overdue', value: 100 },
];

const COLORS = ['#10b981', '#3b82f6', '#f43f5e'];

const ResolutionPie = () => (
  <div className="h-[200px] w-full flex items-center justify-center relative">
    <div className="absolute flex flex-col items-center">
      <span className="text-2xl font-black text-white italic">73%</span>
      <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Rate</span>
    </div>
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          innerRadius={65}
          outerRadius={80}
          paddingAngle={8}
          dataKey="value"
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  </div>
);

export default ResolutionPie;