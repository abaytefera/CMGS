import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({ title, value, trend, icon: Icon, colorClass,onClick }) => (
  <div 
  onClick={onClick}
   className="bg-white border border-slate-200 p-6 rounded-[2.5rem] relative overflow-hidden group hover:shadow-md transition-all">
    {/* Subtle glow effect adjusted for white background */}
    <div className={`absolute -right-4 -top-4 w-24 h-24 blur-3xl opacity-10 ${colorClass}`} />
    
    <div className="flex justify-between items-start relative z-10">
      {/* Icon container with soft background */}
      <div className={`p-3 rounded-2xl bg-slate-50 border border-slate-100 ${colorClass.replace('bg-', 'text-')}`}>
        <Icon size={24} />
      </div>
      
      {/* Trend Badge */}
      <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg ${
        trend >= 0 
          ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
          : 'bg-rose-50 text-rose-600 border border-rose-100'
      }`}>
        {trend >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
        {Math.abs(trend)}%
      </div>
    </div>

    <div className="mt-6 relative z-10">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
        {title}
      </p>
      {/* Changed text-white to text-slate-900 */}
      <h3 className="text-3xl font-black text-slate-900 mt-1 italic tracking-tighter">
        {value}
      </h3>
    </div>
  </div>
);

export default StatCard;