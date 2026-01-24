import React, { useEffect, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { ChangeLanguage } from "../../Redux/WebState";
import { Link } from "react-router-dom";
import { User, Bell } from "lucide-react"; 

const AuthHeader = ({True}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false); 
  const { Language } = useSelector((state) => state.webState);
const { user } = useSelector((state) => state.auth);
  const [windowOffset, setWindowOffset] = useState(0);
  const Dispatch = useDispatch();

 
  const officerName = "Inspector Abebe"; 

  useEffect(() => {
    const scrollHandle = () => {
      setWindowOffset(window.scrollY);
    };
    window.addEventListener("scroll", scrollHandle);
    return () => {
      window.removeEventListener("scroll", scrollHandle);
    };
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const toggleLanguge = (e) => {
    const value = e.target.value;
    if (!value) return;
    Dispatch(ChangeLanguage(value));
  };

  const content = {
    LangLabel: Language === "AMH" ? "ቋንቋ ይቀይሩ" : "Language Change",
    Logout: Language === "AMH" ? "ውጣ" : "Logout",
    notifTitle: Language === "AMH" ? "ማሳወቂያዎች" : "Notifications",
    noNotif: Language === "AMH" ? "አዲስ ማሳወቂያ የለም" : "No new notifications",
  };

  return (
    <header
      className={`h-20 lg:pr-40 shadow bg-[url(https://res.cloudinary.com/dkzvlqjp9/image/upload/v1768827337/natural_pjju9e.jpg)] bg-no-repeat bg-cover bg-center transition-all ease-out duration-300 fixed w-full z-50 ${
        windowOffset > 450 ? "bg-black" : ""
      }`}
    >
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 ${True ? "lg:px-8" :"lg:px-1"} `}>
        <div className="flex justify-between items-center h-20">
        <div className={`flex-shrink-0 mb-8 ${True ?"opacity-0":"blcok"}`}>
            <Link to="/dashboard">
              <img
                src="https://res.cloudinary.com/dkzvlqjp9/image/upload/v1768827371/logo_xebgif.png"
                alt="Logo"
                className="w-40 h-auto"
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            
            {/* Notification Bell Section */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-white hover:bg-white/10 rounded-full transition-all"
              >
                <Bell size={24} />
                {/* Red Dot Indicator */}
                <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 border-2 border-green-800 rounded-full"></span>
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl py-4 z-50 border border-slate-100 animate-in fade-in zoom-in duration-200">
                  <div className="px-4 pb-2 border-b border-slate-50 flex justify-between items-center">
                    <span className="font-bold text-slate-800">{content.notifTitle}</span>
                    <span className="text-[10px] bg-red-50 text-red-500 px-2 py-0.5 rounded-full font-bold">2 NEW</span>
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    <div className="p-4 text-center text-slate-400 text-sm">
                   
                      <div className="text-left bg-blue-50 p-3 rounded-lg mb-2">
                        <p className="text-xs text-blue-800 font-bold">New Complaint Assigned</p>
                        <p className="text-[10px] text-blue-600">Reference: CGMS-00125</p>
                      </div>
                      {/* {content.noNotif} */}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Language Selector */}
            <div className="relative flex cursor-pointer group gap-1 items-center">
              <img
                src="https://res.cloudinary.com/dkzvlqjp9/image/upload/v1768827358/Language_bizms7.png"
                alt="Lang"
                className="w-8 h-8"
              />
              <select
                value={Language}
                onChange={toggleLanguge}
                className="bg-transparent text-white outline-none cursor-pointer font-medium"
              >
                <option value="ENG" className="text-black">ENG</option>
                <option value="AMH" className="text-black">AMH</option>
              </select>
            </div>

            {/* Officer Profile Section */}
            <div className={`flex ${True && "md:mr-20" }  items-center space-x-3 bg-white/10 backdrop-blur-md border border-white/20 p-1.5 pr-4 rounded-full hover:bg-white/20 transition-all cursor-pointer`}>
              <div className="w-10 h-10 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center overflow-hidden shadow-sm">
                <User className="text-white" size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-white text-[10px] font-semibold opacity-80 uppercase tracking-tighter leading-none">{user.role}</span>
                <span className="text-white text-sm font-bold leading-tight">{user.username}</span>
              </div>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-green-400 focus:outline-none"
            >
              {isOpen ? <HiX size={30} /> : <HiMenu size={30} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-2xl border-t p-6 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col space-y-6">
            <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-2xl">
              <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white">
                <User size={28} />
              </div>
              <div>
                <p className="text-slate-900 font-bold">{user.role}</p>
                <p className="text-slate-500 text-xs">EPA Personnel</p>
              </div>
            </div>

            <button className="flex items-center justify-between p-4 bg-blue-50 text-blue-700 rounded-xl font-bold">
              <span>{content.notifTitle}</span>
              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">2</span>
            </button>

            <div className="flex items-center justify-between border-y py-4">
              <span className="text-slate-700 font-medium">{content.LangLabel}</span>
              <select
                onChange={toggleLanguge}
                value={Language}
                className="text-slate-700 border rounded-lg p-2 bg-slate-50"
              >
                <option value="ENG">English</option>
                <option value="AMH">አማርኛ</option>
              </select>
            </div>

            <button className="bg-red-50 text-red-600 font-bold py-3 rounded-xl hover:bg-red-100 transition-colors">
              {content.Logout}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default AuthHeader;