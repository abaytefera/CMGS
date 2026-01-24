import React, { useState } from 'react';
import { Edit3, Power, Building2, Search, SlidersHorizontal, Timer, AlertCircle } from 'lucide-react';

const CategoryTable = ({ categories, onEdit, onToggle }) => {
  const [searchTerm, setSearchTerm] = useState("");

 
  const filteredCategories = categories.filter(cat => {
    const searchLower = searchTerm.toLowerCase();
    const catName = cat.name?.toLowerCase() || "";
    
    
    const deptName = cat.Department?.name?.toLowerCase() || "";
    const deptId = cat.departmentId?.toString() || "";

    return catName.includes(searchLower) || 
           deptName.includes(searchLower) || 
           deptId.includes(searchLower);
  });

  return (
    <div className="flex flex-col gap-6">
      {/* SEARCH BAR SECTION */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between px-4">
        <div className="relative w-full max-w-md group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={18} className="text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Search by name, ID or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-slate-700 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all shadow-sm"
          />
        </div>
        
        <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest bg-white px-4 py-2 rounded-xl border border-slate-100 shadow-sm">
          <SlidersHorizontal size={14} />
          Total: {filteredCategories.length} Categories
        </div>
      </div>

      {/* TABLE CONTAINER */}
      <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/50">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase font-black tracking-[0.2em] border-b border-slate-100">
            <tr>
              <th className="px-8 py-6">Classification</th>
              <th className="px-8 py-6">Department</th>
              <th className="px-8 py-6">Resolution / Escalation</th>
              <th className="px-8 py-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredCategories.map((cat) => (
              <tr key={cat.id || cat._id} className="group hover:bg-slate-50/50 transition-all">
                {/* Category Name */}
                <td className="px-8 py-6">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900 italic text-base">{cat.name}</span>
                    <span className="text-[9px] text-slate-400 font-mono uppercase tracking-tighter">ID: #{cat.id}</span>
                  </div>
                </td>

                {/* Linked Department */}
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 w-fit px-3 py-1 rounded-full border border-emerald-100">
                    <Building2 size={12} />
                    <span className="text-[10px] uppercase font-black tracking-widest">
                      {cat.Department?.name || `Dept #${cat.departmentId}`}
                    </span>
                  </div>
                </td>

                {/* Timing Rules */}
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-slate-600" title="Resolution Time">
                        <Timer size={14} className="text-emerald-500" />
                        <span className="text-sm font-bold">{cat.resolutionTimeDays}d</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600" title="Escalation Time">
                        <AlertCircle size={14} className="text-amber-500" />
                        <span className="text-sm font-bold">{cat.escalationTimeDays}d</span>
                    </div>
                  </div>
                </td>

                {/* Actions */}
                <td className="px-8 py-6">
                  <div className="flex justify-end gap-3">
                    <button 
                      onClick={() => onEdit(cat)} 
                      className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:text-amber-500 hover:bg-amber-50 border border-slate-100 transition-all shadow-sm active:scale-95"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button 
                      onClick={() => onToggle(cat.id || cat._id)}
                      className={`p-2.5 rounded-xl border transition-all shadow-sm active:scale-95 ${
                        cat.is_active 
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-500 hover:text-white' 
                        : 'bg-rose-50 text-rose-500 border-rose-100 hover:bg-rose-500 hover:text-white'
                      }`}
                    >
                      <Power size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {filteredCategories.length === 0 && (
          <div className="py-20 text-center flex flex-col items-center gap-2">
            <Search size={40} className="text-slate-200" />
            <p className="text-slate-400 font-medium italic">No categories matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryTable;