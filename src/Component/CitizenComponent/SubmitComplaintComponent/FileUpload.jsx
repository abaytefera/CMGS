import React, { useState } from 'react';
import { useSelector } from "react-redux";

export default function FileUpload() {
  const { Language } = useSelector((state) => state.webState);
  const [selectedFiles, setSelectedFiles] = useState([]);

 
  const t = {
    label: Language === "AMH" ? "ተያያዥ ፋይሎችን ይጫኑ" : "Upload Files",
    dropText: Language === "AMH" ? "ፋይሉን እዚህ ይጎትቱ ወይም ይጫኑ" : "Drag & drop or click to browse",
    supportedTypes: Language === "AMH" ? "ምስሎች፣ ቪዲዮዎች፣ ድምፅ፣ ፒዲኤፍ (PDF) እና ሌሎች" : "Images, Videos, Audio, PDFs, and more",
    audio: Language === "AMH" ? "ድምፅ" : "Audio",
    pdf: Language === "AMH" ? "ፒዲኤፍ" : "PDF",
    file: Language === "AMH" ? "ፋይል" : "File",
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map(file => {
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');
      const isAudio = file.type.startsWith('audio/');
      const isPdf = file.type === 'application/pdf';

      return {
        id: crypto.randomUUID(),
        file,
        name: file.name,
        type: file.type,
        category: isImage ? 'image' : isVideo ? 'video' : isAudio ? 'audio' : isPdf ? 'pdf' : 'other',
        preview: (isImage || isVideo) ? URL.createObjectURL(file) : null
      };
    });
    setSelectedFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (id) => {
    setSelectedFiles((prev) => {
      const fileToRemove = prev.find(f => f.id === id);
      if (fileToRemove?.preview) URL.revokeObjectURL(fileToRemove.preview);
      return prev.filter(f => f.id !== id);
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-4">
      <div className="mb-6">
        <label className="block text-lg font-semibold text-gray-800 mb-2">
          {t.label}
        </label>
        <div className="relative border-2 border-dashed border-green-300 rounded-2xl p-8 text-center hover:bg-green-50 transition-all group">
          <input 
            type="file" 
            multiple 
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
          />
          <div className="flex flex-col items-center">
            <span className="text-5xl mb-3 group-hover:scale-110 transition-transform">📤</span>
            <p className="text-gray-700 font-medium text-lg">{t.dropText}</p>
            <p className="text-sm text-gray-400 mt-1">{t.supportedTypes}</p>
          </div>
        </div>
      </div>

      {/* Preview Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {selectedFiles.map((fileObj) => (
          <div key={fileObj.id} className="relative group border rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow aspect-square flex flex-col items-center justify-center p-2">
            
            {fileObj.category === 'image' && (
              <img src={fileObj.preview} alt="preview" className="w-full h-full object-cover rounded-lg" />
            )}

            {fileObj.category === 'video' && (
              <video src={fileObj.preview} className="w-full h-full object-cover rounded-lg" />
            )}

            {fileObj.category === 'audio' && (
              <div className="flex flex-col items-center text-orange-500">
                <span className="text-4xl">🎵</span>
                <span className="text-[11px] mt-2 font-bold uppercase">{t.audio}</span>
              </div>
            )}

            {fileObj.category === 'pdf' && (
              <div className="flex flex-col items-center text-red-500">
                <span className="text-4xl">📄</span>
                <span className="text-[11px] mt-2 font-bold uppercase">{t.pdf}</span>
              </div>
            )}

            {fileObj.category === 'other' && (
              <div className="flex flex-col items-center text-blue-500">
                <span className="text-4xl">📦</span>
                <span className="text-[11px] mt-2 font-bold uppercase">{t.file}</span>
              </div>
            )}

            {/* Delete Button */}
            <button
              type="button"
              onClick={() => removeFile(fileObj.id)}
              className="absolute top-1.5 right-1.5 bg-white/90 hover:bg-red-500 hover:text-white text-gray-700 rounded-full w-7 h-7 flex items-center justify-center transition-all shadow-md z-10"
            >
              ✕
            </button>

            {/* Filename Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-[10px] px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity truncate">
              {fileObj.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}