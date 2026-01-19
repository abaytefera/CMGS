import React from "react";
import { useSelector } from "react-redux";

const LatestNews = () => {
  const { Language } = useSelector((state) => state.webState);

  const newsItems = [
    {
      date: Language === "AMH" ? "ሚያዝያ ፲፬፣ ፳፻፲፮" : "April 22, 2024",
      title: Language === "AMH" 
        ? "የመሬት ቀን የጽዳት ዘመቻ ታወጀ" 
        : "Earth Day Clean-Up Drive Announced",
      description: Language === "AMH" 
        ? "በዚህ የመሬት ቀን በምናደርገው የጽዳት ዘመቻ ላይ ይሳተፉ። ፓርኮቻችንን እና የወንዝ ዳርቻዎቻችንን ንጹህ እናድርግ።" 
        : "Join us for a community clean-up event this Earth Day. Help us make our parks and riverbanks cleaner.",
      image: "https://res.cloudinary.com/dkzvlqjp9/image/upload/v1768827359/Clear_d6y0ip.png",
    },
    {
      date: Language === "AMH" ? "ሚያዝያ ፯፣ ፳፻፲፮" : "April 15, 2024",
      title: Language === "AMH" 
        ? "አዲስ የአየር ጥራት መስፈርቶች ወጡ" 
        : "New Air Quality Standards Release",
      description: Language === "AMH" 
        ? "አዲስ የአየር ብክለት ቁጥጥር መስፈርቶች ወጥተዋል። እነዚህ በአካባቢው ኢንዱስትሪዎች እና ማህበረሰቦች ላይ የሚያመጡትን ተጽዕኖ ይረዱ።" 
        : "The new standards for air pollution control have been released. Learn how these impact local industries and communities.",
      image: "https://res.cloudinary.com/dkzvlqjp9/image/upload/v1768827377/newarit_khbr0u.png",
    },
    {
      date: Language === "AMH" ? "መጋቢት ፴፣ ፳፻፲፮" : "April 8, 2024",
      title: Language === "AMH" 
        ? "ስለ ውሃ ደህንነት የምክር ቤት ስብሰባ" 
        : "Council Meeting on Water Safety",
      description: Language === "AMH" 
        ? "በክልሉ አስተማማኝ እና ንጹህ የውሃ አቅርቦትን ለማረጋገጥ በሚደረጉ ጥረቶች ላይ ለመወያየት የተዘጋጀ ስብሰባ። ሁሉም ዜጋ ተጋብዟል።" 
        : "Meeting to discuss initiatives for ensuring safe and clean water supply in the region. All citizens welcome.",
      image: "https://res.cloudinary.com/dkzvlqjp9/image/upload/v1768827355/new2_pe2rny.png",
    },
  ];

  return (
    <section className="mb-16 px-4">
      
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        {Language === "AMH" ? "የቅርብ ጊዜ ዜናዎች እና ማስታወቂያዎች" : "Latest News & Announcements"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {newsItems.map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
          >
        
            <div className="relative overflow-hidden h-56">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
              />
            </div>

         
            <div className="p-5">
              <p className="text-green-600 font-medium text-xs mb-2">
                {item.date}
              </p>
              <h3 className="font-bold text-gray-800 text-lg leading-snug h-14 overflow-hidden">
                {item.title}
              </h3>
              <p className="text-gray-600 mt-3 text-sm leading-relaxed line-clamp-3">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

    
      <div className="text-center mt-10">
        <a
          href="/news"
          className="inline-block px-8 py-3 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 hover:shadow-lg transition-all active:scale-95"
        >
          {Language === "AMH" ? "ሁሉንም ዜናዎች ይመልከቱ" : "View All News"}
        </a>
      </div>
    </section>
  );
};

export default LatestNews;