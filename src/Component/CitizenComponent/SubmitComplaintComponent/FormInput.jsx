import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function FormInput({  Icon,label, required, placeholder }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
{Icon && <Icon className="inline mr-2" />}{label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
      />
    </div>
  );
}
