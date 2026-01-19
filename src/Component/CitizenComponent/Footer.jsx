import React from "react";
import { useSelector } from "react-redux";
import { 
  FaFacebook, 
  FaTwitter, 
  FaTelegramPlane, 
  FaEnvelope, 
  FaPhoneAlt 
} from 'react-icons/fa';
import { Link } from "react-router-dom";


const Footer = () => {
  const { Language } = useSelector((state) => state.webState);

 
  const content = {
    quickLinks: Language === "AMH" ? "ፈጣን ሊንኮች" : "Quick Links",
    home: Language === "AMH" ? "መነሻ" : "Home",
    about: Language === "AMH" ? "ስለ እኛ" : "About Us",
    services: Language === "AMH" ? "አገልግሎቶች" : "Services",
    contactInfo: Language === "AMH" ? "የመገናኛ መረጃ" : "Contact Information",
    locations: Language === "AMH" ? "የቢሮ አድራሻዎች" : "Office Locations",
    mainOffice: Language === "AMH" ? "ዋና ቢሮ፡ አዲስ አበባ" : "Main Office: Addis Ababa",
    branchOffice: Language === "AMH" ? "ቅርንጫፍ ቢሮ፡ ባሕር ዳር" : "Branch Office: Bahir Dar",
    rights: Language === "AMH" ? "መብቱ በሕግ የተጠበቀ ነው። የአካባቢ ጥበቃ ባለሥልጣን" : "Environmental Authority. All rights reserved.",
    email: Language === "AMH" ? "ኢሜይል" : "Email",
    phone: Language === "AMH" ? "ስልክ" : "Phone"
  };

  return (
    <footer className="bg-[url(https://res.cloudinary.com/dkzvlqjp9/image/upload/v1768827337/natural_pjju9e.jpg)] bg-no-repeat bg-center bg-cover text-white py-12 relative overflow-hidden">
  
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
        
      
        <div className="flex flex-col items-center md:items-start">
          <h4 className="font-bold text-xl mb-4 border-b-2 border-green-500 pb-1">
            {content.quickLinks}
          </h4>
          <ul className="space-y-2 text-center md:text-left">
            <li><Link to="/" className="hover:text-green-400 transition">{content.home}</Link></li>
            <li><Link to="/about" className="hover:text-green-400 transition">{content.about}</Link></li>
            <li><Link to="/services" className="hover:text-green-400 transition">{content.services}</Link></li>
          </ul>
        </div>

      
        <div className="flex flex-col items-center">
          <h4 className="font-bold text-xl mb-6 border-b-2 border-green-500 pb-1">
            {content.contactInfo}
          </h4>
          <div className="flex items-center justify-center gap-6">
            <a href="mailto:example@mail.com" className="group flex flex-col items-center">
              <FaEnvelope className="text-3xl text-red-500 group-hover:scale-125 transition-transform" />
              <span className="text-[10px] mt-2 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                {content.email}
              </span>
            </a>

            <a href="https://facebook.com" className="group flex flex-col items-center">
              <FaFacebook className="text-3xl text-blue-600 group-hover:scale-125 transition-transform" />
              <span className="text-[10px] mt-2 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Facebook</span>
            </a>

            <a href="tel:+123456789" className="group flex flex-col items-center">
              <FaPhoneAlt className="text-3xl text-green-500 group-hover:scale-125 transition-transform" />
              <span className="text-[10px] mt-2 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                {content.phone}
              </span>
            </a>

            <a href="https://t.me/username" className="group flex flex-col items-center">
              <FaTelegramPlane className="text-3xl text-sky-500 group-hover:scale-125 transition-transform" />
              <span className="text-[10px] mt-2 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Telegram</span>
            </a>
          </div>
        </div>

        {/* Locations */}
        <div className="flex flex-col items-center md:items-end">
          <h4 className="font-bold text-xl mb-4 border-b-2 border-green-500 pb-1">
            {content.locations}
          </h4>
          <div className="text-center md:text-right space-y-1">
            <p className="opacity-90">{content.mainOffice}</p>
            <p className="opacity-90">{content.branchOffice}</p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="relative text-center mt-12 pt-8 border-t border-white/20 text-white/70 text-sm">
        &copy; 2026 {content.rights}
      </div>
    </footer>
  );
};

export default Footer;