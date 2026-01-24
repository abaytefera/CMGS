import React from 'react';

export const ToggleRow = ({ label, description, active, onClick }) => (
  <div className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
    <div>
      <p className="text-xs font-bold text-slate-700 uppercase tracking-tight">{label}</p>
      {description && <p className="text-[10px] text-slate-400 italic mt-0.5">{description}</p>}
    </div>
    <label className="relative inline-flex items-center cursor-pointer">
      <input 
        type="checkbox" 
        className="sr-only peer" 
        checked={active} 
        onChange={onClick} 
      />
      {/* Updated background from white/10 to slate-200 */}
      <div className="w-10 h-5 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-emerald-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all shadow-sm"></div>
    </label>
  </div>
);

export const SettingInput = ({ label, value, onChange, placeholder, type = "text", disabled = false }) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
      {label}
    </label>
    <input 
      type={type} 
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      /* Updated from bg-white/5 to bg-slate-50 and text-white to text-slate-800 */
      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-300 focus:bg-white focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all disabled:opacity-50"
    />
  </div>
);