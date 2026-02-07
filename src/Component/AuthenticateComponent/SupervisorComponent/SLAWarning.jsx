import React from 'react';
import { useSelector } from "react-redux";

const SLAWarning = ({ title, count, icon: Icon }) => {
  const { Language } = useSelector((state) => state.webState);

  const gradients = {
    total: 'from-blue-500 to-indigo-600',
    'not assigned': 'from-purple-500 to-fuchsia-600',
    resolved: 'from-emerald-500 to-teal-600',
    rejected: 'from-rose-500 to-pink-600',
    'active officers': 'from-cyan-500 to-sky-600',
  };

  const gradient = gradients[title.toLowerCase()] || 'from-gray-400 to-gray-600';

  return (
    <div
      className={`
        relative group p-6 rounded-[2.5rem]
        bg-gradient-to-br ${gradient}
        text-white overflow-hidden
        shadow-lg hover:shadow-2xl
        transition-all duration-500 hover:-translate-y-1
      `}
    >
      {/* Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-white/10 blur-2xl transition" />

      <div className="relative z-10 flex flex-col items-center gap-5">
        <div className="p-4 rounded-2xl bg-white/15 group-hover:scale-110 transition">
          {Icon && <Icon size={26} strokeWidth={2.5} />}
        </div>

        <div className="text-center">
          <p className="text-[10px] uppercase tracking-[0.25em] font-black text-white/80">
            {title}
          </p>
          <h4 className="text-4xl font-black mt-1">
            {count}
          </h4>
        </div>

        <span className="text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition">
          {Language === "AMH" ? "ይመልከቱ" : "View Details"}
        </span>
      </div>
    </div>
  );
};

export default SLAWarning;