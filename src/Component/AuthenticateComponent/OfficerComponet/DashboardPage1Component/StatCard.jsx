import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const StatCard = ({ title, type, count, icon: Icon, delay = 0 }) => {
  // Logic to determine color theme based on the tracking type
  const getTheme = () => {
    switch (type) {
      case 'Assigned': 
        return { text: 'text-emerald-500', bg: 'bg-emerald-500/10', glow: 'bg-emerald-500', shadow: 'shadow-emerald-500/10' };
      case 'Progress': 
        return { text: 'text-amber-500', bg: 'bg-amber-500/10', glow: 'bg-amber-500', shadow: 'shadow-amber-500/10' };
      case 'Overdue': 
        return { text: 'text-red-500', bg: 'bg-red-500/10', glow: 'bg-red-500', shadow: 'shadow-red-500/10' };
      case 'Resolved': 
        return { text: 'text-blue-500', bg: 'bg-blue-500/10', glow: 'bg-blue-500', shadow: 'shadow-blue-500/10' };
      case 'Rejected': 
        return { text: 'text-slate-400', bg: 'bg-slate-400/10', glow: 'bg-slate-400', shadow: 'shadow-slate-400/10' };
      default: 
        return { text: 'text-emerald-500', bg: 'bg-emerald-500/10', glow: 'bg-emerald-500', shadow: 'shadow-emerald-500/10' };
    }
  };

  const theme = getTheme();

  return (
    <Link to={`/Complaintlist/${type}`} className="block">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ 
          duration: 0.5, 
          delay: delay, 
          ease: [0.23, 1, 0.32, 1] 
        }}
        whileHover={{ 
          y: -8, 
          scale: 1.02,
          rotateX: 3, 
          rotateY: -3,
        }}
        style={{ perspective: 1000 }}
        className="relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] flex items-center justify-between cursor-pointer group transition-all hover:border-white/20"
      >
        {/* Neon Background Glow on Hover */}
        <div className={`absolute -right-8 -top-8 w-32 h-32 rounded-full blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 ${theme.glow}`} />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${theme.glow}`} />
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.25em]">{title}</p>
          </div>
          
          <motion.h3 
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            className="text-3xl font-black text-white tracking-tighter"
          >
            {count}
          </motion.h3>
        </div>

        {/* Floating Icon Box */}
        <div className={`p-5 rounded-2xl border border-white/5 shadow-2xl transition-all duration-500 group-hover:rotate-[15deg] group-hover:scale-110 ${theme.bg} ${theme.text}`}>
          <Icon size={32} strokeWidth={2.5} />
        </div>

        {/* Subtle bottom accent line */}
        <div className={`absolute bottom-0 left-10 right-10 h-[1px] opacity-0 group-hover:opacity-50 transition-opacity duration-500 ${theme.glow}`} />
      </motion.div>
    </Link>
  );
};

export default StatCard;