import React from 'react';

export const ToggleRow = ({ label, description }) => (
  <div className="flex items-center justify-between py-2">
    <div>
      <p className="text-xs font-bold text-slate-200">{label}</p>
      {description && <p className="text-[10px] text-slate-500 italic">{description}</p>}
    </div>
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" className="sr-only peer" />
      <div className="w-10 h-5 bg-white/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-emerald-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
    </label>
  </div>
);

export const SettingInput = ({ label, placeholder, type = "text" }) => (
  <div className="space-y-1">
    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">{label}</label>
    <input 
      type={type} 
      placeholder={placeholder}
      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500/50 outline-none transition-all"
    />
  </div>
);