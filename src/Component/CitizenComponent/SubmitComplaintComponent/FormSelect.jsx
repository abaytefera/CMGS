export default function FormSelect({Icon, label, options }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
       {Icon && <Icon className="inline mr-2" />} {label}
      </label>
      <select className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500">
        <option>Select category</option>
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
