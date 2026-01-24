import React from 'react';
import { useSelector } from "react-redux";
import { Users, FileText, Activity, CheckCircle, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminStats = ({numUser,numCompile,active,Inactive}) => {
  const { Language } = useSelector((state) => state.webState);

  const t = {
    totalUsers: Language === "AMH" ? "ጠቅላላ ተጠቃሚዎች" : "Total Users",
    totalComp: Language === "AMH" ? "ጠቅላላ አቤቱታዎች" : "Total Complaints",
    activeCases: Language === "AMH" ? "በሂደት ላይ ያሉ" : "Active Cases",
    closedCases: Language === "AMH" ? "የተዘጉ መዝገቦች" : "Closed Cases",
    live: Language === "AMH" ? "ቀጥታ" : "Live"
  };

  const stats = [
    { label: t.totalUsers, value: numUser, icon: Users, color: 'text-emerald-600', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-100', url: "/userMg" },
    { label: t.totalComp, value: numCompile, icon: FileText, color: 'text-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-100', url: "/Complaintlist/ALL" },
    { label: t.activeCases, value: active, icon: Activity, color: 'text-amber-600', bgColor: 'bg-amber-50', borderColor: 'border-amber-100', url: "/Complaintlist/active" },
    { label: t.closedCases, value: Inactive, icon: CheckCircle, color: 'text-purple-600', bgColor: 'bg-purple-50', borderColor: 'border-purple-100', url: "/Complaintlist/Closed" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {stats.map((stat, i) => (
        <Link 
          to={stat.url} 
          key={i} 
          className="bg-white border border-gray-200 p-6 rounded-2xl hover:border-gray-300 hover:shadow-md transition-all group relative overflow-hidden"
        >
          <div className="flex justify-between items-start mb-6">
        
            <div className={`p-3 rounded-xl ${stat.bgColor} ${stat.color} border ${stat.borderColor}`}>
              <stat.icon size={22} strokeWidth={2.5} />
            </div>
            
   
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                {t.live}
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              {stat.value}
            </h3>
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider leading-relaxed">
              {stat.label}
            </p>
          </div>

        
          {stat.url && (
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-gray-300">
              <ArrowUpRight size={18} />
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default AdminStats;