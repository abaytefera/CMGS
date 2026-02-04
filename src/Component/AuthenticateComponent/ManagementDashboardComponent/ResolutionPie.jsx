import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const ResolutionPie = ({ data }) => {
  // 1. Prepare data (Removed Overdue as requested)
  const chartData = [
    { name: 'Resolved', value: data?.resolved || 0, color: '#10b981' },
    { name: 'Pending', value: data?.pending || 0, color: '#3b82f6' },
  ];

  // 2. Custom label logic to render percentage inside the slices
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    // Positioning the text in the center of each slice
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
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
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel} // Percentage labels inside
            outerRadius="90%" // Slightly reduced to prevent clipping
            innerRadius={0} // 0 makes it a SOLID pie
            dataKey="value"
            paddingAngle={2} // Tiny gap for a sharp look
            animationBegin={0}
            animationDuration={1000}
          >
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color} 
                stroke="#fff" 
                strokeWidth={2} 
              />
            ))}
          </Pie>
          
          <Tooltip 
            contentStyle={{ 
              borderRadius: '15px', 
              border: 'none', 
              boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
              fontSize: '12px',
              fontWeight: 'bold'
            }}
            formatter={(value, name) => [`${value} Records`, name]}
          />
          
          <Legend 
            verticalAlign="bottom" 
            iconType="circle"
            wrapperStyle={{ 
              paddingTop: '20px', 
              textTransform: 'uppercase', 
              fontSize: '10px', 
              fontWeight: '900' 
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ResolutionPie;