import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';

const EfficiencyChart = ({ percentage = 92.4 }) => {
  const data = [
    { value: percentage },
    { value: 100 - percentage },
  ];


  const COLORS = ['#10b981', '#f1f5f9']; 

  return (
    <div className="h-[220px] w-full relative group bg-white">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="80%" 
            startAngle={180}
            endAngle={0}
            innerRadius={75}
            outerRadius={100}
            paddingAngle={0}
            dataKey="value"
            stroke="none"
            
            cornerRadius={40}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index]} 
                className="transition-all duration-1000 ease-out"
              />
            ))}
            
       
            <Label
              value={`${percentage}%`}
              position="centerBottom"
              fill="#0f172a"
              dy={-20} 
              style={{
                fontSize: '36px',
                fontWeight: '900',
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '-0.05em'
              }}
            />
          </Pie>
        </PieChart>
      </ResponsiveContainer>

    
      <div className="absolute bottom-6 w-full flex justify-between px-8 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
        <div className="flex flex-col items-center">
          <span className="h-1 w-1 bg-gray-200 rounded-full mb-1"></span>
          <span>0%</span>
        </div>
        
        <div className="flex flex-col items-center">
          <span className="text-emerald-600 font-black">Target: 95%</span>
        </div>

        <div className="flex flex-col items-center">
          <span className="h-1 w-1 bg-gray-200 rounded-full mb-1"></span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
};

export default EfficiencyChart;