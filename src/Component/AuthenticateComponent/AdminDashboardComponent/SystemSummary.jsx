import React from 'react';
import { useSelector } from "react-redux";
import { ShieldCheck, Server, Layers, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SystemSummary = ({ catagory, dep }) => {
  const { Language } = useSelector((state) => state.webState);

  const t = {
    officers: Language === "AMH" ? "የስራ ዘርፎች" : "CATEGORIES",
    categories: Language === "AMH" ? "ክፍሎች" : "DEPARTMENTS",
    uptime: Language === "AMH" ? "የሲስተም ዝግጁነት" : "SYSTEM STATUS",
  };

  const summaries = [
    {
      title: t.officers,
      value: catagory || 5, // Falls back to 5 if prop is missing
      icon: ShieldCheck,
      url: "/CatagoryMg",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: t.categories,
      value: dep || 3, // Falls back to 3 if prop is missing
      icon: Layers,
      url: "/DepartmentMg",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    
  ];

  return (
    /* Force a single column layout with 'grid-cols-1'. 
       'w-full' ensures it takes up the sidebar width properly.
    */
    <div className="grid grid-cols-1 gap-4 w-full max-w-xs ml-auto">
      {summaries.map((item, i) => {
        const CardContent = (
          <div className="flex items-center justify-between bg-white border border-gray-100 p-4 rounded-xl hover:border-gray-300 hover:shadow-md transition-all group w-full">
            <div className="flex items-center gap-4">
              <div className={`${item.color} ${item.bgColor} p-3 rounded-lg flex-shrink-0`}>
                <item.icon size={22} strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1.5">
                  {item.title}
                </p>
                <p className="text-lg font-black text-gray-900 tracking-tight leading-none">
                  {item.value}
                </p>
              </div>
            </div>

            {item.url && (
              <ChevronRight
                size={18}
                className="text-gray-300 group-hover:text-gray-600 transition-colors"
              />
            )}
          </div>
        );

        return item.url ? (
          <Link to={item.url} key={i} className="block w-full">
            {CardContent}
          </Link>
        ) : (
          <div key={i} className="w-full">
            {CardContent}
          </div>
        );
      })}
    </div>
  );
};

export default SystemSummary;