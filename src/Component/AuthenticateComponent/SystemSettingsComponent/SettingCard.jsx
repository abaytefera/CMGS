import React from 'react';

const SettingCard = ({ title, icon: Icon, children, colorClass = "border-white/10" }) => (
  <div className={`bg-white/5 backdrop-blur-2xl border ${colorClass} p-8 rounded-[2.5rem] shadow-2xl transition-all hover:bg-white/[0.07]`}>
    <div className="flex items-center gap-3 mb-6">
      <div className={`p-2 rounded-xl bg-white/5 ${colorClass.replace('border', 'text').replace('/10', '')}`}>
        <Icon size={20} />
      </div>
      <h3 className="text-sm font-black text-white uppercase tracking-widest">{title}</h3>
    </div>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);

export default SettingCard;