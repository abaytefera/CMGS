import React, { useState } from "react";
import {
  Edit3,
  Power,
  Building2,
  Search,
  SlidersHorizontal,
  Timer,
  AlertCircle,
} from "lucide-react";

const CategoryTable = ({ categories = [], onEdit, onToggle }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = categories.filter((cat) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      cat.name?.toLowerCase().includes(searchLower) ||
      cat.Department?.name?.toLowerCase().includes(searchLower) ||
      cat.departmentId?.toString().includes(searchLower)
    );
  });

  // Reusable icon button class to keep code clean
  const btnClass = "p-2.5 bg-slate-50 rounded-xl transition-all shadow-sm active:scale-95 border border-slate-100 hover:text-white";

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* SEARCH & STATS - Stacks on mobile */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between px-2">
        <div className="relative w-full max-w-md group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search by name, ID or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-sm outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all shadow-sm"
          />
        </div>

        <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest bg-white px-4 py-2 rounded-xl border border-slate-100 shadow-sm">
          <SlidersHorizontal size={14} />
          Total: {filteredCategories.length}
        </div>
      </div>

      {/* ================= DESKTOP TABLE ================= 
          Visible on md (768px) and up. Uses overflow-x-auto for small tablets.
      */}
      <div className="hidden md:block bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/40">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px] md:min-w-full">
            <thead className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase font-black text-slate-500">
              <tr>
                <th className="px-8 py-6">Classification</th>
                <th className="px-8 py-6">Department</th>
                <th className="px-8 py-6">Resolution / Escalation</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredCategories.map((cat) => (
                <tr key={cat.id || cat._id} className={`hover:bg-slate-50 transition-colors ${!cat.is_active ? 'opacity-70' : ''}`}>
                  <td className="px-8 py-6">
                    <div>
                      <p className={`font-bold italic text-sm ${cat.is_active ? 'text-slate-900' : 'text-slate-400'}`}>
                        {cat.name}
                      </p>
                      <p className="text-[10px] text-slate-400 font-mono">ID #{cat.id}</p>
                    </div>
                  </td>

                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full w-fit border border-emerald-100">
                      <Building2 size={12} />
                      <span className="text-[10px] uppercase font-black">
                        {cat.Department?.name || `Dept #${cat.departmentId}`}
                      </span>
                    </div>
                  </td>

                  <td className="px-8 py-6">
                    <div className="flex gap-4 text-xs font-semibold text-slate-600">
                      <span className="flex items-center gap-1.5">
                        <Timer size={14} className="text-emerald-500" />
                        {cat.resolutionTimeDays}d
                      </span>
                      <span className="flex items-center gap-1.5">
                        <AlertCircle size={14} className="text-amber-500" />
                        {cat.escalationTimeDays}d
                      </span>
                    </div>
                  </td>

                  <td className="px-8 py-6">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => onEdit(cat)} className={`${btnClass} text-amber-600 hover:bg-amber-500`}>
                        <Edit3 size={16} />
                      </button>
                      <button
                        onClick={() => onToggle(cat.id || cat._id)}
                        className={`${btnClass} ${
                          cat.is_active ? "text-rose-500 hover:bg-rose-500" : "bg-emerald-500 text-white hover:bg-emerald-600 border-emerald-500"
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
        </div>
      </div>

      {/* ================= MOBILE CARDS ================= 
          Visible only on screens smaller than md (768px)
      */}
      <div className="md:hidden flex flex-col gap-4 px-2">
        {filteredCategories.map((cat) => (
          <div
            key={cat.id || cat._id}
            className={`bg-white border rounded-[2rem] p-5 shadow-lg shadow-slate-200/50 flex flex-col gap-4 border-slate-100 ${!cat.is_active ? 'opacity-80' : ''}`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className={`font-bold italic text-lg tracking-tight ${cat.is_active ? 'text-slate-900' : 'text-slate-400'}`}>
                  {cat.name}
                </p>
                <p className="text-[10px] text-slate-400 font-mono tracking-widest">ID #{cat.id}</p>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                <Building2 size={12} />
                <span className="text-[10px] font-black uppercase">{cat.Department?.name || `D-${cat.departmentId}`}</span>
              </div>
            </div>

            <div className="flex gap-6 py-2 border-y border-slate-50">
              <div className="flex flex-col">
                <span className="text-[9px] uppercase text-slate-400 font-bold mb-1">Resolution</span>
                <span className="flex items-center gap-1.5 text-sm font-bold text-slate-700">
                   <Timer size={14} className="text-emerald-500" /> {cat.resolutionTimeDays} Days
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] uppercase text-slate-400 font-bold mb-1">Escalation</span>
                <span className="flex items-center gap-1.5 text-sm font-bold text-slate-700">
                   <AlertCircle size={14} className="text-amber-500" /> {cat.escalationTimeDays} Days
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-1">
              <button onClick={() => onEdit(cat)} className="flex-1 flex justify-center items-center gap-2 py-3 bg-slate-50 rounded-xl text-amber-600 font-bold text-xs uppercase tracking-widest border border-slate-100 active:scale-95">
                <Edit3 size={16} /> Edit
              </button>
              <button
                onClick={() => onToggle(cat.id || cat._id)}
                className={`flex-1 flex justify-center items-center gap-2 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all active:scale-95 ${
                  cat.is_active 
                  ? "bg-rose-50 text-rose-500 border border-rose-100" 
                  : "bg-emerald-500 text-white shadow-lg shadow-emerald-200"
                }`}
              >
                <Power size={16} /> {cat.is_active ? "Disable" : "Enable"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* EMPTY STATE */}
      {filteredCategories.length === 0 && (
        <div className="py-20 text-center bg-white rounded-[2.5rem] border border-dashed border-slate-200 flex flex-col items-center gap-3 mx-2">
          <Search size={40} className="text-slate-200" />
          <p className="text-slate-400 text-sm font-medium italic">
            No classifications found for "{searchTerm}"
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoryTable;