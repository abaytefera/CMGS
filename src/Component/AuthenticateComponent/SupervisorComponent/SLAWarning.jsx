import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useSelector } from "react-redux";

const SLAWarning = ({ title, count, severity, icon: Icon }) => {
  const { Language } = useSelector((state) => state.webState);

  // --- Gradient backgrounds for specific cards ---
  const gradientStyles = {
    'total': 'bg-gradient-to-r from-blue-400 to-blue-600 text-white',
    'not assigned': 'bg-gradient-to-r from-purple-400 to-purple-600 text-white',
    'resolved': 'bg-gradient-to-r from-emerald-400 to-emerald-600 text-white',
    'rejected': 'bg-gradient-to-r from-rose-400 to-rose-600 text-white',
    'active officers': 'bg-gradient-to-r from-teal-400 to-teal-600 text-white'
  };

  // Default white card style (in case any new card is added)
  const defaultStyle = 'bg-white border border-gray-100 text-gray-900';

  // Determine which style to use
  const cardStyle = gradientStyles[title.toLowerCase()] || defaultStyle;

  // Icon color for gradient cards
  const iconColor = gradientStyles[title.toLowerCase()] ? 'text-white' :
                    severity === 'high' ? 'text-rose-500' :
                    severity === 'medium' ? 'text-amber-500' :
                    'text-emerald-500';

  return (
    <div className={`p-6 rounded-[2rem] flex flex-col items-center justify-between group hover:shadow-xl hover:shadow-gray-100 transition-all duration-300 cursor-pointer ${cardStyle}`}>
      
      <div className="flex flex-col items-center gap-4 w-full">
        {/* Icon Badge */}
        <div className={`p-4 rounded-2xl transition-transform group-hover:scale-110 duration-500 ${iconColor}`}>
          {Icon && <Icon size={24} strokeWidth={2.5} />}
        </div>

        {/* Text Content */}
        <div className="flex flex-col items-center text-center">
          <p className={`text-[10px] font-black uppercase tracking-[0.2em] leading-tight mb-1 ${gradientStyles[title.toLowerCase()] ? 'text-white/90' : 'text-gray-400'}`}>
            {title}
          </p>
          <h4 className={`text-3xl font-black tracking-tighter ${gradientStyles[title.toLowerCase()] ? 'text-white' : 'text-gray-900'}`}>
            {count}
          </h4>
        </div>
      </div>

      {/* Hover Reveal Action */}
      <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 duration-300">
        <div className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-1 ${gradientStyles[title.toLowerCase()] ? 'text-white/80' : 'text-emerald-600'}`}>
          {Language === "AMH" ? "ይመልከቱ" : "View Details"} 
          <ArrowRight size={14} />
        </div>
      </div>
    </div>
  );
};

export default SLAWarning;