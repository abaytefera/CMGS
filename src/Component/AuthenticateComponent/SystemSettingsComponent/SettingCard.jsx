import React from 'react';

const SettingCard = ({ title, icon: Icon, children, colorClass = "border-slate-200" }) => (
  <div className={`bg-white border ${colorClass} p-8 rounded-[2.5rem] shadow-sm transition-all hover:shadow-md hover:border-emerald-200`}>
    <div className="flex items-center gap-3 mb-6">
      {/* Icon Container with dynamic accent color */}
      <div className={`p-2 rounded-xl bg-slate-50 ${colorClass.replace('border', 'text').replace('/20', '').replace('/10', '')}`}>
        <Icon size={20} strokeWidth={2.5} />
      </div>
      
      {/* Title with Dark Slate text */}
      <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">
        {title}
      </h3>
    </div>

    {/* Content Area */}
    <div className="space-y-4">
      {children}
    </div>
  </div>
);

export default SettingCard;