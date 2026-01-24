import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { 
  LayoutDashboard, Settings, LogOut, ChevronDown, ChevronUp, 
  Lock, User, Database, ShieldCheck, BarChart3, 
  Briefcase, Users, CheckCircle2, ListTodo 
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ role }) => {
  const { Language } = useSelector((state) => state.webState);
  const location = useLocation();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Dynamic Dashboard URL mapping
  const roleRoutes = {
    admin: "/Dashboard3",
    supervisor: "/Dashboard2",
    manager: "/DashboardDashboard",
    officer: "/Dashboard1"
  };

  const dashboardUrl = roleRoutes[role] || "/Dashboard1";

  const t = {
    mainMenu: Language === "AMH" ? "ዋና ማውጫ" : "Main Menu",
    caseMgmt: Language === "AMH" ? "የጉዳይ አያያዝ" : "Case Management",
    dashboard: Language === "AMH" ? "ዳሽቦርድ" : "Dashboard",
    reports: Language === "AMH" ? "ሪፖርት" : "Reports",
    allComplaints: Language === "AMH" ? "ሁሉም አቤቱታዎች" : "All Complaints",
    assignTasks: Language === "AMH" ? "ስራ መመደብ" : "Assign Tasks",
    userMgmt: Language === "AMH" ? "ተጠቃሚዎች" : "User Management",
    myTasks: Language === "AMH" ? "የእኔ ስራዎች" : "My Task List",
    settings: Language === "AMH" ? "ቅንብሮች" : "Settings",
    logout: Language === "AMH" ? "ውጣ" : "Logout",
    password: Language === "AMH" ? "የይለፍ ቃል" : "Password",
    profile: Language === "AMH" ? "መገለጫ" : "Profile",
    systemSettings: Language === "AMH" ? "የስርዓት ቅንብሮች" : "System Settings"
  };

  /**
   * NAVIGATION CONFIGURATION
   * Only 'manager' has access to Reports.
   */
  const menuItems = [
    { 
      icon: LayoutDashboard, 
      label: t.dashboard, 
      key: 'Dashboard', 
      url: dashboardUrl, 
      visible: true // All roles see dashboard
    },
    { 
      icon: BarChart3, 
      label: t.reports, 
      key: 'Reports', 
      url: '/Report', 
      visible: role === 'manager' // STRICT ACCESS: Only Manager
    },
  ];

  const caseItems = [
    { 
      icon: Briefcase, 
      label: t.allComplaints, 
      url: '/Complaintlist/all', 
      visible: ['admin', 'supervisor', 'manager'].includes(role) 
    },
    { 
      icon: ListTodo, 
      label: t.assignTasks, 
      url: '/NotAssignComplainList/notAssign', 
      visible: ['admin', 'supervisor'].includes(role) 
    },
    { 
      icon: CheckCircle2, 
      label: t.myTasks, 
      url: '/OfficerTasks', 
      visible: role === 'officer' 
    },
    { 
      icon: Users, 
      label: t.userMgmt, 
      url: '/UserManagement', 
      visible: role === 'admin' 
    },
  ];

  const NavLink = ({ item }) => {
    if (!item.visible) return null;
    
    const isActive = location.pathname === item.url;

    return (
      <Link 
        to={item.url}
        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
          isActive
            ? 'bg-emerald-600 text-white shadow-md'
            : 'text-slate-500 hover:bg-emerald-50 hover:text-emerald-600'
        }`}
      >
        <item.icon size={20} />
        <span className="font-medium text-sm">{item.label}</span>
      </Link>
    );
  };

  return (
    <aside className="hidden lg:flex w-64 h-screen bg-white border-r border-slate-100 flex-col p-4 sticky top-0 shadow-sm">
      <div className="flex-shrink-0 mb-10 px-2">
        <Link to={dashboardUrl}>
          <img
            src="https://res.cloudinary.com/dkzvlqjp9/image/upload/v1768827371/logo_xebgif.png"
            alt="Logo"
            className="w-40 h-auto"
          />
        </Link>
      </div>

      <nav className="flex-1 space-y-8 overflow-y-auto no-scrollbar">
        {/* Main Menu Section */}
        <section>
          <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
            {t.mainMenu}
          </p>
          <div className="space-y-1">
            {menuItems.map((item, idx) => <NavLink key={idx} item={item} />)}
          </div>
        </section>

        {/* Case Management Section - Filtered by Visibility */}
        {caseItems.some(item => item.visible) && (
          <section>
            <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
              {t.caseMgmt}
            </p>
            <div className="space-y-1">
              {caseItems.map((item, idx) => <NavLink key={idx} item={item} />)}
            </div>
          </section>
        )}
      </nav>

      {/* Footer Settings */}
      <div className="pt-6 border-t border-slate-100 space-y-1">
        <button 
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${
            isSettingsOpen ? 'bg-slate-50 text-emerald-600' : 'text-slate-500 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center space-x-3">
            <Settings size={20} />
            <span className="font-medium text-sm">{t.settings}</span>
          </div>
          {isSettingsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {isSettingsOpen && (
          <div className="ml-4 space-y-1 mt-1 border-l-2 border-slate-50">
            <Link to="/Profile" className="flex items-center space-x-3 px-4 py-2 text-sm text-slate-500 hover:text-emerald-600">
              <User size={16} /> <span>{t.profile}</span>
            </Link>
            <Link to="/passwordChange" className="flex items-center space-x-3 px-4 py-2 text-sm text-slate-500 hover:text-emerald-600">
              <Lock size={16} /> <span>{t.password}</span>
            </Link>
            {role === 'admin' && (
              <Link to="/SystemMg" className="flex items-center space-x-3 px-4 py-2 text-sm text-emerald-700 font-semibold bg-emerald-50/50 rounded-lg">
                <ShieldCheck size={16} /> <span>{t.systemSettings}</span>
              </Link>
            )}
          </div>
        )}

        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors mt-4">
          <LogOut size={20} />
          <span className="font-medium text-sm">{t.logout}</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;