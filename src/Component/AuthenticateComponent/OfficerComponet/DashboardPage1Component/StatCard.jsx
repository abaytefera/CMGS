import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const StatCard = ({ title, type, count, icon: Icon, delay = 0 }) => {
  const getTheme = () => {
    // These cases now match your exact "type" props from the parent
  switch (type) {
  case 'assigned':
    // Matches #9333ea (Purple 600)
    return { text: 'text-purple-600', bg: 'bg-purple-50' };
    
  case 'in_progress':
    // Matches #f59e0b (Amber 500/600)
    return { text: 'text-amber-600', bg: 'bg-amber-50' };
    
  case 'resolved':
    // Matches #10b981 (Emerald 500/600)
    return { text: 'text-emerald-600', bg: 'bg-emerald-50' };
    
  case 'rejected':
    // Matches #ef4444 (Red 500/600)
    return { text: 'text-red-600', bg: 'bg-red-50' };
    
  case 'overdue': 
    // Matches #e11d48 (Rose 600)
    return { text: 'text-rose-600', bg: 'bg-rose-50' };
    
  default:
    return { text: 'text-purple-600', bg: 'bg-purple-50' };
}
  };

  const theme = getTheme();

  return (
    <Link to={`/Complaintlist/officer/${type}`} className="block">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay }}
        whileHover={{ y: -4 }}
        className="relative bg-white border border-gray-200 p-6 rounded-2xl flex items-center justify-between hover:shadow-lg transition-all"
      >
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            {title}
          </p>
          <h3 className="text-3xl font-bold text-gray-900">
            {count || 0}
          </h3>
        </div>

        <div className={`p-4 rounded-xl ${theme.bg} ${theme.text}`}>
          <Icon size={28} strokeWidth={2.2} />
        </div>
      </motion.div>
    </Link>
  );
};

export default StatCard;