import React, { useState, useEffect } from 'react';
import { Save, PlusCircle, X, CheckCircle2, User, ChevronDown } from 'lucide-react';

const DepartmentForm = ({ editingDept, onSave, onCancel, user, isSaving }) => {
  const [formData, setFormData] = useState({ name: '', supervisor: '', status: true });

  useEffect(() => {
    if (editingDept) {
      setFormData({ 
        ...editingDept, 
        name: editingDept.name || '' 
      });
    } else {
      setFormData({ name: '', supervisor: '', status: true });
    }
  }, [editingDept]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    if (!editingDept) setFormData({ name: '', supervisor: '', status: true });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-2xl relative">
      <h2 className="text-xl font-black text-slate-900 uppercase italic mb-8 flex justify-between items-center">
        {editingDept ? "Update Name" : "New Department"}
        {editingDept && (
          <button type="button" onClick={onCancel} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X size={20} className="text-slate-400 hover:text-rose-500" />
          </button>
        )}
      </h2>

      <div className="space-y-6">
        {/* Department Name */}
        <div className="group space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 group-focus-within:text-emerald-600">
            Official Designation
          </label>
          <input 
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-900 font-semibold outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all"
            placeholder="e.g. Environmental Quality Control"
            required
          />
        </div>
        
        {/* Supervisor Selection */}
        {!editingDept ? (
          <div className="group space-y-2 relative">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 group-focus-within:text-emerald-600">
              Assigned Supervisor
            </label>
            <div className="relative">
             <select 
  value={formData.supervisor}
  onChange={e => setFormData({...formData, supervisor: e.target.value})}
  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-900 font-semibold outline-none focus:border-emerald-500 transition-all appearance-none cursor-pointer pr-12"
  required
>
  <option value="">Select a Supervisor</option>
  
  {user && user
    // 1. Optional: Filter to only show users with the 'supervisor' role
    .filter(us => us.role === 'supervisor') 
    .map((us) => (
      <option key={us.id} value={us.id} className="text-slate-900">
        {/* 2. Fallback: If full_name is null, use username */}
        {us.full_name || us.username} 
      </option>
    ))
  }
</select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
            </div>
          </div>
        ) : (
          <div className="p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Current Supervisor</p>
            <div className="flex items-center gap-2 text-slate-500 font-medium text-sm">
              <User size={14} className="text-emerald-500" />
             
              {editingDept.supervisor || (editingDept.Users?.[0]?.name) || "No Supervisor Assigned"}
            </div>
          </div>
        )}

        <button 
          type="submit" 
          disabled={isSaving}
          className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-white transition-all transform active:scale-[0.98]
            ${editingDept ? 'bg-amber-500 shadow-lg shadow-amber-200 hover:bg-amber-600' : 'bg-emerald-500 shadow-lg shadow-emerald-200 hover:bg-emerald-600'}
            ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isSaving ? 'Processing...' : (editingDept ? 'Update Name' : 'Initialize Dept')}
        </button>
      </div>
    </form>
  );
};

export default DepartmentForm;