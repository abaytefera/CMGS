import React from 'react';

const InfoCard = ({ title, children, className = "" }) => (
  <div className={`bg-white backdrop-blur-md border border-white/10 rounded-3xl p-6  ${className}`}>
    <h3 className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-4">{title}</h3>
    {children}
  </div>
);

export default InfoCard;