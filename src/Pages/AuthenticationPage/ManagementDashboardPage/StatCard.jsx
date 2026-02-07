import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, gradient, onClick, wave = 'up', delay = 0 }) => {
  // Wave effect: up = move up, down = move down
  const yAnim = wave === 'up' ? [0, -6, 0] : [0, 6, 0];

  return (
    <div onClick={onClick}>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ y: yAnim }} // only y moves, opacity stays 1
        transition={{ duration: 1.5, delay, repeat: Infinity, repeatType: 'loop' }}
        className={`relative p-6 rounded-2xl flex flex-col items-center cursor-pointer shadow-lg hover:shadow-xl transition-all ${gradient}`}
      >
        {/* Icon */}
        <div className="p-4 rounded-2xl flex items-center justify-center mb-4">
          {Icon && <Icon size={28} className="text-white" />}
        </div>

        {/* Title & Value */}
        <p className="text-[10px] font-black text-white uppercase tracking-widest mb-1">
          {title}
        </p>
        <h3 className="text-3xl font-black text-white">{value}</h3>

        {/* Live Dot + Arrow */}
        <div className="absolute bottom-4 right-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <ArrowRight size={16} className="text-white" />
        </div>
      </motion.div>
    </div>
  );
};

export default StatCard;