import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormTextarea from "./FormTextarea";
import FileUpload from "./FileUpload";
import LocationInput from "./LocationInput";
import { FaListUl, FaPen, FaPhone, FaUser, FaEnvelope } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ComplaintForm() {
  const { Language } = useSelector((state) => state.webState);
 const Navigate=useNavigate();

  const t = {
    fullName: Language === "AMH" ? "ሙሉ ስም" : "Full Name",
    namePlaceholder: Language === "AMH" ? "ስምዎን እዚህ ያስገቡ" : "Your name",
    phone: Language === "AMH" ? "ስልክ ቁጥር" : "Phone",
    email: Language === "AMH" ? "ኢሜይል" : "Email",
    location: Language === "AMH" ? "አድራሻ / ቦታ" : "Location",
    category: Language === "AMH" ? "የቅሬታው ዘርፍ" : "Complaint Category",
    description: Language === "AMH" ? "ዝርዝር መግለጫ" : "Description",
    descPlaceholder: Language === "AMH" ? "ስለ ጉዳዩ በዝርዝር እዚህ ይጻፉ..." : "Describe the issue in detail...",
    submit: Language === "AMH" ? "ቅሬታውን ያቅርቡ" : "Submit Complaint",
    categories: Language === "AMH" ? [
      "የአየር ብክለት",
      "የውሃ ብክለት",
      "ሕገ-ወጥ የቆሻሻ አወጋገድ",
      "የድምፅ ብክለት",
      "ሌላ"
    ] : [
      "Air Pollution",
      "Water Pollution",
      "Illegal Dumping",
      "Noise Pollution",
      "Other",
    ]
  };
  const SubmitHandle=(e)=>{
   e.preventDefault();
    console.log("abay");
Navigate('/ComplaintSubmittedPage')

  }



  return (
    <form className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      
      <div className="grid md:grid-cols-2 gap-6">
        <FormInput Icon={FaUser} label={t.fullName} placeholder={t.namePlaceholder} />
        <FormInput Icon={FaPhone} label={t.phone} required placeholder="+251..." />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <FormInput Icon={FaEnvelope} label={t.email} placeholder="email@example.com" />
        <LocationInput label={t.location} required={true} />
      </div>

      <FormSelect
        Icon={FaListUl}
        label={t.category}
        options={t.categories}
      />

      <FormTextarea
        Icon={FaPen}
        label={t.description}
        placeholder={t.descPlaceholder}
      />

      <FileUpload />

      <div className="text-center pt-4">
        <button
          type="submit"
          onClick={SubmitHandle}
          className="px-8 py-3 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition-all flex items-center justify-center gap-2 mx-auto group"
        >
          {t.submit}
          <FontAwesomeIcon 
            icon={faChevronRight} 
            className="text-sm group-hover:translate-x-1 transition-transform" 
          />
        </button>
      </div>
    </form>
  );
}