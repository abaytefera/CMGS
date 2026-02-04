import React, { useState, useEffect, useRef } from "react";
import { toEthiopian, toGregorian } from "ethiopian-date";

const MONTHS = [
  "Meskerem", "Tikimt", "Hidar", "Tahsas",
  "Tir", "Yekatit", "Megabit", "Miazia",
  "Ginbot", "Sene", "Hamle", "Nehasse", "Pagume"
];

const EthioDatePicker = ({ label, value, onChange }) => {
  // 2. DYNAMICALLY FIND CURRENT ETHIOPIAN YEAR
  const today = new Date();
  const [currentEthYear] = toEthiopian(today.getFullYear(), today.getMonth() + 1, today.getDate());

  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(currentEthYear); 
  const [showYearPicker, setShowYearPicker] = useState(false);
  
  const yearPickerRef = useRef(null);

  // Sync internal UI state when 'value' prop changes
  useEffect(() => {
    if (value && !isNaN(value.getTime())) {
      const [y, m, d] = toEthiopian(value.getFullYear(), value.getMonth() + 1, value.getDate());
      setMonth(m);
      setYear(y);
    }
  }, [value]);

  // Scroll to active year when year picker opens
  useEffect(() => {
    if (showYearPicker && yearPickerRef.current) {
      const activeBtn = yearPickerRef.current.querySelector(".active-year");
      if (activeBtn) {
        activeBtn.scrollIntoView({ block: "center", behavior: "smooth" });
      }
    }
  }, [showYearPicker]);

  const daysInMonth = month === 13 ? (year % 4 === 3 ? 6 : 5) : 30;

  const formattedValue = value && !isNaN(value.getTime())
    ? (() => {
        const [y, m, d] = toEthiopian(value.getFullYear(), value.getMonth() + 1, value.getDate());
        return `${d}/${m}/${y}`;
      })()
    : "";

  // Generate Year Range dynamically based on current year
  const years = Array.from({ length: 100 }, (_, i) => (currentEthYear - 80) + i);

  return (
    <div className="w-full relative">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
        {label}
      </label>

      <div className="mt-2 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm min-h-[280px]">
        <div className="mb-3 text-xs font-bold text-emerald-700 border-b border-slate-100 pb-2 flex justify-between">
          <span>{formattedValue || "Pick a date"}</span>
          {formattedValue && (
            <button onClick={() => onChange(null)} className="text-slate-300 hover:text-red-400">✕</button>
          )}
        </div>

        <div className="flex justify-between items-center mb-4">
          <button 
            onClick={() => setShowYearPicker(!showYearPicker)}
            className="text-[11px] font-black bg-slate-100 px-3 py-1 rounded-full hover:bg-emerald-100 transition-colors"
          >
            {year} {showYearPicker ? "▲" : "▼"}
          </button>
          
          <div className="flex items-center gap-2">
            <button onClick={() => setMonth(m => (m === 1 ? 13 : m - 1))} className="text-slate-400 hover:text-black">◀</button>
            <span className="font-bold text-xs w-20 text-center text-slate-700">{MONTHS[month - 1]}</span>
            <button onClick={() => setMonth(m => (m === 13 ? 1 : m + 1))} className="text-slate-400 hover:text-black">▶</button>
          </div>
        </div>

        {showYearPicker && (
          <div 
            ref={yearPickerRef}
            className="absolute inset-x-4 top-[85px] bottom-4 bg-white z-20 grid grid-cols-4 gap-1 overflow-y-auto p-2 border rounded-xl shadow-xl border-emerald-100"
          >
            {years.map(y => (
              <button 
                key={y} 
                onClick={() => { setYear(y); setShowYearPicker(false); }}
                className={`text-[10px] py-2 rounded-lg font-bold transition-colors ${
                  y === year ? 'bg-emerald-600 text-white active-year' : 'hover:bg-slate-100 text-slate-500'
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const isSelected = value && formattedValue === `${day}/${month}/${year}`;
            
            return (
              <button
                key={day}
                onClick={() => {
                  const [gY, gM, gD] = toGregorian(year, month, day);
                  onChange(new Date(gY, gM - 1, gD));
                }}
                className={`py-2 rounded-xl text-[10px] font-bold transition-all ${
                  isSelected ? "bg-emerald-600 text-white shadow-md shadow-emerald-200" : "hover:bg-emerald-50 text-slate-600"
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EthioDatePicker;