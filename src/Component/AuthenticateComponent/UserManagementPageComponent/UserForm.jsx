import React, { useEffect, useState } from 'react';
import { UserPlus, Mail, Lock, Save, X, RefreshCw, Copy, Check, Phone, Building2 } from 'lucide-react';

// Added 'onSave' and 'departments' to props
const UserForm = ({ editingUser, onCancel, onSave, departments }) => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', role: 'Field Officer', department: '', password: '', active: true
  });
  const [copied, setCopied] = useState(false);

  // --- EMAIL GENERATION LOGIC ---
  const handleNameInput = (fullName) => {
    const nameParts = fullName.trim().toLowerCase().split(/\s+/);
    let emailSuggestion = '';

    if (nameParts.length === 1 && nameParts[0] !== '') {
      emailSuggestion = `${nameParts[0]}@epa.gov`;
    } else if (nameParts.length >= 2) {
      const firstName = nameParts[0];
      const lastName = nameParts[nameParts.length - 1];
      emailSuggestion = `${firstName[0]}.${lastName}@epa.gov`;
    }

    setFormData({ ...formData, name: fullName, email: emailSuggestion });
  };

  // --- PASSWORD GENERATION LOGIC ---
  const generatePassword = () => {
    const charset = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789!@#$";
    let retVal = "";
    for (let i = 0; i < 12; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setFormData(prev => ({ ...prev, password: retVal }));
  };

  // --- COPY ALL LOGIC ---
  const copyToClipboard = () => {
    const text = `
    OFFICER REGISTRATION DETAILS:
    ----------------------------
    Name: ${formData.name}
    Email: ${formData.email}
    Phone: ${formData.phone}
    Password: ${formData.password}
    Role: ${formData.role}
    Department: ${formData.department}
    `;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- SUBMIT LOGIC ---
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.department) return alert("Name and Department are required!");
    onSave(formData);
  };

  useEffect(() => {
    if (editingUser) setFormData(editingUser);
    else setFormData({ name: '', email: '', phone: '', role: 'Field Officer', department: '', password: '', active: true });
  }, [editingUser]);

  return (
    <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl sticky top-32">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-black text-white uppercase italic flex items-center gap-2">
          <div className="w-2 h-8 bg-emerald-500 rounded-full" />
          {editingUser ? 'Update Officer' : 'Register Officer'}
        </h2>
        {editingUser && <button onClick={onCancel} className="text-slate-500 hover:text-white"><X size={20}/></button>}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* NAME INPUT */}
        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
          <input 
            type="text" 
            value={formData.name}
            onChange={(e) => handleNameInput(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:border-emerald-500/50 outline-none transition-all" 
            placeholder="e.g. Abebe Kebede"
          />
        </div>

        {/* PHONE & ROLE ROW */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input 
                type="tel" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm text-white focus:border-emerald-500/50 outline-none" 
                placeholder="09..."
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Assign Role</label>
            <select 
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              className="w-full bg-[#0d151c] border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:border-emerald-500/50 outline-none appearance-none cursor-pointer"
            >
              <option>Field Officer</option>
              <option>Supervisor</option>
              <option>Admin</option>
            </select>
          </div>
        </div>

        {/* DEPARTMENT ASSIGNMENT (NEW) */}
        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Department</label>
          <div className="relative">
            <Building2 className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <select 
              value={formData.department}
              onChange={(e) => setFormData({...formData, department: e.target.value})}
              className="w-full bg-[#0d151c] border border-white/10 rounded-2xl pl-14 pr-5 py-4 text-sm text-white focus:border-emerald-500/50 outline-none appearance-none cursor-pointer"
            >
              <option value="">Choose Department</option>
              {departments && departments.map((dept, i) => (
                <option key={i} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>

        {/* AUTO-GENERATED EMAIL */}
        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">System Email</label>
          <div className="relative">
            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-500/50" size={18} />
            <input 
              type="email" 
              value={formData.email}
              readOnly 
              className="w-full bg-emerald-500/5 border border-emerald-500/20 rounded-2xl pl-14 pr-5 py-4 text-sm text-emerald-400 font-bold outline-none cursor-default" 
            />
          </div>
        </div>

        {/* PASSWORD GENERATOR */}
        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">System Password</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
              <input 
                type="text" 
                value={formData.password}
                readOnly
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-5 py-4 text-sm text-white font-mono outline-none" 
                placeholder="Click → to generate"
              />
            </div>
            <button 
              type="button" 
              onClick={generatePassword}
              className="p-4 bg-emerald-500/10 text-emerald-500 rounded-2xl border border-emerald-500/20 hover:bg-emerald-500 hover:text-black transition-all"
            >
              <RefreshCw size={20} />
            </button>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="pt-4 border-t border-white/5 space-y-4">
            <button 
              type="button"
              onClick={copyToClipboard}
              className="w-full flex items-center justify-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-white transition-colors"
            >
              {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
              {copied ? 'Profile Copied' : 'Copy Full Profile for user'}
            </button>

            <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-400 text-[#080d14] font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-[0_10px_30px_rgba(16,185,129,0.2)] active:scale-95">
              <Save size={20} />
              <span className="uppercase tracking-widest text-sm">
                {editingUser ? 'Save Updates' : 'Complete Setup'}
              </span>
            </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;