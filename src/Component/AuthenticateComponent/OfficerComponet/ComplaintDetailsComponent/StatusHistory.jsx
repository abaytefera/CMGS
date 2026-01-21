import React from 'react';

const StatusHistory = ({ history }) => (
  <div className="space-y-6">
    {history.map((item, index) => (
      <div key={index} className="flex gap-4 relative">
        {index !== history.length - 1 && (
          <div className="absolute left-[7px] top-5 w-[2px] h-full bg-white/10" />
        )}
        <div className={`w-4 h-4 rounded-full mt-1 z-10 ${item.current ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'bg-white/20'}`} />
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <p className="text-white font-medium text-sm">{item.status}</p>
            <span className="text-slate-500 text-[10px]">{item.date}</span>
          </div>
          <p className="text-slate-400 text-xs mt-1">{item.note}</p>
        </div>
      </div>
    ))}
  </div>
);

export default StatusHistory;