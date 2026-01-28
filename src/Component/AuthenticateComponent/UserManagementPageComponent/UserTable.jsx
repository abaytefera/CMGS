import React, { useState } from 'react';
import { Edit3, Trash2, Mail, Search, X, Building2, AlertTriangle } from 'lucide-react';

const UserTable = ({ users = [], onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");
  // Track the user object intended for deletion
  const [userToDelete, setUserToDelete] = useState(null);

  const filteredUsers = users.filter((user) => {
    const search = searchTerm.trim().toLowerCase();
    if (!search) return true;
    return user?.full_name?.toLowerCase().includes(search);
  });

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      onDelete(userToDelete.id || userToDelete._id);
      setUserToDelete(null); // Close modal
    }
  };

  return (
    <div className="space-y-6 font-sans relative bottom-18 antialiased text-slate-900 bg-white p-6 rounded-xl">
      
      {/* ================= CUSTOM CONFIRMATION MODAL ================= */}
      {userToDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[2.5rem] p-8 max-w-sm w-full shadow-2xl border border-slate-100 flex flex-col items-center text-center gap-4">
            <div className="p-4 rounded-full bg-rose-50 text-rose-500">
              <AlertTriangle size={32} />
            </div>
            
            <div>
              <h3 className="text-xl font-black text-slate-900 mb-2">Delete User?</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Are you sure you want to remove <span className="font-bold text-slate-900">"{userToDelete.full_name}"</span>? 
                This action cannot be undone.
              </p>
            </div>

            <div className="flex gap-3 w-full mt-2">
              <button 
                onClick={() => setUserToDelete(null)}
                className="flex-1 py-3.5 rounded-2xl bg-slate-50 text-slate-600 font-bold text-xs uppercase tracking-widest border border-slate-100 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete}
                className="flex-1 py-3.5 rounded-2xl bg-rose-500 text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-rose-200 active:scale-95 transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SEARCH INPUT */}
      <div className="relative max-w-md group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search size={18} className="text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
        </div>
        <input
          type="text"
          placeholder="Search by full name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-50 border border-slate-300 rounded-2xl py-3.5 pl-12 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all placeholder:text-slate-400 text-slate-900"
        />
        {searchTerm.trim() !== "" && (
          <button 
            onClick={() => setSearchTerm("")}
            className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-slate-900"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        
        {/* MOBILE VIEW */}
        <div className="block md:hidden">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div key={user.id || user._id} className="p-6 border-b border-slate-100 space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                      {user?.full_name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-bold capitalize text-slate-900">{user?.full_name}</p>
                      <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold uppercase tracking-tight">
                        <Building2 size={10} /> {user?.Department?.name}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => onEdit(user)} className="p-2 text-emerald-600"><Edit3 size={16} /></button>
                    <button onClick={() => handleDeleteClick(user)} className="p-2 text-rose-600"><Trash2 size={16} /></button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-10 text-center text-slate-400">No results found.</div>
          )}
        </div>

        {/* DESKTOP VIEW */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 text-slate-500 text-[11px] uppercase font-bold tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-8 py-4">Staff Member</th>
                <th className="px-8 py-4">Department</th>
                <th className="px-8 py-4">Contact</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id || user._id} className="group hover:bg-emerald-50/30 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shadow-sm">
                          {user?.full_name?.charAt(0).toUpperCase()}
                        </div>
                        <p className="text-sm font-semibold capitalize text-slate-900">{user.full_name}</p>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                        <Building2 size={14} className="text-emerald-500" />
                        <span className="uppercase tracking-tight">{user.Department?.name || user.departmentName}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2 text-slate-500 text-xs">
                        <Mail size={13} />
                        {user.username || user.email}
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => onEdit(user)} 
                          className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDeleteClick(user)} 
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-8 py-16 text-center text-slate-400 italic">
                    No results for "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserTable;