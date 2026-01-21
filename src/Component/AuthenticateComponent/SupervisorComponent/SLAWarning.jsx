import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { useSelector } from "react-redux";

const SLAWarning = ({ title, count, severity, icon: Icon }) => {
  const { Language } = useSelector((state) => state.webState);

  return (
    <div className="bg-white/5 backdrop-blur-md  border border-white/10 p-5 rounded-3xl flex items-center justify-between group hover:bg-white/10 transition-all cursor-pointer">
      <div className="flex w-full flex-col items-center gap-4">
        <div className={`p-3 rounded-2xl transition-transform group-hover:scale-110 duration-300 ${
          severity === 'high' ? 'bg-red-500/20 text-red-500' : 
          severity === 'medium' ? 'bg-amber-500/20 text-amber-500' : 
          'bg-emerald-500/20 text-emerald-500'
        }`}>
      
          {Icon && <Icon size={22} />}
        </div>
        <div className='self-start w-full  flex flex-col'>
          <p className="text-[10px] md:text-xs self-center font-bold text-slate-400 uppercase tracking-widest leading-tight">
            {title}
          </p>
          <h4 className="text-2xl self-center font-black text-white mt-1">{count}</h4>
        </div>
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
        <button className="text-[10px] font-black text-emerald-400 uppercase tracking-widest flex items-center gap-1">
          {Language === "AMH" ? "ይመልከቱ" : "View"} <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default SLAWarning;