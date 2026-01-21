import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { LayoutDashboard, Settings, LogOut, ChevronDown, ChevronUp, Lock, User, Database, ShieldCheck, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar = ({ role }) => {
  const { Language } = useSelector((state) => state.webState);
  // Assuming user role is stored in your Redux state
  const { user } = useSelector((state) => state.auth || {}); 
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
const url=role==="supervisor" ?"/Dashboard1":role==="supervisor"?"/Dashboard2":role==="admin"?"/Dashboard3":"/Dashboard4"
  const menuItems = [
    {
      icon: LayoutDashboard,
      label: Language === "AMH" ? 'ዳሽቦርድ' : 'Dashboard',
      key: 'Dashboard',
      url: url
   
    },
   {
  icon: BarChart3, 
  label: Language === "AMH" ? 'ሪፖርት' : 'Reports',
  key: 'Reports',
  url: '/Report' 

},
  ];

  const t = {
    mainMenu: Language === "AMH" ? "ዋና ማውጫ" : "Main Menu",
    settings: Language === "AMH" ? "ቅንብሮች" : "Settings",
    logout: Language === "AMH" ? "ውጣ" : "Logout",
    password: Language === "AMH" ? "የይለፍ ቃል" : "Password",
    profile: Language === "AMH" ? "መገለጫ" : "Profile",
    fql: "FQL",
    systemSettings: Language === "AMH" ? "የስርዓት ቅንብሮች" : "System Settings"
  };

  return (
    <aside className="hidden lg:flex w-64 h-screen bg-white border-r border-slate-100 flex-col p-4 sticky top-0">
      <div className="flex-shrink-0 mb-8">
        <Link to={url}>
          <img
            src="https://res.cloudinary.com/dkzvlqjp9/image/upload/v1768827371/logo_xebgif.png"
            alt="Logo"
            className="w-40 h-auto"
          />
        </Link>
      </div>

      <nav className="flex-1 space-y-2">
        <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
          {t.mainMenu}
        </p>
        {menuItems.map((item) => (
          <Link to={item.url}
            key={item.key}
            onClick={() => setActiveTab(item.key)}
            className={`w-full  ${item.key==="Reports" ?  (role==="manager"? "flex":"hidden"):"flex"} items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === item.key
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-500 hover:bg-emerald-50 hover:text-emerald-600'
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="pt-6 border-t border-slate-100 space-y-1">
        {/* SETTINGS PARENT BUTTON */}
        <button 
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${
            isSettingsOpen ? 'bg-slate-50 text-emerald-600' : 'text-slate-500 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center space-x-3">
            <Settings size={20} />
            <span className="font-medium">{t.settings}</span>
          </div>
          {isSettingsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {/* DROPDOWN OPTIONS */}
        {isSettingsOpen && (
          <div className="ml-4 space-y-1 mt-1 border-l-2 border-slate-50">
            <Link to="/passwordChange" className="flex items-center space-x-3 px-4 py-2 text-sm text-slate-500 hover:text-emerald-600">
              <Lock size={16} /> <span>{t.password}</span>
            </Link>
            
            <Link to="/Profile" className="flex items-center space-x-3 px-4 py-2 text-sm text-slate-500 hover:text-emerald-600">
              <User size={16} /> <span>{t.profile}</span>
            </Link>

            <Link to="/settings/fql" className="flex items-center space-x-3 px-4 py-2 text-sm text-slate-500 hover:text-emerald-600">
              <Database size={16} /> <span>{t.fql}</span>
            </Link>

            {/* ADMIN ONLY OPTION */}
            {role === 'admin' && (
              <Link to="/SystemMg" className="flex items-center space-x-3 px-4 py-2 text-sm text-emerald-700 font-semibold hover:bg-emerald-50 rounded-lg">
                <ShieldCheck size={16} /> <span>{t.systemSettings}</span>
              </Link>
            )}
          </div>
        )}

        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors mt-4">
          <LogOut size={20} />
          <span className="font-medium">{t.logout}</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;