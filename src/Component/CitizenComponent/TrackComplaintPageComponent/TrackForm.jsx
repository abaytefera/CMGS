import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useSelector } from "react-redux";

const TrackForm = ({ onTrack }) => {
  const { Language } = useSelector((state) => state.webState);
  const [ref, setRef] = useState("");

  
  const t = {
    title: Language === "AMH" ? "አቤቱታዎን ይከታተሉ" : "Track Your Complaint",
    subtitle: Language === "AMH" ? "የአቤቱታዎን ዝርዝር ለማየት የመለያ ቁጥርዎን ያስገቡ።" : "Enter your reference number to view complaint details.",
    label: Language === "AMH" ? "የመለያ ቁጥር" : "Reference Number",
    placeholder: Language === "AMH" ? "ምሳሌ፦ CGMS-00125" : "e.g. CGMS-00125",
    button: Language === "AMH" ? "አቤቱታውን ፈልግ" : "Track Complaint"
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-50">
      <div className="text-center mb-8">
        <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-4 shadow-inner">
          <FontAwesomeIcon 
            icon={faMagnifyingGlass} 
            className="text-green-600 text-3xl animate-pulse" 
          />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">{t.title}</h1>
        <p className="text-gray-500 mt-2 font-medium">{t.subtitle}</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">
            {t.label}
          </label>
          <input
            type="text"
            value={ref}
            onChange={(e) => setRef(e.target.value)}
            placeholder={t.placeholder}
            className="w-full border-2 border-gray-100 rounded-xl px-4 py-4 focus:border-green-500 focus:ring-4 focus:ring-green-50 focus:outline-none transition-all font-mono text-lg"
          />
        </div>

        <button
          onClick={() => onTrack(ref)}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-green-100 transition-all active:scale-95 flex items-center justify-center gap-3"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          {t.button}
        </button>
      </div>
    </div>
  );
};

export default TrackForm;