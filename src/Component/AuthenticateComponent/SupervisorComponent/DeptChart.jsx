import React from 'react';

const DeptChart = () => {
  const departments = [
    { name: 'Industrial', percentage: 40, color: 'bg-emerald-500' },
    { name: 'Water', percentage: 25, color: 'bg-blue-500' },
    { name: 'Noise', percentage: 20, color: 'bg-amber-500' },
    { name: 'Waste', percentage: 15, color: 'bg-purple-500' },
  ];

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-[2.5rem]">
      <h3 className="text-white font-bold text-sm mb-6 uppercase tracking-widest">Complaints by Dept.</h3>
      <div className="space-y-4">
        {departments.map((dept) => (
          <div key={dept.name}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300 font-medium">{dept.name}</span>
              <span className="text-white font-bold">{dept.percentage}%</span>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
              <div 
                className={`h-full ${dept.color} rounded-full transition-all duration-1000`} 
                style={{ width: `${dept.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeptChart;