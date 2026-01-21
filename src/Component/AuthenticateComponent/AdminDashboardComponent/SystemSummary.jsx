import React from 'react';
import { useSelector } from "react-redux";
import { ShieldCheck, Server, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

const SystemSummary = () => {
  const { Language } = useSelector((state) => state.webState);

  const t = {
    officers: Language === "AMH" ? "የስራ ዘርፎች" : "Categories",
    active: Language === "AMH" ? "42 በስራ ላይ" : "42 Active",
    categories: Language === "AMH" ? "ክፍሎች" : "Department",
    depts: Language === "AMH" ? "12 ክፍሎች" : "12 Depts",
    uptime: Language === "AMH" ? "የሲስተም ዝግጁነት" : "System Uptime",
  };

  const summaries = [
    { title: t.officers, value: t.active, icon: ShieldCheck ,url:"/CatagoryMg" },
    { title: t.categories, value: t.depts, icon: Layers,url:"/DepartmentMg" },
    { title: t.uptime, value: '99.9%', icon: Server,url:"" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {summaries.map((item, i) => (
        <Link to={item.url} key={i} className="flex items-center gap-4 bg-white/[0.02] border border-white/5 p-5 rounded-2xl hover:bg-white/[0.05] transition-all">
          <div className="text-emerald-500 bg-emerald-500/10 p-2.5 rounded-xl">
            <item.icon size={20} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">
              {item.title}
            </p>
            <p className="text-sm font-bold text-white tracking-tight">
              {item.value}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SystemSummary;