import React from 'react';
import { Eye, UserPlus, Calendar, Tag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'; // Changed useNavigation to useNavigate

const ComplaintRowNotAssigned = ({ complaint }) => {
  const navigate = useNavigate(); // Initialize navigate

  // Fallback string to prevent .charAt() error
  const name = complaint?.citizenName || "Unknown Citizen";
  const avatarLetter = name.charAt(0).toUpperCase();

  const formattedDate = complaint?.createdAt 
    ? new Date(complaint.createdAt).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })
    : "Recent";

  // Navigation handler
  const handleRowClick = () => {
    // Only navigate if we have an ID
    const targetId = complaint?._id || "sample";
    navigate(`/AssignComplain/${targetId}`);
  };

  return (
    <tr 
      onClick={handleRowClick} 
      className="group hover:bg-white/[0.04] cursor-pointer transition-all duration-300 border-b border-white/5 last:border-none"
    >
      {/* Tracking ID */}
      <td className="px-8 py-6">
        <span className="text-xs font-black text-white tracking-widest uppercase">
          {complaint?.trackingId || "ID-PENDING"}
        </span>
      </td>

      {/* Citizen Profile */}
      <td className="px-8 py-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-600/5 flex items-center justify-center text-sm font-black text-rose-500 border border-rose-500/20 shadow-lg">
            {avatarLetter}
          </div>
          <div>
            <p className="text-xs font-black text-slate-200 mb-1">{name}</p>
            <p className="text-[10px] text-slate-500 font-bold tracking-tight">
              {complaint?.phoneNumber || "No Contact"}
            </p>
          </div>
        </div>
      </td>

      {/* Category */}
      <td className="px-8 py-6">
        <div className="flex items-center gap-2">
          <Tag size={12} className="text-slate-600" />
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            {complaint?.category || "General"}
          </span>
        </div>
      </td>

      {/* Date */}
      <td className="px-8 py-6">
        <div className="flex items-center gap-2">
          <Calendar size={12} className="text-slate-600" />
          <span className="text-[10px] font-black text-slate-500 uppercase italic">
            {formattedDate}
          </span>
        </div>
      </td>

      {/* Status Badge */}
      <td className="px-8 py-6">
        <span className="px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[9px] font-black uppercase tracking-widest flex items-center gap-2 w-fit">
          <div className="w-1 h-1 rounded-full bg-rose-500 animate-pulse" />
          Unassigned
        </span>
      </td>

      {/* Actions */}
      <td className="px-8 py-6 text-right" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-end gap-2">
          {/* Assign Button */}
          <button 
            onClick={() => navigate(`/AssignComplain/${complaint?._id}`)}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-500 hover:text-white border border-emerald-500/20 rounded-xl transition-all text-[10px] font-black uppercase"
          >
            <UserPlus size={14} /> Assign
          </button>
          
          {/* View Link */}
          <Link 
            to={`/complaint-details/${complaint?._id}`}
            className="p-2.5 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-xl border border-white/5"
          >
            <Eye size={16} />
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default ComplaintRowNotAssigned;