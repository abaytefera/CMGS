import React, { useState } from "react";
import { Edit3, Power, Search, Filter, Building2 } from "lucide-react";

const DepartmentTable = ({ data = [], onEdit, onToggleStatus }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter((dept) => {
    const searchStr = searchTerm.toLowerCase();
    return dept.name?.toLowerCase().includes(searchStr);
  });

  return (
    <div className="flex flex-col gap-6 font-sans">
      {/* Search & Header */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between px-2">
        <div className="relative w-full max-w-md group">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
          <input
            type="text"
            placeholder="Search by department name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-slate-900 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all shadow-sm"
          />
        </div>
        <div className="text-slate-600 text-[11px] font-black uppercase tracking-widest bg-slate-100 px-4 py-2.5 rounded-xl border border-slate-200">
          <Filter size={14} className="inline mr-2 text-emerald-600" /> 
          Records: {filteredData.length}
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200 text-[11px] uppercase font-black text-slate-500 tracking-wider">
            <tr>
              <th className="px-8 py-6">Department Name</th>
              <th className="px-8 py-6">Status</th>
              <th className="px-8 py-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredData.map((dept) => (
              <tr key={dept.id || dept._id} className={`group hover:bg-slate-50/80 transition-all ${!dept.is_active ? 'bg-slate-50/50' : ''}`}>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${dept.is_active ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200 text-slate-500'}`}>
                      <Building2 size={20} />
                    </div>
                    <span className={`font-black text-sm uppercase tracking-tight ${dept.is_active ? "text-slate-900" : "text-slate-400"}`}>
                      {dept.name}
                    </span>
                  </div>
                </td>

                <td className="px-8 py-6">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                    dept.is_active ? "bg-green-50 text-green-700 border-green-200" : "bg-rose-50 text-rose-700 border-rose-200"
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${dept.is_active ? 'bg-green-500' : 'bg-rose-500'}`}></span>
                    {dept.is_active ? "active" : "inactive"}
                  </span>
                </td>

                <td className="px-8 py-6 text-right">
                  <div className="flex justify-end gap-3">
                    <button 
                      onClick={() => onEdit(dept)} 
                      className="p-2.5 bg-white border border-slate-200 text-slate-600 hover:text-emerald-600 hover:border-emerald-500 rounded-xl transition-all shadow-sm"
                      title="Edit Department"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => onToggleStatus({ id: dept.id || dept._id, is_active: dept.is_active })}
                      className={`p-2.5 rounded-xl border transition-all shadow-sm ${
                        dept.is_active 
                          ? "bg-white text-rose-500 border-rose-200 hover:bg-rose-500 hover:text-white" 
                          : "bg-emerald-600 text-white border-emerald-500 hover:bg-emerald-700"
                      }`}
                      title={dept.is_active ? "Deactivate" : "Activate"}
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

      {/* Empty State */}
      {filteredData.length === 0 && (
        <div className="text-center py-20 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
          <p className="text-slate-400 text-sm italic">No departments found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default DepartmentTable;