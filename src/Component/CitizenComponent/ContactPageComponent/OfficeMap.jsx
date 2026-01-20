import React from 'react';

const OfficeMap = ({text}) => {
  // Official location coordinates or search query for the EPA in Addis Ababa
  const mapLocationQuery = "Environmental Protection Authority, Addis Ababa, Ethiopia";
  const embedUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(mapLocationQuery)}`;


  const standardIframeUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.55138435!2d38.74!3d9.03!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cef5ab402d%3A0x8467b6b037a24c40!2sEnvironmental%20Protection%20Authority!5e0!3m2!1sen!2set!4v1700000000000!5m2!1sen!2set";

  return (
    <div className="w-full h-full min-h-[400px] bg-slate-100 rounded-2xl overflow-hidden relative border border-slate-200 shadow-lg">
      <iframe
        title="Official EPA Headquarters Location"
        width="100%"
        height="100%"
        className="border-0"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={standardIframeUrl}
      ></iframe>
      
  
      <span className="sr-only">{text}</span>
    </div>
  );
};

export default OfficeMap;