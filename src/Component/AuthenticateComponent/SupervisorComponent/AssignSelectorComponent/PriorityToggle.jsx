import React from 'react';

const PriorityToggle = ({ selected, onSelect }) => {
  const priorities = [
    { label: 'Low', color: 'bg-slate-700', active: 'bg-blue-500 shadow-blue-500/40' },
    { label: 'Medium', color: 'bg-slate-700', active: 'bg-amber-500 shadow-amber-500/40' },
    { label: 'High', color: 'bg-slate-700', active: 'bg-rose-500 shadow-rose-500/40' }
  ];

  return (
    <div className="flex flex-col gap-3">
      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">
        Set Priority
      </label>
      <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/10 w-fit">
        {priorities.map((p) => (
          <button
            key={p.label}
            onClick={() => onSelect(p.label)}
            className={`px-8 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${
              selected === p.label ? `${p.active} text-white shadow-lg` : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PriorityToggle;