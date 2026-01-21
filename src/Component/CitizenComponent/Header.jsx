import React, { useEffect, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { ChangeLanguage } from "../../Redux/WebState";
import { Link } from "react-router-dom";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { Language } = useSelector((state) => state.webState);
  const [windowOffset,setWindowOffset]=useState(0)
  const Dispatch = useDispatch();
  useEffect(()=>{
 const scrollHandle=()=>{
  setWindowOffset(window.scrollY);
 

 }
 window.addEventListener('scroll',scrollHandle);
    return()=>{
 window.removeEventListener('scroll',scrollHandle);
    }
  },[])

  const toggleMenu = () => setIsOpen(!isOpen);

  const toggleLanguge = (e) => {
    const value = e.target.value;
    if (!value) return;
    Dispatch(ChangeLanguage(value));
  };

  
  const content = {
    Home: Language === "AMH" ? "መነሻ" : "Home",
    About: Language === "AMH" ? "ስለ እኛ" : "About Us",
    Services: Language === "AMH" ? "አገልግሎቶች" : "Services",
    GiveFeedback: Language === "AMH" ? "አስተያየት ለመስጠት" : " Give Feedback",
    Contact: Language === "AMH" ? "አድራሻ" : "Contact",
    Login: Language === "AMH" ? "የሰራተኛ መግቢያ" : "Staff Login",
    LangLabel: Language === "AMH" ? "ቋንቋ ይቀይሩ" : "Language Change",
  };

  return (
    <header className={`h-20 shadow  bg-[url(https://res.cloudinary.com/dkzvlqjp9/image/upload/v1768827337/natural_pjju9e.jpg)] bg-not-repeat bg-cover bg-center transition-all ease-out duration-300 fixed w-full z-50 ${windowOffset>450 && "bg-black"}`}> 
 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img src="https://res.cloudinary.com/dkzvlqjp9/image/upload/v1768827371/logo_xebgif.png" alt="Logo" className="w-40 h-25" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="text-white hover:text-green-600">{content.Home}</Link>
            <Link to="/about" className="text-white hover:text-green-600">{content.About}</Link>
            <Link to="/FeedbackPage" className="text-white hover:text-green-600">{content.GiveFeedback}</Link>
            <Link to="/ContactPage" className="text-white hover:text-green-600">{content.Contact}</Link>
          </nav>

          <div className="flex max-md:hidden gap-3 items-center">
            <div className="relative flex cursor-pointer group gap-1 items-center">
              <div className="flex flex-col items-center">
                <img src="https://res.cloudinary.com/dkzvlqjp9/image/upload/v1768827358/Language_bizms7.png" alt="Lang" className="w-10 h-10" />
                <span className="hidden group-hover:block text-white absolute top-12 whitespace-nowrap bg-black p-1 text-xs">
                  {content.LangLabel}
                </span>
              </div>
              <select
                name="language"
                id="language"
                value={Language}
                onChange={toggleLanguge}
                className="bg-transparent text-white  outline-none"
              >
                <option value="ENG" className="text-black">ENG</option>
                <option value="AMH" className="text-black">Amh</option>
              </select>
            </div>
            
            <Link
              to="/login"
              className="bg-green-600 px-4 py-2 rounded-md text-white shadow hover:bg-green-700 transition"
            >
              {content.Login}
            </Link>
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-white hover:text-green-600 focus:outline-none">
              {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg border-t">
          <nav className="flex flex-col space-y-2 px-4 py-4">
            <Link to="/" className="text-gray-700 hover:text-green-600 border-b pb-1">{content.Home}</Link>
            <Link to="/about" className="text-gray-700 hover:text-green-600 border-b pb-1">{content.About}</Link>
            <Link to="/FeedbackPage" className="text-gray-700 hover:text-green-600 border-b pb-1">{content.GiveFeedback}</Link>
            <Link to="/ContactPage" className="text-gray-700 hover:text-green-600 border-b pb-1">{content.Contact}</Link>
            
            <div className="flex flex-col gap-4 pt-2">
              <div className="flex items-center gap-2">
                <img src="https://res.cloudinary.com/dkzvlqjp9/image/upload/v1768827358/Language_bizms7.png" alt="" className="w-8 h-8" />
                <select
                  onChange={toggleLanguge}
                  value={Language}
                  className="text-gray-700 border rounded p-1"
                >
                  <option value="ENG">English</option>
                  <option value="AMH">አማርኛ</option>
                </select>
              </div>
              <Link to="/login" className="bg-green-600 text-center py-2 rounded-md text-white">
                {content.Login}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;