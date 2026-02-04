import React from 'react';
import { Clock } from "lucide-react";

const StatusHistory = ({ history = [] }) => {

  if (!history.length) {
    return (
      <p className="text-[10px] font-bold text-slate-400 uppercase text-center py-4 tracking-widest">
        No history recorded
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {history.map((log, index) => {
        const status = log.toStatus || log.status || "UNKNOWN";

        return (
          <div key={log.id || index} className="relative flex gap-4">

            {/* Connector */}
            {index !== history.length - 1 && (
              <div className="absolute left-[9px] top-6 w-[2px] h-[calc(100%+12px)] bg-slate-100" />
            )}

            {/* Dot */}
            <div className={`relative z-10 w-5 h-5 rounded-full flex items-center justify-center border-2 bg-white 
              ${index === 0 ? 'border-emerald-500' : 'border-slate-200'}`}
            >
              <div className={`w-1.5 h-1.5 rounded-full 
                ${index === 0 ? 'bg-emerald-500' : 'bg-slate-300'}`}
              />
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-tight">
                  {status.replace(/_/g, ' ')}
                </h4>

                <span className="text-[9px] font-bold text-slate-400 uppercase flex items-center gap-1">
                  <Clock size={10} />
                  {log.createdAt
                    ? new Date(log.createdAt).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>

              {log.comment && (
                <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
                  {log.comment}
                </p>
              )}
            </div>

          </div>
        );
      })}
    </div>
  );
};

export default StatusHistory;
