import React from 'react';
import { User, Phone, Mail, Building } from 'lucide-react';

const ProfileField = ({ label, value, icon: Icon, isEditing, onChange, type = "text" }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">{label}</label>
    <div className="relative group">
      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-blue-500">
        <Icon size={18} />
      </div>
      <input
        type={type}
        value={value}
        disabled={!isEditing}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-5 py-4 text-sm transition-all outline-none 
          ${isEditing ? 'border-blue-500/50 bg-white/10 text-white' : 'text-slate-400 opacity-80 pointer-events-none'}`}
      />
    </div>
  </div>
);

export default ProfileField;