import React, { useEffect, useState } from 'react';
import { UserPlus, User, Lock, Save, X, RefreshCw, Copy, Check, Building2, ChevronDown, Phone } from 'lucide-react';
import { useGetDepartmentsQuery } from '../../../Redux/departmentApi';

const UserForm = ({ editingUser, onCancel, onSave, isLoading }) => {
  const initialState = {
    username: '',
    password: '',
    full_name: '',
    phone_number: '', 
    role: '', 
    departmentId: '', 
  };

  const [formData, setFormData] = useState(initialState);
  const [copied, setCopied] = useState(false);

  const { data: depfile, isLoading: isDepsLoading } = useGetDepartmentsQuery();

  useEffect(() => {
    if (editingUser) {
      setFormData({
        ...editingUser,
        role: editingUser.role ? editingUser.role.toUpperCase() : '',
        departmentId: editingUser.departmentId?._id || editingUser.departmentId || '',
        phone_number: editingUser.phone_number || editingUser.phone || '' 
      });
    } else {
      setFormData(initialState);
    }
  }, [editingUser]);

  const handleNameInput = (fullNameValue) => {
    const nameParts = fullNameValue.trim().toLowerCase().split(/\s+/);
    let generatedUser = '';

    if (nameParts.length === 1 && nameParts[0] !== '') {
      generatedUser = nameParts[0];
    } else if (nameParts.length >= 2) {
      const firstName = nameParts[0];
      const lastName = nameParts[nameParts.length - 1];
      generatedUser = `${firstName[0]}.${lastName}`;
    }

    setFormData(prev => ({ 
      ...prev, 
      full_name: fullNameValue, 
      username: generatedUser 
    }));
  };

  const generatePassword = () => {
    const charset = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789!@#$";
    let retVal = "";
    for (let i = 0; i < 12; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setFormData(prev => ({ ...prev, password: retVal }));
  };

  const copyToClipboard = () => {
    const selectedDept = depfile?.find(d => String(d.id || d._id) === String(formData.departmentId));
    const deptName = selectedDept ? selectedDept.name : 'Not Assigned';

    const text = `
REGISTRATION DETAILS:
----------------------------
Name: ${formData.full_name}
Phone: ${formData.phone_number}
Username: ${formData.username}
Password: ${formData.password}
Role: ${formData.role}
Department: ${deptName}
    `;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
  
    
    const finalData = {
      ...formData,
      role: formData.role ? formData.role.toUpperCase() : '',
      departmentId: formData.departmentId ? Number(formData.departmentId) : ''
    };
    
    onSave(finalData);
  };

  return (
    <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-black text-slate-900 uppercase italic flex items-center gap-2">
          <div className="w-1.5 h-8 bg-emerald-600 rounded-full" />
          {editingUser ? 'Update Profile' : 'Staff Onboarding'}
        </h2>
        {editingUser && (
          <button onClick={onCancel} type="button" className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
            <X size={20} />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* FULL NAME */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
          <div className="relative">
            <UserPlus className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              value={formData.full_name}
              onChange={(e) => handleNameInput(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-14 pr-5 py-4 text-sm text-slate-700 focus:border-emerald-500/50 focus:bg-white outline-none transition-all"
              placeholder="e.g. Abebe Kebede"
            />
          </div>
        </div>

        {/* PHONE NUMBER */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
          <div className="relative">
            <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="tel"
              value={formData.phone_number}
              onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-14 pr-5 py-4 text-sm text-slate-700 focus:border-emerald-500/50 focus:bg-white outline-none transition-all"
              placeholder="e.g. 0911001122"
            />
          </div>
        </div>

        {/* USERNAME */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">System Generated Username</label>
          <div className="relative">
            <User className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-600" size={18} />
            <input
              type="text"
              value={formData.username}
              readOnly
              className="w-full bg-emerald-50 border border-emerald-100 rounded-2xl pl-14 pr-5 py-4 text-sm text-emerald-700 font-bold outline-none cursor-default"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Assign Role</label>
            <div className="relative">
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm text-slate-700 focus:border-emerald-500/50 focus:bg-white outline-none appearance-none cursor-pointer"
              >
                <option value="" disabled>Select Role</option>
                <option value="ADMIN">Admin</option>
                <option value="SUPERVISOR">Supervisor</option>
                <option value="MANAGER">Manager</option>
                <option value="OFFICER">Officer</option>
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Department</label>
            <div className="relative">
              <Building2 className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <select
                value={formData.departmentId}
                onChange={(e) => setFormData({ ...formData, departmentId: e.target.value })}
                disabled={isDepsLoading}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-14 pr-10 py-4 text-sm text-slate-700 focus:border-emerald-500/50 focus:bg-white outline-none appearance-none cursor-pointer"
              >
                <option value="" disabled>Select Target Dept</option>
                {depfile && depfile.map((dep) => (
                  <option key={dep.id || dep._id} value={dep.id || dep._id}>{dep.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
            </div>
          </div>
        </div>

        {/* PASSWORD */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Temporary Password</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                value={formData.password}
                readOnly
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-14 pr-5 py-4 text-sm text-slate-700 font-mono outline-none"
                placeholder="Generate Secure Key →"
              />
            </div>
            <button
              type="button"
              onClick={generatePassword}
              className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100 hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
            >
              <RefreshCw size={20} />
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 space-y-4">
          <button
            type="button"
            onClick={copyToClipboard}
            className="w-full flex items-center justify-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-emerald-600 transition-colors"
          >
            {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
            {copied ? 'Credentials Copied' : 'Copy Credentials for User'}
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg active:scale-95"
          >
            {isLoading ? <RefreshCw className="animate-spin" size={20} /> : <Save size={20} />}
            <span className="uppercase tracking-widest text-sm">
              {editingUser ? 'Update Staff Member' : 'Register & Finalize'}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;