import React from 'react';
import { useSelector } from "react-redux";
import {
  Users,
  FileText,
  Activity,
  CheckCircle,
  ArrowUpRight
} from 'lucide-react';
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
      value: CompileList?.totalUsers ?? 0,
      icon: Users,
      gradient: 'from-emerald-400 via-emerald-500 to-teal-500',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-700',
      url: "/userMg",
    },
    {
      label: t.totalComp,
      value: CompileList?.totalComplaints ?? 0,
      icon: FileText,
      gradient: 'from-blue-400 via-blue-500 to-indigo-500',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-700',
      url: "/Complaintlist/admin/list/",
    },
    {
      label: t.activeCases,
      value: CompileList?.activeComplaints ?? 0,
      icon: Activity,
      gradient: 'from-amber-400 via-orange-500 to-rose-500',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-700',
      url: "/Complaintlist/admin/active",
    },
    {
      label: t.closedCases,
      value: CompileList?.closedComplaints ?? 0,
      icon: CheckCircle,
      gradient: 'from-purple-400 via-indigo-500 to-violet-500',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-700',
      url: "/Complaintlist/admin/closed",
    },
  ];

  return (
    <div className="
      grid
      grid-cols-1
      sm:grid-cols-2
      xl:grid-cols-4
      gap-6
      mb-12
    ">
      {stats.map((stat, i) => {
        const Icon = stat.icon;

        return (
          <Link
            key={i}
            to={stat.url}
            style={{ animationDelay: `${i * 0.4}s` }}
            className={`
              relative overflow-hidden
              rounded-3xl
              p-6
              shadow-lg
              border border-white/40
              bg-gradient-to-br ${stat.gradient}
              transition-all duration-300
              hover:scale-[1.03]
              ${i % 2 === 0 ? 'animate-wave-up' : 'animate-wave-down'}
            `}
          >
            {/* Glass layer */}
            <div className="absolute inset-0 bg-white/40 backdrop-blur-md" />

            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                {/* Icon */}
                <div className={`p-3 rounded-xl ${stat.iconBg} ${stat.iconColor}`}>
                  <Icon size={24} strokeWidth={2.5} />
                </div>

                {/* Live badge */}
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-extrabold tracking-widest text-gray-700 uppercase">
                    {t.live}
                  </span>
                </div>
              </div>

              {/* Numbers */}
              <div>
                <h3 className="text-3xl font-black text-gray-900">
                  {stat.value}
                </h3>
                <p className="mt-1 text-[11px] uppercase tracking-widest font-bold text-gray-700">
                  {stat.label}
                </p>
              </div>
            </div>

            {/* Arrow */}
            <div className="absolute bottom-4 right-4 text-gray-600">
              <ArrowUpRight size={18} />
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default AdminStats;