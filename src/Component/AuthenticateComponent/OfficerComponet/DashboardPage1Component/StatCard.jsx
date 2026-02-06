import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const StatCard = ({ title, type, count, icon: Icon, delay = 0 }) => {
  const getTheme = () => {
    // Gradient background for the whole card + text color
    switch (type) {
      case 'assigned':
        return { text: 'text-white', bg: 'bg-gradient-to-r from-purple-400 to-purple-600' };
      case 'in_progress':
        return { text: 'text-white', bg: 'bg-gradient-to-r from-amber-400 to-amber-600' };
      case 'resolved':
        return { text: 'text-white', bg: 'bg-gradient-to-r from-emerald-400 to-emerald-600' };
      case 'rejected':
        return { text: 'text-white', bg: 'bg-gradient-to-r from-red-400 to-red-600' };
      case 'overdue':
        return { text: 'text-white', bg: 'bg-gradient-to-r from-rose-400 to-rose-600' };
      default:
        return { text: 'text-white', bg: 'bg-gradient-to-r from-gray-400 to-gray-600' };
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
        className={`relative p-6 rounded-2xl flex items-center justify-between hover:shadow-lg transition-all ${theme.bg}`}
      >
        <div>
          <p className={`text-xs font-semibold uppercase tracking-wide mb-1 ${theme.text}`}>
            {title}
          </p>
          <h3 className={`text-3xl font-bold ${theme.text}`}>
            {count || 0}
          </h3>
        </div>

        {/* Icon with semi-transparent white background */}
        <div className="p-4 rounded-xl bg-white/20 flex items-center justify-center">
          <Icon size={28} strokeWidth={2.2} className="text-white" />
        </div>
      </motion.div>
    </Link>
  );
};

export default StatCard;