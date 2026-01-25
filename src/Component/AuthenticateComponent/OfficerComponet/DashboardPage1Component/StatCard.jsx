import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const StatCard = ({ title, type, count, icon: Icon, delay = 0 }) => {
  const getTheme = () => {
    switch (type) {
      case 'Assigned':
        return { text: 'text-emerald-600', bg: 'bg-emerald-50' };
      case 'Progress':
        return { text: 'text-amber-600', bg: 'bg-amber-50' };
      case 'Overdue':
        return { text: 'text-red-600', bg: 'bg-red-50' };
      case 'Resolved':
        return { text: 'text-blue-600', bg: 'bg-blue-50' };
      case 'Rejected':
        return { text: 'text-slate-500', bg: 'bg-slate-100' };
      default:
        return { text: 'text-emerald-600', bg: 'bg-emerald-50' };
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
        {/* Left content */}
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            {title}
          </p>
          <h3 className="text-3xl font-bold text-gray-900">
            {count}
          </h3>
        </div>

        {/* Icon */}
        <div
          className={`p-4 rounded-xl ${theme.bg} ${theme.text}`}
        >
          <Icon size={28} strokeWidth={2.2} />
        </div>
      </motion.div>
    </Link>
  );
};

export default StatCard;
