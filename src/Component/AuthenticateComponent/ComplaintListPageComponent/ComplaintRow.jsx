
import React from 'react';
import { MoreHorizontal, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const ComplaintRow = ({ complaint }) => {

  const name = complaint?.citizenName || "Unknown Citizen";
  const firstLetter = name.charAt(0).toUpperCase();
 
const   navigate=useNavigate()
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'assigned': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'resolved': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'pending': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <tr onClick={() => navigate(`/DetailList/${complaint.id}`)} className="group hover:bg-white/[0.02] transition-colors">
      <td className="px-8 py-6">
        <span className="text-xs font-black  tracking-wider">{complaint?.id || "N/A"}</span>
      </td>
      <td className="px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-[10px] font-black text-emerald-500 border border-emerald-500/20">
            {firstLetter}
          </div>
          <div>
            <p className="text-xs font-black text-slate-200 leading-none mb-1">{complaint.citizen_name}</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">
              {complaint?.phoneNumber || "No Phone"}
            </p>
          </div>
        </div>
      </td>
      <td className="px-8 py-6">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          {complaint?.Category.name || "Uncategorized"}
        </span>
      </td>
      <td className="px-8 py-6">
        <span className="text-[10px] font-black text-slate-500 uppercase italic">
          {complaint?.createdAt ? new Date(complaint.createdAt).toLocaleDateString() : "---"}
        </span>
      </td>
      <td className="px-8 py-6">
        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.15em] border ${getStatusColor(complaint?.status)}`}>
          {complaint?.status || "Unknown"}
        </span>
      </td>
      <td className="px-8 py-6 text-right">
        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link 
            to={`/complaint-details/${complaint?._id}`}
            className="p-2 hover:bg-emerald-500/20 text-emerald-500 rounded-lg transition-colors"
          >
            <Eye size={16} />
          </Link>
          <button className="p-2 hover:bg-white/10 text-slate-400 rounded-lg">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ComplaintRow;