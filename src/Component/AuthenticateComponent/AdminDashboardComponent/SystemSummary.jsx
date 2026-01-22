import React from 'react';
import { useSelector } from "react-redux";
import { ShieldCheck, Server, Layers, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SystemSummary = () => {
  const { Language } = useSelector((state) => state.webState);

  const t = {
    officers: Language === "AMH" ? "የስራ ዘርፎች" : "Categories",
    active: Language === "AMH" ? "42 በስራ ላይ" : "42 Active",
    categories: Language === "AMH" ? "ክፍሎች" : "Departments",
    depts: Language === "AMH" ? "12 ክፍሎች" : "12 Units",
    uptime: Language === "AMH" ? "የሲስተም ዝግጁነት" : "System Status",
  };

  const summaries = [
    { title: t.officers, value: t.active, icon: ShieldCheck, url: "/CatagoryMg", color: "text-blue-600", bgColor: "bg-blue-50" },
    { title: t.categories, value: t.depts, icon: Layers, url: "/DepartmentMg", color: "text-emerald-600", bgColor: "bg-emerald-50" },
    { title: t.uptime, value: '99.9% Online', icon: Server, url: "", color: "text-purple-600", bgColor: "bg-purple-50" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {summaries.map((item, i) => (
        <Link 
          to={item.url} 
          key={i} 
          className="flex items-center justify-between bg-white border border-gray-200 p-5 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className={`${item.color} ${item.bgColor} p-2.5 rounded-lg border border-transparent group-hover:border-current/10 transition-colors`}>
              <item.icon size={20} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-none mb-1.5">
                {item.title}
              </p>
              <p className="text-sm font-extrabold text-gray-900 tracking-tight">
                {item.value}
              </p>
            </div>
          </div>
          
          {item.url && (
            <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
          )}
        </Link>
      ))}
    </div>
  );
};

export default SystemSummary;