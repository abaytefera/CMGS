import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';

const EfficiencyChart = ({ percentage = 92.4 }) => {

  const data = [
    { value: percentage },
    { value: 100 - percentage },
  ];

  // Colors: Emerald for the filled part, Dark Slate for the track
  const COLORS = ['#10b981', '#1e293b'];

  return (
    <div className="h-[220px] w-full relative group">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="80%" // Move center down for semi-circle
            startAngle={180}
            endAngle={0}
            innerRadius={75}
            outerRadius={100}
            paddingAngle={0}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index]} 
                className="transition-all duration-700"
              />
            ))}
            {/* Centered Percentage Text */}
            <Label
              value={`${percentage}%`}
              position="centerBottom"
              fill="#ffffff"
              style={{
                fontSize: '32px',
                fontWeight: '900',
                fontFamily: 'Inter, sans-serif',
              }}
            />
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* Floating Info Labels */}
      <div className="absolute bottom-4 w-full flex justify-between px-10 text-[10px] font-black uppercase tracking-widest text-slate-500">
        <span>0%</span>
        <span className="text-emerald-500">Target: 95%</span>
        <span>100%</span>
      </div>
    </div>
  );
};

export default EfficiencyChart;