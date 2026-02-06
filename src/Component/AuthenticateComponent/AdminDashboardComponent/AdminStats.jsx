import React from 'react';
import { useSelector } from "react-redux";
import { Users, FileText, Activity, CheckCircle, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminStats = ({ CompileList }) => {
  const { Language } = useSelector((state) => state.webState);

  const t = {
    totalUsers: Language === "AMH" ? "ጠቅላላ ተጠቃሚዎች" : "Total Users",
    totalComp: Language === "AMH" ? "ጠቅላላ አቤቱታዎች" : "Total Complaints",
    activeCases: Language === "AMH" ? "በሂደት ላይ ያሉ" : "Active Cases",
    closedCases: Language === "AMH" ? "የተዘጉ መዝገቦች" : "Closed Cases",
    live: Language === "AMH" ? "ቀጥታ" : "Live",
  };

  const stats = [
    {
      label: t.totalUsers,
      value: CompileList?.totalUsers,
      icon: Users,
      color: 'text-emerald-700',
      iconBg: 'bg-emerald-100',
      borderColor: 'border-emerald-200',
      gradient: 'bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-200',
      url: "/userMg",
    },
    {
      label: t.totalComp,
      value: CompileList?.totalComplaints,
      icon: FileText,
      color: 'text-blue-700',
      iconBg: 'bg-blue-100',
      borderColor: 'border-blue-200',
      gradient: 'bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200',
      url: "/Complaintlist/admin/list/",
    },
    {
      label: t.activeCases,
      value: CompileList?.activeComplaints,
      icon: Activity,
      color: 'text-amber-700',
      iconBg: 'bg-amber-100',
      borderColor: 'border-amber-200',
      gradient: 'bg-[#3b82f6]',
      url: "/Complaintlist/admin/active",
    },
    {
      label: t.closedCases,
      value: CompileList?.closedComplaints,
      icon: CheckCircle,
      color: 'text-purple-700',
      iconBg: 'bg-purple-100',
      borderColor: 'border-purple-200',
      gradient: 'bg-[#6366f1]',
      url: "/Complaintlist/admin/closed",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-10">
      {stats.map((stat, i) => (
        <Link
          key={i}
          to={stat.url}
          style={{ animationDelay: `${i * 0.5}s` }}
          className={`
            ${stat.gradient}
            border border-white/50
            p-6 rounded-2xl
            shadow-lg
            relative overflow-hidden
            ${i % 2 === 0 ? 'animate-wave-bounce' : 'animate-wave-bounce-down'}
          `}
        >
          {/* Glass overlay */}
          <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />

          {/* Content */}
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
              {/* Icon */}
              <div
                className={`p-3 rounded-xl ${stat.iconBg} ${stat.color} border ${stat.borderColor}`}
              >
                <stat.icon size={22} strokeWidth={2.5} />
              </div>

              {/* Live */}
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                  {t.live}
                </span>
              </div>
            </div>

            {/* Value */}
            <div className="space-y-1">
              <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                {stat.value ?? 0}
              </h3>
              <p className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          </div>

          {/* Arrow */}
          <div className="absolute bottom-4 right-4 text-gray-500">
            <ArrowUpRight size={18} />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AdminStats;