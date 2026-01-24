import React from 'react'
import { Link } from 'react-router-dom'
const Header = ({page}) => {
  return (
    <div className={`h-[80px ${page && "bg-[url('/46b3e591158aa6115bd95cfe41151e1dc7228154.jpg')] bg-cover bg-center bg-no-repeat"}` }>
    <nav className="relative z-10 flex items-center justify-between px-10 py-6 text-white">
        <div className="flex items-center gap-2 text-xl font-bold">
        <img src="Untitled-1 1.jpg" className="w-10 h-10" alt="" />
        </div>
        <ul className="hidden md:flex gap-8 text-sm tracking-wide">
          <Link className="hover:text-blue-400 cursor-pointer">HOME</Link>
          <li className="hover:text-blue-400 cursor-pointer">ABOUT US</li>
          <li className="hover:text-blue-400 cursor-pointer">SERVICES</li>
          <li className="hover:text-blue-400 cursor-pointer">NEWS</li>
          <li className="hover:text-blue-400 cursor-pointer">CONTACT</li>
        </ul>
        <div className="flex gap-4">
          <Link to={'/submit-complaint'} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm font-semibold">
            SUBMIT A COMPLAINT
          </Link>
          <Link to={'/TrackComplaintPage'} className="border border-white px-4 py-2 rounded text-sm font-semibold hover:bg-white hover:text-black">
            TRACK COMPLAINT
          </Link>
        </div>
      </nav>  
    </div>
  )
}

export default Header
