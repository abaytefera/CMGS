import React from 'react'

const Header = () => {
  return (
    <div className='h-[80px] '>
    <nav className="relative z-10 flex items-center justify-between px-10 py-6 text-white">
        <div className="flex items-center gap-2 text-xl font-bold">
        <img src="Untitled-1 1.jpg" className="w-10 h-10" alt="" />
        </div>
        <ul className="hidden md:flex gap-8 text-sm tracking-wide">
          <li className="hover:text-blue-400 cursor-pointer">HOME</li>
          <li className="hover:text-blue-400 cursor-pointer">ABOUT US</li>
          <li className="hover:text-blue-400 cursor-pointer">SERVICES</li>
          <li className="hover:text-blue-400 cursor-pointer">NEWS</li>
          <li className="hover:text-blue-400 cursor-pointer">CONTACT</li>
        </ul>
        <div className="flex gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm font-semibold">
            SUBMIT A COMPLAINT
          </button>
          <button className="border border-white px-4 py-2 rounded text-sm font-semibold hover:bg-white hover:text-black">
            TRACK COMPLAINT
          </button>
        </div>
      </nav>  
    </div>
  )
}

export default Header
