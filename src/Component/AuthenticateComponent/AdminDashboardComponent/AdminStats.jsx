import React from 'react';
import { useSelector } from "react-redux";
import { Users, FileText, Activity, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
const AdminStats = () => {
  const { Language } = useSelector((state) => state.webState);

 
  const t = {
    totalUsers: Language === "AMH" ? "ጠቅላላ ተጠቃሚዎች" : "Total Users",
    totalComp: Language === "AMH" ? "ጠቅላላ አቤቱታዎች" : "Total Complaints",
    activeCases: Language === "AMH" ? "በሂደት ላይ ያሉ" : "Active Cases",
    closedCases: Language === "AMH" ? "የተዘጉ መዝገቦች" : "Closed Cases",
    live: Language === "AMH" ? "ቀጥታ" : "Live"
  };

  const stats = [
    { label: t.totalUsers, value: '2,450', icon: Users, color: 'text-emerald-500', glow: 'shadow-emerald-500/20',url:"/userMg" },
    { label: t.totalComp, value: '1,890', icon: FileText, color: 'text-blue-500', glow: 'shadow-blue-500/20',url:"" },
    { label: t.activeCases, value: '312', icon: Activity, color: 'text-amber-500', glow: 'shadow-amber-500/20',url:""  },
    { label: t.closedCases, value: '1,578', icon: CheckCircle, color: 'text-purple-500', glow: 'shadow-purple-500/20' ,url:"" },
  ];


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {stats.map((stat, i) => (
        <Link to={stat.url} key={i} className={`bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[2rem] hover:border-white/20 transition-all group shadow-2xl ${stat.glow}`}>
          <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-2xl bg-white/5 ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t.live}</span>
          </div>
          <h3 className="text-4xl font-black text-white tracking-tighter mb-1">{stat.value}</h3>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">{stat.label}</p>
        </Link>
      ))}
    </div>
  );
};

export default AdminStats;