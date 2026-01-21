import React from 'react';
import { Edit3, Power, Building2 } from 'lucide-react';

const CategoryTable = ({ categories, onEdit, onToggle }) => {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
      <table className="w-full text-left">
        <thead className="bg-white/[0.03] text-slate-500 text-[10px] uppercase font-black tracking-[0.2em]">
          <tr>
            <th className="px-8 py-6">Category Name</th>
            <th className="px-8 py-6">Linked Department</th>
            <th className="px-8 py-6">SLA Rule</th>
            <th className="px-8 py-6 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {categories.map((cat) => (
            <tr key={cat.id} className="group hover:bg-white/[0.02] transition-all">
              <td className="px-8 py-6 font-bold text-white italic">{cat.name}</td>
              <td className="px-8 py-6">
                <div className="flex items-center gap-2 text-cyan-400">
                  <Building2 size={14} />
                  <span className="text-xs uppercase font-black tracking-widest">{cat.department}</span>
                </div>
              </td>
              <td className="px-8 py-6 text-sm font-mono text-slate-400 italic">{cat.sla}</td>
              <td className="px-8 py-6 text-right">
                <div className="flex justify-end gap-2">
                  <button onClick={() => onEdit(cat)} className="p-2.5 bg-white/5 text-slate-400 rounded-xl hover:text-amber-500 border border-white/5">
                    <Edit3 size={14} />
                  </button>
                  <button 
                    onClick={() => onToggle(cat.id)}
                    className={`p-2.5 rounded-xl border border-white/5 transition-all ${cat.status ? 'text-emerald-500 hover:bg-emerald-500 hover:text-white' : 'text-rose-500 hover:bg-rose-500 hover:text-white'}`}
                  >
                    <Power size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;