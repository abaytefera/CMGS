import React from 'react';
import { Clock, CheckCircle2 } from "lucide-react";

const StatusHistory = ({ history }) => {
  // 1. Safety check for the history array itself
  if (!history || history.length === 0) {
    return <p className="text-[10px] font-bold text-slate-400 uppercase text-center py-4 tracking-widest">No history recorded</p>;
  }

  return (
    <div className="space-y-6">
      {history.map((log, index) => (
        <div key={log.id || index} className="relative flex gap-4">
          {/* Connector Line */}
          {index !== history.length - 1 && (
            <div className="absolute left-[9px] top-6 w-[2px] h-[calc(100%+12px)] bg-slate-100" />
          )}
          
          {/* Icon/Dot */}
          <div className={`relative z-10 w-5 h-5 rounded-full flex items-center justify-center border-2 bg-white ${index === 0 ? 'border-emerald-500' : 'border-slate-200'}`}>
            <div className={`w-1.5 h-1.5 rounded-full ${index === 0 ? 'bg-emerald-500' : 'bg-slate-300'}`} />
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-tight">
        
                {(log.status || "UNKNOWN").replace('_', ' ')}
              </h4>
              <span className="text-[9px] font-bold text-slate-400 uppercase">
          
                {log.createdAt ? new Date(log.createdAt).toLocaleDateString() : "N/A"}
              </span>
            </div>
            {log.comment && (
              <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
                {log.comment}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatusHistory;