import React from 'react';
import { Edit3, Trash2 } from 'lucide-react';

const DepartmentTable = ({ data, onEdit, onDelete }) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-white/5 text-[10px] uppercase font-black text-slate-500">
          <tr>
            <th className="p-6">Department</th>
            <th className="p-6">Supervisor</th>
            <th className="p-6 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {data.map((dept) => (
            <tr key={dept.id} className="hover:bg-white/[0.02]">
              <td className="p-6 text-white font-bold">{dept.name}</td>
              <td className="p-6 text-slate-400">{dept.supervisor || "N/A"}</td>
              <td className="p-6 text-right flex justify-end gap-2">
                <button onClick={() => onEdit(dept)} className="p-2 bg-white/5 rounded-lg text-amber-500 hover:bg-amber-500 hover:text-white">
                  <Edit3 size={16} />
                </button>
                <button onClick={() => onDelete(dept.id)} className="p-2 bg-white/5 rounded-lg text-rose-500 hover:bg-rose-500 hover:text-white">
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentTable;