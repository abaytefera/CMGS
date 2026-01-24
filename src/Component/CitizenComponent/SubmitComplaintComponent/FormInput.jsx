export default function FormInput({ Icon, label, required, placeholder, name }) {
  return (
    <div className="w-full">
      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2.5 px-1">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors">
          {Icon && <Icon size={16} />}
        </div>
        <input
          name={name}
          type="text"
          placeholder={placeholder}
          required={required}
          className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold text-gray-900 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 outline-none transition-all placeholder:text-gray-300"
        />
      </div>
    </div>
  );
}