import React, { useState } from "react";
import { Edit3, Power, Search, Filter, Building2 } from "lucide-react";

const DepartmentTable = ({ data = [], onEdit, onToggleStatus }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter((dept) => {
    const searchStr = searchTerm.toLowerCase();
    return (
      dept.name?.toLowerCase().includes(searchStr) ||
      dept.Users?.some((user) => user.name?.toLowerCase().includes(searchStr))
    );
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Search & Header */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between px-4">
        <div className="relative w-full max-w-md">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-slate-700 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all shadow-sm"
          />
        </div>
        <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest bg-white px-4 py-2 rounded-xl border border-slate-100 shadow-sm">
          <Filter size={14} className="inline mr-2" /> Records: {filteredData.length}
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-xl">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase font-black text-slate-500">
            <tr>
              <th className="px-8 py-6">Department</th>
              <th className="px-8 py-6">Supervisor</th>
              <th className="px-8 py-6">Status</th>
              <th className="px-8 py-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredData.map((dept) => (
              <tr key={dept.id} className={`hover:bg-slate-50/50 transition-all ${!dept.is_active ? 'opacity-60' : ''}`}>
                <td className="px-8 py-6">
                  <div className="flex flex-col">
                    <span className={`font-bold text-sm ${dept.is_active ? "text-slate-900" : "text-slate-400"}`}>
                      {dept.name}
                    </span>
                    <span className="text-[10px] text-slate-400">ID: #{dept.id}</span>
                  </div>
                </td>

                <td className="px-8 py-6">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Building2 size={12} />
                    <span className="text-[10px] font-medium">
                      {/* Mapping the Users array from your data */}
                      {dept.Users?.length > 0 ? dept.Users.map(u => u.name).join(", ") : "No Supervisor"}
                    </span>
                  </div>
                </td>

                <td className="px-8 py-6">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                    dept.is_active ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-slate-100 text-slate-500 border-slate-200"
                  }`}>
                    {dept.is_active ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className="px-8 py-6">
                  <div className="flex justify-end gap-3">
                    <button onClick={() => onEdit(dept)} className="p-2.5 bg-slate-50 rounded-xl text-amber-600 hover:bg-amber-500 hover:text-white transition-all">
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => onToggleStatus({ id: dept.id, is_active: dept.is_active })}
                      className={`p-2.5 rounded-xl border transition-all ${
                        dept.is_active ? "bg-rose-50 text-rose-500 border-rose-100 hover:bg-rose-500 hover:text-white" : "bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-500 hover:text-white"
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

      {/* Mobile Cards (Simplified version of Desktop logic) */}
      <div className="md:hidden flex flex-col gap-4 px-2">
        {filteredData.map((dept) => (
          <div key={dept.id} className="bg-white border rounded-2xl p-4 shadow-sm flex flex-col gap-3">
             <div className="flex justify-between items-center">
                <span className="font-bold">{dept.name}</span>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${dept.is_active ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                  {dept.is_active ? 'Active' : 'Inactive'}
                </span>
             </div>
             <button
               onClick={() => onToggleStatus({ id: dept.id, is_active: dept.is_active })}
               className={`w-full py-2 rounded-xl text-xs font-bold uppercase tracking-widest ${dept.is_active ? 'bg-rose-50 text-rose-500' : 'bg-emerald-500 text-white'}`}
             >
               {dept.is_active ? 'Deactivate' : 'Activate'}
             </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentTable;