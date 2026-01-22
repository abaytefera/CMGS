import React, { useState } from 'react';
import { useSelector } from "react-redux";
import {
  LayoutDashboard,
  LogOut,
  ChevronDown,
  ChevronUp,
  Lock,
  User,
  ShieldCheck,
  BarChart3, // ✅ PascalCase
  ClipboardList,
  Users,
  Layers,
  FileSearch,
  History
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ role }) => {
  const { Language } = useSelector((state) => state.webState);
  const location = useLocation();
  const [isCaseMgOpen, setIsCaseMgOpen] = useState(true);

  const dashboardUrl =
    role === "officer" ? "/Dashboard1" :
    role === "supervisor" ? "/Dashboard2" :
    role === "admin" ? "/Dashboard3" : "/Dashboard4";

  const t = {
    mainMenu: Language === "AMH" ? "ዋና ማውጫ" : "Main Menu",
    caseMg: Language === "AMH" ? "የቅሬታ አያያዝ" : "Case Management",
    allCases: Language === "AMH" ? "ሁሉም ቅሬታዎች" : "All Complaints",
    assigned: Language === "AMH" ? "የተመደቡ" : "Assigned to Me",
    categories: Language === "AMH" ? "የስራ ዘርፎች" : "Categories",
    departments: Language === "AMH" ? "ክፍሎች" : "Departments",
    userMg: Language === "AMH" ? "ተጠቃሚዎች" : "User Management",
    reports: Language === "AMH" ? "ሪፖርት" : "Reports",
    logout: Language === "AMH" ? "ውጣ" : "Logout",
    profile: Language === "AMH" ? "መገለጫ" : "Profile",
    password: Language === "AMH" ? "የይለፍ ቃል" : "Password",
    systemSettings: Language === "AMH" ? "የስርዓት ቅንብሮች" : "System Settings"
  };

  const isActive = (url) => location.pathname === url;

  return (
    <aside className="hidden lg:flex w-64 h-screen bg-white border-r border-gray-200 flex-col px-4 py-6 sticky top-0 overflow-y-auto">
      
      {/* Logo */}
      <div className="mb-10 px-2">
        <Link to={dashboardUrl}>
          <img
            src="https://res.cloudinary.com/dkzvlqjp9/image/upload/v1768827371/logo_xebgif.png"
            alt="EPA Logo"
            className="w-36 h-auto"
          />
        </Link>
      </div>

      <nav className="flex-1 space-y-7">
        
        {/* Dashboard */}
        <Link
          to={dashboardUrl}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
            isActive(dashboardUrl)
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-100"
              : "text-gray-600 hover:bg-gray-50 hover:text-emerald-600"
          }`}
        >
          <LayoutDashboard size={20} />
          <span className="text-sm font-bold">Dashboard</span>
        </Link>

        {/* Case Management Section */}
        <div>
          <button 
            onClick={() => setIsCaseMgOpen(!isCaseMgOpen)}
            className="w-full flex items-center justify-between px-4 mb-3 text-xs font-bold text-gray-400 uppercase tracking-widest"
          >
            {t.caseMg}
            {isCaseMgOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
          
          {isCaseMgOpen && (
            <div className="space-y-1">
              {role === "admin" && (
                <>
                  <Link to="/CatagoryMg" className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium ${isActive("/CatagoryMg") ? "text-emerald-600 bg-emerald-50" : "text-gray-600 hover:bg-gray-50"}`}>
                    <Layers size={18} /> {t.categories}
                  </Link>
                  <Link to="/DepartmentMg" className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium ${isActive("/DepartmentMg") ? "text-emerald-600 bg-emerald-50" : "text-gray-600 hover:bg-gray-50"}`}>
                    <ShieldCheck size={18} /> {t.departments}
                  </Link>
                  <Link to="/userMg" className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium ${isActive("/userMg") ? "text-emerald-600 bg-emerald-50" : "text-gray-600 hover:bg-gray-50"}`}>
                    <Users size={18} /> {t.userMg}
                  </Link>
                </>
              )}
              <Link to="/Report" className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium ${isActive("/Report") ? "text-emerald-600 bg-emerald-50" : "text-gray-600 hover:bg-gray-50"}`}>
                <BarChart3 size={18} /> {t.reports}
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Account Section */}
      <div className="pt-6 border-t border-gray-100 space-y-1">
        <p className="px-4 mb-2 text-xs font-bold text-gray-400 uppercase tracking-widest">Account</p>
        
        <Link to="/Profile" className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium ${isActive("/Profile") ? "text-emerald-600 bg-emerald-50" : "text-gray-600 hover:bg-gray-50"}`}>
          <User size={18} /> {t.profile}
        </Link>

        <Link to="/passwordChange" className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium ${isActive("/passwordChange") ? "text-emerald-600 bg-emerald-50" : "text-gray-600 hover:bg-gray-50"}`}>
          <Lock size={18} /> {t.password}
        </Link>

        {role === "admin" && (
          <Link to="/SystemMg" className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-bold text-emerald-700 hover:bg-emerald-50 mt-1`}>
            <History size={18} /> {t.systemSettings}
          </Link>
        )}

        <button className="w-full flex items-center gap-3 px-4 py-3 mt-4 rounded-xl text-red-600 hover:bg-red-50 font-bold transition-colors">
          <LogOut size={20} />
          <span className="text-sm">{t.logout}</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;