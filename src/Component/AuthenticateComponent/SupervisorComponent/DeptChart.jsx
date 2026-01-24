import React from 'react';

const DeptChart = () => {
  const departments = [
    { name: 'Industrial', percentage: 40, color: 'bg-emerald-500 shadow-emerald-100' },
    { name: 'Water', percentage: 25, color: 'bg-blue-500 shadow-blue-100' },
    { name: 'Noise', percentage: 20, color: 'bg-amber-500 shadow-amber-100' },
    { name: 'Waste', percentage: 15, color: 'bg-purple-500 shadow-purple-100' },
  ];

  return (
    <div className="bg-white border border-gray-100 p-8 rounded-[2.5rem] shadow-sm">
      <h3 className="text-gray-900 font-black text-[10px] mb-8 uppercase tracking-[0.2em]">
        Complaints by Dept.
      </h3>
      
      <div className="space-y-6">
        {departments.map((dept) => (
          <div key={dept.name} className="group">
            <div className="flex justify-between items-end text-[10px] mb-2">
              <span className="text-gray-500 font-bold uppercase tracking-wider group-hover:text-gray-900 transition-colors">
                {dept.name}
              </span>
              <span className="text-gray-900 font-black tabular-nums">
                {dept.percentage}%
              </span>
            </div>
            
            <div className="h-2.5 w-full bg-gray-50 rounded-full overflow-hidden border border-gray-100/50">
              <div 
                className={`h-full ${dept.color} rounded-full transition-all duration-1000 ease-out shadow-sm`} 
                style={{ width: `${dept.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Optional Footer Metric */}
      <div className="mt-8 pt-6 border-t border-gray-50">
        <button className="text-[9px] font-black text-emerald-600 uppercase tracking-widest hover:underline">
          Download Analytics →
        </button>
      </div>
    </div>
  );
};

export default DeptChart;