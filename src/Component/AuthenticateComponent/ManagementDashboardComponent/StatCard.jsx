import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({ title, value, trend, icon: Icon, colorClass }) => (
  <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-6 rounded-[2.5rem] relative overflow-hidden group hover:bg-white/[0.08] transition-all">
    <div className={`absolute -right-4 -top-4 w-24 h-24 blur-3xl opacity-20 ${colorClass}`} />
    
    <div className="flex justify-between items-start relative z-10">
      <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 ${colorClass.replace('bg-', 'text-')}`}>
        <Icon size={24} />
      </div>
      <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg ${trend >= 0 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
        {trend >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
        {Math.abs(trend)}%
      </div>
    </div>

    <div className="mt-6 relative z-10">
      <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{title}</p>
      <h3 className="text-3xl font-black text-white mt-1 italic tracking-tighter">{value}</h3>
    </div>
  </div>
);

export default StatCard;