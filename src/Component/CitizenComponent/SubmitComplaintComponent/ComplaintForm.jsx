import React from 'react';
import { useSelector } from "react-redux";
// UI Components
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormTextarea from "./FormTextarea";
import FileUpload from "./FileUpload";
import LocationInput from "./LocationInput";
// Icons
import { FaListUl, FaPen, FaPhone, FaUser, FaEnvelope } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Loader2 } from "lucide-react";

export default function ComplaintForm({ onSubmit, isLoading }) {
  const { Language } = useSelector((state) => state.webState);

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
    categories: Language === "AMH" ? 
      ["የአየር ብክለት", "የውሃ ብክለት", "ሕገ-ወጥ የቆሻሻ አወጋገድ", "የድምፅ ብክለት", "ሌላ"] : 
      ["Air Pollution", "Water Pollution", "Illegal Dumping", "Noise Pollution", "Other"]
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 1. Capture the form using the native FormData API
    const formData = new FormData(e.currentTarget);

   
    
    // To convert to a plain object for logging/simple APIs:
    const data = Object.fromEntries(formData.entries());
    
    console.log("Form submitted with data:", data);
    console.log(formData);
    
    onSubmit(formData); 
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-white border border-gray-100 rounded-[2.5rem] shadow-sm p-8 md:p-12 space-y-8"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <FormInput 
          name="citizen_name" 
          Icon={FaUser} 
          label={t.fullName} 
          placeholder={t.namePlaceholder} 
          required 
        />
        <FormInput 
          name="phone_number" 
          Icon={FaPhone} 
          label={t.phone} 
          required 
          placeholder="+251..." 
        />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <FormInput 
          name="email" 
          Icon={FaEnvelope} 
          label={t.email} 
          placeholder="email@example.com" 
        />
        {/* 'name' prop is used for the hidden input inside LocationInput */}
        <LocationInput 
          name="location" 
          label={t.location} 
          required={true} 
        />
      </div>

      <FormSelect
        name="category"
        Icon={FaListUl}
        label={t.category}
        options={t.categories}
      />

      <FormTextarea
        name="description"
        Icon={FaPen}
        label={t.description}
        placeholder={t.descPlaceholder}
      />

      {/* 'name' prop ensures files are keyed as 'files' in the FormData */}
      <FileUpload name="attachments" />

      <div className="text-center pt-6">
        <button
          type="submit"
          disabled={isLoading}
          className="group relative w-full px-12 py-4 bg-emerald-600 text-white font-black uppercase tracking-[0.2em] text-[11px] rounded-2xl shadow-xl shadow-emerald-100 hover:bg-emerald-700 transition-all flex items-center justify-center gap-3 mx-auto disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <>
              {t.submit}
              <FontAwesomeIcon 
                icon={faChevronRight} 
                className="text-[10px] group-hover:translate-x-1 transition-transform" 
              />
            </>
          )}
        </button>
      </div>
    </form>
  );
}