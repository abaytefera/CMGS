import React from 'react';
import { FileText, Table, Printer, Share2 } from 'lucide-react';

const ExportPanel = () => {
  return (
    <div className="flex flex-wrap gap-4 mb-8">
      <button className="flex items-center gap-2 px-6 py-3 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-2xl hover:bg-rose-500 hover:text-white transition-all">
        <FileText size={16} />
        <span className="text-[10px] font-black uppercase tracking-widest">Export PDF</span>
      </button>
      
      <button className="flex items-center gap-2 px-6 py-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-2xl hover:bg-emerald-500 hover:text-white transition-all">
        <Table size={16} />
        <span className="text-[10px] font-black uppercase tracking-widest">Download Excel</span>
      </button>

      <button className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-slate-400 rounded-2xl hover:text-white transition-all">
        <Printer size={16} />
        <span className="text-[10px] font-black uppercase tracking-widest">Print Table</span>
      </button>
    </div>
  );
};

export default ExportPanel;