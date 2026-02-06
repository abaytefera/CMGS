import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const ResolutionPie = ({ data }) => {
  // data should be like:
  // [
  //   { name: 'Resolved', value: 10, colorStart: '#34d399', colorEnd: '#10b981' },
  //   ...
  // ]

  // Label inside slice
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
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
        className="text-[12px] font-black italic"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <defs>
            {data.map((entry, index) => (
              <linearGradient key={index} id={`grad-${index}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={entry.colorStart} />
                <stop offset="100%" stopColor={entry.colorEnd} />
              </linearGradient>
            ))}
          </defs>

          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={0}
            outerRadius="90%"
            paddingAngle={2}
            labelLine={false}
            label={renderCustomizedLabel}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={`url(#grad-${index})`} stroke="#fff" strokeWidth={2} />
            ))}
          </Pie>

          <Tooltip 
            contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}
            formatter={(value, name) => [`${value} Records`, name]}
          />

          <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ paddingTop: '20px', textTransform: 'uppercase', fontSize: '10px', fontWeight: '900' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ResolutionPie;