import React from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const AttachmentModal = ({ open, files = [], activeIndex = 0, onClose, setActiveIndex }) => {
  if (!open || files.length === 0) return null;

  const activeFile = files[activeIndex];

  const prevFile = () => {
    setActiveIndex((prev) => (prev === 0 ? files.length - 1 : prev - 1));
  };

  const nextFile = () => {
    setActiveIndex((prev) => (prev === files.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-auto relative p-6 flex flex-col items-center">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-500 hover:text-rose-600"
        >
          <X size={20} />
        </button>

        <h2 className="text-lg font-black text-slate-900 mb-4">{activeFile.original_name || "Attachment"}</h2>

        <div className="relative w-full flex justify-center items-center">
          {files.length > 1 && (
            <button
              onClick={prevFile}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow hover:bg-slate-100"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {activeFile.file_type.startsWith("image/") ? (
            <img
              src={activeFile.file_path}
              alt={activeFile.original_name}
              className="max-h-[70vh] object-contain rounded-lg shadow"
            />
          ) : activeFile.file_type.startsWith("video/") ? (
            <video controls className="max-h-[70vh] w-full rounded-lg shadow">
              <source src={activeFile.file_path} type={activeFile.file_type} />
            </video>
          ) : activeFile.file_type.startsWith("audio/") ? (
            <audio controls className="w-full mt-4">
              <source src={activeFile.file_path} type={activeFile.file_type} />
            </audio>
          ) : (
            <iframe
              src={activeFile.file_path}
              title={activeFile.original_name}
              className="w-full h-[70vh] rounded-lg border"
            ></iframe>
          )}

          {files.length > 1 && (
            <button
              onClick={nextFile}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow hover:bg-slate-100"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttachmentModal;