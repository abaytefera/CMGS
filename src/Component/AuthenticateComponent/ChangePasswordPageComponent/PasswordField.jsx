import React, { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';

const PasswordField = ({ label, value, onChange, placeholder, disabled }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-1">
      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
        {label}
      </label>

      <div className="relative group">
        <Lock
          size={18}
          className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors"
        />

        <input
          type={show ? 'text' : 'password'}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="
            w-full
            bg-white
            border border-slate-200
            rounded-2xl
            pl-14 pr-12 py-4
            text-sm text-slate-900
            placeholder-slate-400
            focus:border-emerald-500
            focus:ring-2 focus:ring-emerald-500/20
            outline-none
            transition-all
          "
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600 transition-colors"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
};

export default PasswordField;
