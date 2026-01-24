import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useSelector } from "react-redux";

const SLAWarning = ({ title, count, severity, icon: Icon }) => {
  const { Language } = useSelector((state) => state.webState);

  // Configuration for severity colors in White Theme
  const severityStyles = {
    high: {
      bg: 'bg-rose-50',
      icon: 'text-rose-500',
      border: 'group-hover:border-rose-200'
    },
    medium: {
      bg: 'bg-amber-50',
      icon: 'text-amber-500',
      border: 'group-hover:border-amber-200'
    },
    low: {
      bg: 'bg-emerald-50',
      icon: 'text-emerald-500',
      border: 'group-hover:border-emerald-200'
    }
  };

  const style = severityStyles[severity] || severityStyles.low;

  return (
    <div className={`bg-white border border-gray-100 p-6 rounded-[2rem] flex flex-col items-center justify-between group hover:shadow-xl hover:shadow-gray-100 transition-all duration-300 cursor-pointer ${style.border}`}>
      
      <div className="flex flex-col items-center gap-4 w-full">
        {/* Icon Badge */}
        <div className={`p-4 rounded-2xl transition-transform group-hover:scale-110 duration-500 ${style.bg} ${style.icon}`}>
          {Icon && <Icon size={24} strokeWidth={2.5} />}
        </div>

        {/* Text Content */}
        <div className="flex flex-col items-center text-center">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] leading-tight mb-1">
            {title}
          </p>
          <h4 className="text-3xl font-black text-gray-900 tracking-tighter">
            {count}
          </h4>
        </div>
      </div>

      {/* Hover Reveal Action */}
      <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 duration-300">
        <div className="text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-1">
          {Language === "AMH" ? "ይመልከቱ" : "View Details"} 
          <ArrowRight size={14} />
        </div>
      </div>
    </div>
  );
};

export default SLAWarning;