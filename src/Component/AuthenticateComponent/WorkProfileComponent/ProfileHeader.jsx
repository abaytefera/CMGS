import React from 'react';

const ProfileHeader = ({ name, role }) => {
  // Safe Access: If name is undefined, use "User"
  const safeName = name || "User Profile";
  const avatarLetter = safeName.charAt(0).toUpperCase();

  return (
    <div className="flex flex-col items-center md:items-start gap-6">
      <div className="relative group">
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-[2.5rem] md:rounded-[3.5rem] bg-gradient-to-br from-blue-600/20 to-violet-600/20 border border-white/10 flex items-center justify-center text-blue-500 text-4xl md:text-5xl font-black shadow-2xl transition-transform group-hover:scale-105">
          {avatarLetter}
        </div>
        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 border-4 border-[#0a0f18] rounded-full shadow-lg" />
      </div>

      <div className="text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-black text-white uppercase italic tracking-tighter leading-none">
          {safeName}
        </h2>
        <p className="text-blue-500 text-[10px] md:text-xs font-black uppercase tracking-[0.4em] mt-2 opacity-80">
          {role || "EPA Staff Member"}
        </p>
      </div>
    </div>
  );
};

export default ProfileHeader;