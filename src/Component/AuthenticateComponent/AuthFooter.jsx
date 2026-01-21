import React from 'react';
import { Shield, LifeBuoy, Terminal, Cpu } from 'lucide-react';

const AuthFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-white/5 bg-[#080d14]/50 backdrop-blur-md px-8 py-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* System Status Indicator */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              System Online
            </span>
          </div>
          <div className="h-4 w-[1px] bg-white/10 hidden md:block" />
          <div className="flex items-center gap-2 text-slate-500">
            <Cpu size={14} />
            <span className="text-[10px] font-bold uppercase tracking-tight">v2.4.0-stable</span>
          </div>
        </div>

        {/* Support & Quick Links */}
        <div className="flex items-center gap-8">
          <a href="#support" className="flex items-center gap-2 text-slate-500 hover:text-blue-400 transition-colors group">
            <LifeBuoy size={14} className="group-hover:rotate-12 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-widest">IT Support</span>
          </a>
          <a href="#docs" className="flex items-center gap-2 text-slate-500 hover:text-blue-400 transition-colors">
            <Terminal size={14} />
            <span className="text-[10px] font-black uppercase tracking-widest">Documentation</span>
          </a>
          <a href="#privacy" className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors">
            <Shield size={14} />
            <span className="text-[10px] font-black uppercase tracking-widest">Data Privacy</span>
          </a>
        </div>

        {/* Copyright */}
        <div className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
          &copy; {currentYear} <span className="text-slate-500">EPA Ethiopia</span>
        </div>

      </div>
    </footer>
  );
};

export default AuthFooter;