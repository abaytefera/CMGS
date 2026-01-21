import React from 'react';
import { Filter, Calendar, MapPin, Layers } from 'lucide-react';

const ReportFilters = ({ filters, setFilters, departments, locations }) => {
  return (
    <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-6 rounded-[2.5rem] mb-8">
      <div className="flex items-center gap-3 mb-6">
        <Filter className="text-blue-500" size={18} />
        <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Refine Report Data</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Date Filter */}
        <div className="space-y-1">
          <label className="text-[9px] font-black text-slate-500 uppercase ml-1">Time Period</label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
            <select 
              className="w-full bg-[#080d14] border border-white/5 rounded-xl pl-10 pr-4 py-3 text-xs text-white outline-none focus:border-blue-500/50 appearance-none"
              onChange={(e) => setFilters({...filters, period: e.target.value})}
            >
              <option>This Month</option>
              <option>Last Quarter</option>
              <option>Year to Date</option>
              <option>Custom Range</option>
            </select>
          </div>
        </div>

        {/* Category Filter */}
        <div className="space-y-1">
          <label className="text-[9px] font-black text-slate-500 uppercase ml-1">Department</label>
          <div className="relative">
            <Layers className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
            <select className="w-full bg-[#080d14] border border-white/5 rounded-xl pl-10 pr-4 py-3 text-xs text-white outline-none appearance-none">
              <option value="">All Departments</option>
              {departments.map((d, i) => <option key={i} value={d}>{d}</option>)}
            </select>
          </div>
        </div>

        {/* Location Filter */}
        <div className="space-y-1">
          <label className="text-[9px] font-black text-slate-500 uppercase ml-1">Location</label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
            <select className="w-full bg-[#080d14] border border-white/5 rounded-xl pl-10 pr-4 py-3 text-xs text-white outline-none appearance-none">
              <option value="">All Districts</option>
              {locations.map((l, i) => <option key={i} value={l}>{l}</option>)}
            </select>
          </div>
        </div>

        {/* Search Action */}
        <div className="flex items-end">
          <button className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-black text-[10px] uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-blue-500/20">
            Generate Preview
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportFilters;