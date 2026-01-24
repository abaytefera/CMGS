import React, { useState, useEffect } from 'react';
import { Save, PlusCircle, X, CheckCircle2 } from 'lucide-react';

const DepartmentForm = ({ editingDept, onSave, onCancel, isSaving }) => {
  const [formData, setFormData] = useState({ name: '', supervisor: '', status: true });

  useEffect(() => {
    if (editingDept) setFormData(editingDept);
    else setFormData({ name: '', supervisor: '', status: true });
  }, [editingDept]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData({ name: '', supervisor: '', status: true });
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-white border border-slate-200 p-8 rounded-[2.5rem] h-fit shadow-2xl shadow-slate-200/60 transition-all duration-300"
    >
      <h2 className="text-xl font-black text-slate-900 uppercase italic mb-8 flex justify-between items-center tracking-tight">
        {editingDept ? (
          <span className="flex items-center gap-2">Update <span className="text-emerald-600">Department</span></span>
        ) : (
          <span className="flex items-center gap-2">New <span className="text-emerald-600">Department</span></span>
        )}
        {editingDept && (
          <button 
            type="button"
            onClick={onCancel}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X size={20} className="text-slate-400 hover:text-rose-500" />
          </button>
        )}
      </h2>

      <div className="space-y-6">
        {/* Department Name Input */}
        <div className="group space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 group-focus-within:text-emerald-600 transition-colors">
            Official Designation
          </label>
          <input 
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-900 font-semibold outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder:text-slate-300 placeholder:font-normal"
            placeholder="e.g. Environmental Quality Control"
            required
          />
        </div>
        
        {/* Supervisor Select */}
        <div className="group space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 group-focus-within:text-emerald-600 transition-colors">
            Assigned Supervisor
          </label>
          <select 
            value={formData.supervisor}
            onChange={e => setFormData({...formData, supervisor: e.target.value})}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-900 font-semibold outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all appearance-none cursor-pointer"
            required
          >
            <option value="" className="text-slate-400">Choose from registry...</option>
            <option value="Sara Hagos">Sara Hagos</option>
            <option value="Dr. John Doe">Dr. John Doe</option>
            <option value="Ato Yonas Biru">Ato Yonas Biru</option>
          </select>
        </div>

        {/* Action Button: Beautiful Emerald Green */}
        <button 
          type="submit" 
          disabled={isSaving}
          className={`group relative w-full py-4 rounded-2xl font-black uppercase tracking-widest transition-all duration-300 active:scale-[0.97] overflow-hidden
            ${editingDept 
              ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xl shadow-amber-200' 
              : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-xl shadow-emerald-200 hover:shadow-emerald-300'
            } ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          <div className="relative z-10 flex items-center justify-center gap-3">
            {isSaving ? (
              <Save className="animate-spin" size={20}/>
            ) : (
              editingDept ? <CheckCircle2 size={20} /> : <PlusCircle size={20} className="group-hover:rotate-90 transition-transform duration-300" />
            )}
            <span>{isSaving ? 'Syncing...' : (editingDept ? 'Save Changes' : 'Initialize Dept')}</span>
          </div>
          
          {/* Decorative shine effect on hover */}
          <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
        </button>

        {editingDept && (
          <button 
            type="button"
            onClick={onCancel}
            className="w-full py-2 text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-rose-500 transition-colors"
          >
            × Cancel Operation
          </button>
        )}
      </div>
    </form>
  );
};

export default DepartmentForm;