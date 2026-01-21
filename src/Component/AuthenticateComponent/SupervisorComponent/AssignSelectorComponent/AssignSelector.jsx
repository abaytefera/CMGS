import React from 'react';
import { ChevronDown } from 'lucide-react';

const AssignSelector = ({ label, value, options, onChange, icon: Icon }) => (
  <div className="flex flex-col gap-3">
    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">
      {label}
    </label>
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500/60 group-hover:text-emerald-500 transition-colors">
        {Icon && <Icon size={18} />}
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-10 text-white font-bold appearance-none outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 transition-all cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-[#161d27] text-white">
            {opt}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={18} />
    </div>
  </div>
);

export default AssignSelector;