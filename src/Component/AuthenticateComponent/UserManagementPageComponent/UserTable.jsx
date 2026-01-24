import React from 'react';
import { Edit3, Trash2, Shield, User, Mail, Building2 } from 'lucide-react';

const UserTable = ({ users, onEdit, onDelete }) => {
  console.log(users);
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-white/[0.03] text-slate-500 text-[10px] uppercase font-black tracking-[0.2em]">
            <tr>
              <th className="px-8 py-5">Staff Member</th>
              <th className="px-8 py-5">Role & Dept</th>
              <th className="px-8 py-5">Contact</th>
              <th className="px-8 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {users.map((user) => {
           
              const safeName = user?.fullName || user?.name || "New User";
              const safeEmail = user?.username || "No email provided";
              const safeDept = user?.departmentId || "Unassigned";
              const safeRole = user?.role || "staff";
              
              // 2. SAFE CHARACTER ACCESS
              const avatarLetter = safeName.charAt(0).toUpperCase();

              return (
                <tr key={user._id || Math.random()} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 font-black text-sm shadow-lg shadow-blue-500/5">
                        {avatarLetter}
                      </div>
                      <div>
                        <p className="text-xs font-black text-slate-200 mb-0.5">{safeName}</p>
                        <span className="px-2 py-0.5 rounded-md bg-white/5 text-[9px] font-bold text-slate-500 uppercase tracking-tighter border border-white/5">
                          ID: {user?._id?.slice(-6) || "TEMP"}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="px-8 py-6">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <Shield size={12} className="text-blue-500/50" />
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{safeRole}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building2 size={12} className="text-slate-600" />
                        <span className="text-[10px] font-bold text-slate-500 uppercase">{safeDept}</span>
                      </div>
                    </div>
                  </td>

                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Mail size={12} />
                      <span className="text-[11px] font-medium">{safeEmail}</span>
                    </div>
                  </td>

                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => onEdit(user)}
                        className="p-2.5 bg-blue-500/10 hover:bg-blue-500 text-blue-500 hover:text-white rounded-xl border border-blue-500/20 transition-all"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button 
                        onClick={() => onDelete(user._id)}
                        className="p-2.5 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white rounded-xl border border-rose-500/20 transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;