import React from 'react';

const LoginBg = () => (
  <div className="fixed inset-0 -z-10 bg-emerald-50 overflow-hidden flex items-center justify-center">
    {/* Animated Blobs */}
    <div className="absolute w-[500px] h-[500px] bg-emerald-300/30 rounded-full blur-3xl animate-pulse" />
    <div className="absolute w-[400px] h-[400px] bg-cyan-200/40 rounded-full blur-3xl animate-bounce duration-[10s] -top-20 -left-20" />
    <div className="absolute w-[300px] h-[300px] bg-green-200/20 rounded-full blur-3xl animate-pulse bottom-0 right-0" />
    

    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
  </div>
);

export default LoginBg;