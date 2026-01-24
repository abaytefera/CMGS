import React, { useState, useEffect } from 'react';
import { Layers, Building2, Save, X, Timer, AlertCircle } from 'lucide-react';

const CategoryForm = ({ editingCat, departments, onSave, onCancel }) => {
  const initialState = {
    name: '',
    departmentId: '', 
    resolutionTimeDays: '', 
    escalationTimeDays: '', 
    is_active: true, 
  };

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (editingCat) {
      setFormData({
        ...editingCat,
        departmentId: editingCat.departmentId || '',
        resolutionTimeDays: editingCat.resolutionTimeDays || '',
        escalationTimeDays: editingCat.escalationTimeDays || '',
        is_active: editingCat.is_active ?? true
      });
    } else {
      setFormData(initialState);
    }
  }, [editingCat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation check before calling parent onSave
    if (!formData.name || !formData.departmentId || !formData.resolutionTimeDays) {
      return; 
    }

    try {
      // Ensure numeric values are sent as Numbers to the API
      const payload = {
        ...formData,
        departmentId: Number(formData.departmentId),
        resolutionTimeDays: Number(formData.resolutionTimeDays),
        escalationTimeDays: Number(formData.escalationTimeDays || 0)
      };

      await onSave(payload);
      
      // Reset form only on successful creation
      if (!editingCat) {
        setFormData(initialState);
      }
    } catch (err) {
      // Errors are handled by the parent's toast logic
      console.error("Form submission error:", err);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200/60 sticky top-32 transition-all"
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-black text-slate-900 uppercase italic flex items-center gap-2 tracking-tight">
          <Layers className="text-emerald-500" size={24} />
          {editingCat ? 'Modify Category' : 'New Classification'}
        </h2>
        {editingCat && (
          <X 
            className="cursor-pointer text-slate-400 hover:text-rose-500 transition-colors" 
            onClick={onCancel} 
          />
        )}
      </div>

      <div className="space-y-5">
        {/* Category Name */}
        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Title</label>
          <input 
            type="text" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm text-slate-900 focus:border-emerald-500/50 outline-none transition-all" 
            placeholder="e.g. Network Connectivity Issues"
          />
        </div>

        {/* DEPARTMENT ASSIGNMENT */}
        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Department Owner</label>
          <div className="relative">
            <Building2 className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <select 
              value={formData.departmentId}
              onChange={(e) => setFormData({...formData, departmentId: e.target.value})}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-14 pr-5 py-4 text-sm text-slate-900 focus:border-emerald-500/50 outline-none appearance-none cursor-pointer"
            >
              <option value="">Select Department</option>
              {departments?.map((dept) => (
                <option key={dept.id} value={dept.id}>{dept.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
            {/* Resolution Time Days */}
            <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Resolution (Days)</label>
                <div className="relative">
                    <Timer className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-500" size={18} />
                    <input 
                        type="number"
                        placeholder="e.g. 5"
                        value={formData.resolutionTimeDays}
                        onChange={(e) => setFormData({...formData, resolutionTimeDays: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-sm text-slate-900 outline-none transition-all"
                    />
                </div>
            </div>

            {/* Escalation Time Days */}
            <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Escalation (Days)</label>
                <div className="relative">
                    <AlertCircle className="absolute left-5 top-1/2 -translate-y-1/2 text-amber-500" size={18} />
                    <input 
                        type="number"
                        placeholder="e.g. 2"
                        value={formData.escalationTimeDays}
                        onChange={(e) => setFormData({...formData, escalationTimeDays: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-sm text-slate-900 outline-none transition-all"
                    />
                </div>
            </div>
        </div>

        <button 
          type="submit" 
          className={`w-full font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-lg ${
            editingCat 
              ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white' 
              : 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-emerald-200 hover:shadow-emerald-400'
          }`}
        >
          <Save size={20} />
          <span className="uppercase tracking-[0.2em] text-xs">
            {editingCat ? 'Commit Changes' : 'Confirm Registry'}
          </span>
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;