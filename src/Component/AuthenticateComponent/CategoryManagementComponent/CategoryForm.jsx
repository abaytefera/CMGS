import React, { useState, useEffect } from 'react';
import { Layers, Clock, Building2, Save, X } from 'lucide-react';

const CategoryForm = ({ editingCat, departments, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    sla: '24h',
    status: true
  });

  useEffect(() => {
    if (editingCat) setFormData(editingCat);
    else setFormData({ name: '', department: '', sla: '24h', status: true });
  }, [editingCat]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.department) return alert("Please fill all fields");
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-3xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl sticky top-32 transition-all">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-black text-white uppercase italic flex items-center gap-2">
          <Layers className="text-cyan-400" size={24} />
          {editingCat ? 'Edit Category' : 'New Category'}
        </h2>
        {editingCat && <X className="cursor-pointer text-slate-500 hover:text-white" onClick={onCancel} />}
      </div>

      <div className="space-y-5">
        {/* Category Name */}
        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Category Title</label>
          <input 
            type="text" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:border-cyan-500/50 outline-none" 
            placeholder="e.g. Illegal Dumping"
          />
        </div>

        {/* DEPARTMENT ASSIGNMENT */}
        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Assign to Department</label>
          <div className="relative">
            <Building2 className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <select 
              value={formData.department}
              onChange={(e) => setFormData({...formData, department: e.target.value})}
              className="w-full bg-[#080d14] border border-white/10 rounded-2xl pl-14 pr-5 py-4 text-sm text-white focus:border-cyan-500/50 outline-none appearance-none"
            >
              <option value="">Select Department</option>
              {departments.map((dept, i) => <option key={i} value={dept}>{dept}</option>)}
            </select>
          </div>
        </div>

        {/* SLA RULE */}
        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">SLA Resolution Goal</label>
          <div className="relative">
            <Clock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <select 
              value={formData.sla}
              onChange={(e) => setFormData({...formData, sla: e.target.value})}
              className="w-full bg-[#080d14] border border-white/10 rounded-2xl pl-14 pr-5 py-4 text-sm text-white appearance-none"
            >
              <option value="12h">Critical (12 Hours)</option>
              <option value="24h">High (24 Hours)</option>
              <option value="72h">Medium (72 Hours)</option>
              <option value="1w">Low (1 Week)</option>
            </select>
          </div>
        </div>

        <button type="submit" className={`w-full font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl ${
          editingCat ? 'bg-amber-500 text-black' : 'bg-cyan-500 text-black hover:bg-cyan-400'
        }`}>
          <Save size={20} />
          <span className="uppercase tracking-[0.2em] text-xs">
            {editingCat ? 'Update Category' : 'Save Category'}
          </span>
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;