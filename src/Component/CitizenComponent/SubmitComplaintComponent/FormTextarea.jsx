export default function FormTextarea({ Icon, label, placeholder, name }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {Icon && <Icon className="inline mr-2" />} {label}
      </label>
      <textarea
        name={name} // Crucial for FormData
        rows="5"
        placeholder={placeholder}
        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
      />
    </div>
  );
}