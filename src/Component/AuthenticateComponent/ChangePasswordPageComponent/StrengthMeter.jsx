import React from 'react';

const StrengthMeter = ({ strength }) => {
  // strength is a value 0-3
  const colors = ['bg-rose-500', 'bg-amber-500', 'bg-blue-500', 'bg-emerald-500'];
  const labels = ['Weak', 'Fair', 'Good', 'Strong'];

  return (
    <div className="mt-4 space-y-2">
      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
        <span className="text-slate-500">Security Level</span>
        <span className={strength >= 2 ? 'text-emerald-500' : 'text-rose-500'}>
          {labels[strength]}
        </span>
      </div>
      <div className="flex gap-2 h-1.5">
        {[0, 1, 2, 3].map((step) => (
          <div
            key={step}
            className={`flex-1 rounded-full transition-all duration-500 ${
              step <= strength ? colors[strength] : 'bg-white/10'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default StrengthMeter;