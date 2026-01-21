import React, { useState, useEffect } from 'react';
import { LayoutGrid, Save, PlusCircle, X } from 'lucide-react';

const DepartmentForm = ({ editingDept, onSave, onCancel }) => {
  const [formData, setFormData] = useState({ name: '', supervisor: '', status: true });

  // When editingDept changes, fill the form
  useEffect(() => {
    if (editingDept) setFormData(editingDept);
    else setFormData({ name: '', supervisor: '', status: true });
  }, [editingDept]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Sends data back to Parent
    setFormData({ name: '', supervisor: '', status: true }); // Clear form
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] h-fit">
      <h2 className="text-xl font-black text-white uppercase italic mb-6 flex justify-between">
        {editingDept ? 'Update Department' : 'New Department'}
        {editingDept && <X className="cursor-pointer" onClick={onCancel} />}
      </h2>

      <div className="space-y-4">
        <input 
          value={formData.name}
          onChange={e => setFormData({...formData, name: e.target.value})}
          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-blue-500"
          placeholder="Department Name"
        />
        
        <select 
          value={formData.supervisor}
          onChange={e => setFormData({...formData, supervisor: e.target.value})}
          className="w-full bg-[#080d14] border border-white/10 rounded-xl p-4 text-white"
        >
          <option value="">Select Supervisor</option>
          <option value="Sara Hagos">Sara Hagos</option>
          <option value="Dr. John Doe">Dr. John Doe</option>
        </select>

        <button type="submit" className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest ${editingDept ? 'bg-amber-500 text-black' : 'bg-blue-600 text-white'}`}>
          {editingDept ? 'Update Changes' : 'Create Department'}
        </button>
      </div>
    </form>
  );
};

export default DepartmentForm;