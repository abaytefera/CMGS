import React from 'react';
import { Shield, LifeBuoy, Terminal, Cpu } from 'lucide-react';

const AuthFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-gray-200 bg-white px-8 py-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        {/* System Status */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-600" />
            <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
              System Online
            </span>
          </div>

          <div className="hidden md:block h-4 w-px bg-gray-300" />

          <div className="flex items-center gap-2 text-gray-500">
            <Cpu size={14} />
            <span className="text-xs font-medium">
              v2.4.0
            </span>
          </div>
        </div>

        {/* Links */}
        <div className="flex items-center gap-8">
          <a href="#support" className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition">
            <LifeBuoy size={14} />
            <span className="text-xs font-medium uppercase">
              IT Support
            </span>
          </a>

          <a href="#docs" className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition">
            <Terminal size={14} />
            <span className="text-xs font-medium uppercase">
              Documentation
            </span>
          </a>

          <a href="#privacy" className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition">
            <Shield size={14} />
            <span className="text-xs font-medium uppercase">
              Data Privacy
            </span>
          </a>
        </div>

        {/* Copyright */}
        <div className="text-xs font-medium text-gray-500">
          © {currentYear} <span className="font-semibold text-gray-700">EPA Ethiopia</span>
        </div>

      </div>
    </footer>
  );
};

export default AuthFooter;
