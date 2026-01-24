import React, { useState } from 'react';
import { Edit3, Trash2, Search, Filter } from 'lucide-react';

const DepartmentTable = ({ data, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter logic: Checks name, code, and supervisor
  const filteredData = data.filter((dept) => {
    const searchStr = searchTerm.toLowerCase();
    return (
      dept.name?.toLowerCase().includes(searchStr) ||
      dept.code?.toLowerCase().includes(searchStr) ||
      (dept.supervisor || dept.headName)?.toLowerCase().includes(searchStr)
    );
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Search Bar Section */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between px-2">
        <div className="relative w-full max-w-md group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={18} className="text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Search by name or supervisor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-slate-700 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all shadow-sm"
          />
        </div>
        
        <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest bg-white px-4 py-2 rounded-xl border border-slate-100 shadow-sm">
          <Filter size={14} />
          Records: {filteredData.length}
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/40">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase font-black text-slate-500">
            <tr>
              <th className="p-6">Department</th>
              <th className="p-6">Supervisor</th>
              <th className="p-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredData.map((dept) => (
              <tr key={dept._id || dept.id} className="hover:bg-slate-50/80 transition-colors group">
                <td className="p-6">
                  <div className="flex flex-col">
                    <span className="text-slate-900 font-bold text-sm tracking-tight">{dept.name}</span>
                    <span className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">{dept.code || "No Code"}</span>
                  </div>
                </td>
                <td className="p-6">
                  <span className="text-slate-600 text-sm font-medium">
                    {dept.supervisor || dept.headName || "N/A"}
                  </span>
                </td>
                <td className="p-6">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => onEdit(dept)} 
                      className="p-2.5 bg-slate-50 rounded-xl text-amber-600 hover:bg-amber-500 hover:text-white transition-all shadow-sm active:scale-95 border border-slate-100"
                      title="Edit Department"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button 
                      onClick={() => onDelete(dept._id || dept.id)} 
                      className="p-2.5 bg-slate-50 rounded-xl text-rose-600 hover:bg-rose-500 hover:text-white transition-all shadow-sm active:scale-95 border border-slate-100"
                      title="Delete Department"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredData.length === 0 && (
          <div className="py-20 text-center bg-white flex flex-col items-center gap-3">
            <div className="p-4 bg-slate-50 rounded-full text-slate-300">
                <Search size={32} />
            </div>
            <p className="text-slate-400 text-sm font-medium italic">
                {searchTerm ? `No results found for "${searchTerm}"` : "No departments registered in the system."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartmentTable;