import React, { useState } from 'react';
import { Edit3, Trash2, Shield, Mail, Building2, Hash, Search, X } from 'lucide-react';

const UserTable = ({ users, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Logic: 
  // 1. .trim() handles the " " (space) case by turning it into an empty string.
  // 2. If search is empty, it returns 'true' for every user, displaying the whole list.
  const filteredUsers = users.filter((user) => {
    const search = searchTerm.trim().toLowerCase();
    if (!search) return true; 
    return user?.full_name?.toLowerCase().includes(search);
  });

  return (
    <div className="space-y-4 font-sans antialiased text-slate-200">
      
      {/* SEARCH INPUT */}
      <div className="relative max-w-md mx-4 md:mx-0 group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search size={18} className="text-slate-500 group-focus-within:text-blue-500 transition-colors" />
        </div>
        <input
          type="text"
          placeholder="Search by full name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all placeholder:text-slate-600"
        />
        {searchTerm.trim() !== "" && (
          <button 
            onClick={() => setSearchTerm("")}
            className="absolute inset-y-0 right-4 flex items-center text-slate-500 hover:text-white"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl mx-4 md:mx-0">
        
        {/* MOBILE VIEW (Stack) */}
        <div className="block md:hidden">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => {
              const userId = user?.id || user?._id || "N/A";
              return (
                <div key={userId} className="p-6 border-b border-white/5 space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 font-black">
                        {user?.full_name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-black capitalize">{user?.full_name}</p>
                        <p className="text-[10px] text-slate-500 font-mono">{userId}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => onEdit(user)} className="p-2 bg-blue-400/10 text-blue-400 rounded-lg"><Edit3 size={14} /></button>
                      <button onClick={() => onDelete(userId)} className="p-2 bg-rose-400/10 text-rose-400 rounded-lg"><Trash2 size={14} /></button>
                    </div>
                  </div>
                  <div className="flex gap-4 text-[10px] font-bold text-slate-400 uppercase">
                    <span className="flex items-center gap-1"><Shield size={12} /> {user.role}</span>
                    <span className="flex items-center gap-1"><Building2 size={12} /> {user.departmentId}</span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-10 text-center text-slate-500 text-sm">No results for "{searchTerm}"</div>
          )}
        </div>

        {/* DESKTOP VIEW (Table) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white/[0.03] text-slate-500 text-[10px] uppercase font-black tracking-[0.2em]">
              <tr>
                <th className="px-8 py-5">Staff Member</th>
                <th className="px-8 py-5">System ID</th>
                <th className="px-8 py-5">Role & Dept</th>
                <th className="px-8 py-5">Contact</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredUsers.map((user) => (
                <tr key={user.id || user._id} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 font-black">
                        {user?.full_name?.charAt(0).toUpperCase()}
                      </div>
                      <p className="text-xs font-black capitalize">{user.full_name}</p>
                    </div>
                  </td>
                  <td className="px-8 py-6 font-mono text-[10px] text-slate-400">
                    <Hash size={12} className="inline mr-1 opacity-30" /> {user.id || user._id}
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-1">
                      <div className="text-[10px] font-black text-slate-300 uppercase flex items-center gap-2"><Shield size={12} className="text-blue-500/50" /> {user.role}</div>
                      <div className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-2"><Building2 size={12} /> {user.departmentId}</div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-slate-400 text-[11px]">
                    <Mail size={12} className="inline mr-2 opacity-40" /> {user.username}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => onEdit(user)} className="p-2.5 bg-blue-500/10 hover:bg-blue-500 text-blue-500 hover:text-white rounded-xl border border-blue-500/20 transition-all"><Edit3 size={14} /></button>
                      <button onClick={() => onDelete(user.id || user._id)} className="p-2.5 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white rounded-xl border border-rose-500/20 transition-all"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserTable;