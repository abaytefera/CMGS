import React from 'react';
import { Filter, Calendar, Layers } from 'lucide-react';

const ReportFilters = ({ filters, setFilters, departments }) => {
  return (
    <div className="bg-white border border-slate-200 p-6 rounded-[2.5rem] mb-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <Filter className="text-blue-600" size={18} />
        <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-[0.3em]">Refine Report Data</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Time Period */}
        <div className="space-y-1">
          <label className="text-[9px] font-black text-slate-500 uppercase ml-1">Time Period</label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <select 
              value={filters.period}
              onChange={(e) => setFilters({...filters, period: e.target.value})}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-xs text-slate-900 outline-none focus:border-blue-500/50 appearance-none font-bold"
            >
              <option value="Today">Today</option>
              <option value="This Week">This Week</option>
              <option value="This Month">This Month</option>
              <option value="This Year">This Year</option>
            </select>
          </div>
        </div>

        {/* Department (Dynamic) */}
        <div className="space-y-1">
          <label className="text-[9px] font-black text-slate-500 uppercase ml-1">Department</label>
          <div className="relative">
            <Layers className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <select 
              value={filters.department}
              onChange={(e) => setFilters({...filters, department: e.target.value})}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-xs text-slate-900 outline-none focus:border-blue-500/50 appearance-none font-bold"
            >
              <option value="">All Departments</option>
              {departments.map((d, i) => (
                <option key={i} value={d.name || d}>{d.name || d}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Button */}
        <div className="flex items-end">
          <button className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-[10px] tracking-widest rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-95">
           Filter Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportFilters;