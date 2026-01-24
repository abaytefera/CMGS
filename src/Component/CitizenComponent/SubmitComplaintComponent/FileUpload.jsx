import React, { useState } from 'react';
import { useSelector } from "react-redux";
// Icons
import { UploadCloud, X } from "lucide-react";

export default function FileUpload({ name }) {
  const { Language } = useSelector((state) => state.webState);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const t = {
    label: Language === "AMH" ? "ተያያዥ ፋይሎችን ይጫኑ" : "Supporting Evidence",
    dropText: Language === "AMH" ? "ፋይሉን እዚህ ይጎትቱ ወይም ይጫኑ" : "Drop files here or click to upload",
    supportedTypes: Language === "AMH" ? "ምስሎች፣ ቪዲዮዎች፣ ድምፅ፣ ፒዲኤፍ" : "Images, Videos, Audio, PDFs",
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map(file => ({
      id: crypto.randomUUID(),
      file,
      name: file.name,
      type: file.type,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
    }));
    setSelectedFiles((prev) => [...prev, ...newFiles]);
    
    
  };

  const removeFile = (id) => {
    setSelectedFiles(prev => {
      const filtered = prev.filter(f => f.id !== id);
      // Clean up memory for the preview URL
      const removed = prev.find(f => f.id === id);
      if (removed?.preview) URL.revokeObjectURL(removed.preview);
      return filtered;
    });
  };

  return (
    <div className="py-4">
      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">
        {t.label}
      </label>
      
      <div className="relative border-2 border-dashed border-gray-100 rounded-[2rem] p-10 text-center hover:bg-emerald-50/30 hover:border-emerald-200 transition-all group cursor-pointer">
        {/* CRITICAL: name={name} connects this to your FormData.
          The 'multiple' attribute allows selecting more than one file.
        */}
        <input 
          type="file" 
          name={name} 
          multiple 
          onChange={handleFileChange} 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
        />
        
        <div className="flex flex-col items-center">
          <div className="p-4 bg-emerald-50 rounded-2xl text-emerald-600 mb-4 group-hover:scale-110 transition-transform">
            <UploadCloud size={32} />
          </div>
          <p className="text-gray-900 font-bold text-sm">{t.dropText}</p>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-2">{t.supportedTypes}</p>
        </div>
      </div>

      {/* Preview Grid */}
      {selectedFiles.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {selectedFiles.map((file) => (
            <div key={file.id} className="relative aspect-square rounded-2xl overflow-hidden border border-gray-100 bg-gray-50">
              {file.preview ? (
                <img src={file.preview} alt="prev" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[10px] font-black uppercase text-gray-400 px-2 text-center">
                  {file.name}
                </div>
              )}
              <button 
                type="button" // Prevents form submission
                onClick={() => removeFile(file.id)}
                className="absolute top-2 right-2 bg-white shadow-lg rounded-lg p-1 text-rose-500 hover:bg-rose-500 hover:text-white transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}