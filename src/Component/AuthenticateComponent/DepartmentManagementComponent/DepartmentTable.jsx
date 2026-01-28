import React, { useState } from "react";
import { 
  Edit3, 
  Search, 
  Filter, 
  Building2, 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle 
} from "lucide-react";

const DepartmentTable = ({ data = [], onEdit, onToggleStatus }) => {
  const [searchTerm, setSearchTerm] = useState("");
  // State for the professional confirmation pop-up
  const [confirmToggle, setConfirmToggle] = useState(null);

  const filteredData = data.filter((dept) => {
    const searchStr = searchTerm.toLowerCase();
    return dept.name?.toLowerCase().includes(searchStr);
  });

  const handleToggleClick = (dept) => setConfirmToggle(dept);

  const confirmAction = () => {
    if (confirmToggle) {
      onToggleStatus({ 
        id: confirmToggle.id || confirmToggle._id, 
        is_active: confirmToggle.is_active 
      });
      setConfirmToggle(null);
    }
  };

  return (
    <div className="flex flex-col gap-6 font-sans relative">
      
      {/* ================= PROFESSIONAL MODAL ================= */}
      {confirmToggle && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] p-10 max-w-sm w-full shadow-2xl border border-slate-100 flex flex-col items-center text-center">
            <div className={`mb-6 p-5 rounded-3xl ${confirmToggle.is_active ? 'bg-amber-50 text-amber-500' : 'bg-emerald-50 text-emerald-500'}`}>
              <AlertTriangle size={40} strokeWidth={1.5} />
            </div>
            
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Status Change</h3>
            <p className="text-slate-500 mt-3 text-sm leading-relaxed">
              Are you sure you want to {confirmToggle.is_active ? 'deactivate' : 'activate'} the 
              <span className="block font-bold text-slate-800 mt-1 italic uppercase">"{confirmToggle.name}"</span>
            </p>

            <div className="flex gap-3 w-full mt-8">
              <button 
                onClick={() => setConfirmToggle(null)}
                className="flex-1 py-4 rounded-2xl bg-slate-100 text-slate-600 font-bold text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={confirmAction}
                className={`flex-1 py-4 rounded-2xl text-white font-bold text-[10px] uppercase tracking-widest shadow-lg active:scale-95 transition-all ${
                  confirmToggle.is_active ? 'bg-slate-900' : 'bg-emerald-600'
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search & Header */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between px-2">
        <div className="relative w-full max-w-md group">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
          <input
            type="text"
            placeholder="Search departments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-slate-900 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all shadow-sm"
          />
        </div>
        <div className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] bg-white px-5 py-3 rounded-2xl border border-slate-200 shadow-sm">
          <Filter size={14} className="inline mr-2 text-emerald-500" /> 
          Records: {filteredData.length}
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/40">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100 text-[10px] uppercase font-black text-slate-400 tracking-widest">
            <tr>
              <th className="px-8 py-6">Department Identity</th>
              <th className="px-8 py-6">Current Status</th>
              <th className="px-8 py-6 text-right">Quick Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredData.map((dept) => (
              <tr key={dept.id || dept._id} className="group hover:bg-slate-50/50 transition-all">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl transition-colors ${dept.is_active ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                      <Building2 size={22} />
                    </div>
                    <span className={`font-bold text-sm uppercase tracking-tight ${dept.is_active ? "text-slate-800" : "text-slate-400"}`}>
                      {dept.name}
                    </span>
                  </div>
                </td>

                <td className="px-8 py-6">
                  <div className={`flex items-center gap-2 font-black text-[10px] uppercase tracking-widest ${dept.is_active ? 'text-emerald-600' : 'text-slate-400'}`}>
                    {dept.is_active ? (
                      <><ShieldCheck size={16} className="animate-pulse" /> Verified Active</>
                    ) : (
                      <><ShieldAlert size={16} /> Deactivated</>
                    )}
                  </div>
                </td>

                <td className="px-8 py-6 text-right">
                  <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => onEdit(dept)} 
                      className="p-3 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-xl transition-all"
                      title="Edit"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button
                      onClick={() => handleToggleClick(dept)}
                      className={`p-3 rounded-xl transition-all ${
                        dept.is_active 
                          ? "text-slate-400 hover:text-rose-500 hover:bg-rose-50" 
                          : "bg-emerald-500 text-white shadow-lg shadow-emerald-100"
                      }`}
                    >
                      {dept.is_active ? <ShieldAlert size={18} /> : <ShieldCheck size={18} />}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Design */}
      <div className="md:hidden flex flex-col gap-4 px-2">
        {filteredData.map((dept) => (
          <div key={dept.id || dept._id} className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-lg shadow-slate-200/50">
             <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${dept.is_active ? 'bg-emerald-50 text-emerald-500' : 'bg-slate-50 text-slate-400'}`}>
                    <Building2 size={18} />
                  </div>
                  <h4 className={`font-bold text-sm uppercase ${dept.is_active ? 'text-slate-900' : 'text-slate-400 line-through'}`}>{dept.name}</h4>
                </div>
                {dept.is_active ? <ShieldCheck size={18} className="text-emerald-500" /> : <ShieldAlert size={18} className="text-slate-300" />}
             </div>
             <div className="flex gap-3">
                <button onClick={() => onEdit(dept)} className="flex-1 py-3.5 bg-slate-50 rounded-2xl text-[10px] font-black uppercase text-slate-500 tracking-widest border border-slate-100">Edit</button>
                <button 
                  onClick={() => handleToggleClick(dept)} 
                  className={`flex-1 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${dept.is_active ? 'bg-rose-50 text-rose-600' : 'bg-emerald-600 text-white shadow-md shadow-emerald-200'}`}
                >
                  {dept.is_active ? 'Disable' : 'Enable'}
                </button>
             </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredData.length === 0 && (
        <div className="text-center py-20 bg-white rounded-[2.5rem] border border-dashed border-slate-200 mx-2">
          <Building2 size={40} className="mx-auto text-slate-200 mb-4" />
          <p className="text-slate-400 text-sm italic">No departments match your search query.</p>
        </div>
      )}
    </div>
  );
};

export default DepartmentTable;