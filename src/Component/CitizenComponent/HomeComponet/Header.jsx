import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = ({ page }) => {
  const [open, setOpen] = useState(false);

  return (
    <header
      className={`${
      page
          && "bg-[url('/46b3e591158aa6115bd95cfe41151e1dc7228154.jpg')] bg-cover bg-center bg-no-repeat"}`}
    
    >
      <nav className="relative z-10 flex items-center justify-between px-4 md:px-10 py-5 text-white">

        {/* LOGO */}
        <div className="flex items-center gap-2 text-xl font-bold">
          <img
            src="EEPA1 (1).jpg"
            className=" w-30  h-10 object-fit bg-cover object-contain"
            alt="Logo"
          />
        </div>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex gap-8 text-sm tracking-wide">
          <Link to="/" className="hover:text-blue-400">HOME</Link>
          <Link to="/about" className="hover:text-blue-400">ABOUT US</Link>
          <Link to="/services" className="hover:text-blue-400">SERVICES</Link>
          <Link to="/news" className="hover:text-blue-400">NEWS</Link>
          <Link to="/contact" className="hover:text-blue-400">CONTACT</Link>
        </ul>

        {/* DESKTOP BUTTONS */}
        <div className="hidden md:flex gap-4">
          <Link
            to="/submit-complaint"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm font-semibold"
          >
            SUBMIT A COMPLAINT
          </Link>

          <Link
            to="/TrackComplaintPage"
            className="border border-white px-4 py-2 rounded text-sm font-semibold hover:bg-white hover:text-black"
          >
            TRACK COMPLAINT
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-white text-gray-800 shadow-lg">
          <ul className="flex flex-col gap-4 px-6 py-6 text-sm font-medium">
            <Link onClick={() => setOpen(false)} to="/">HOME</Link>
            <Link onClick={() => setOpen(false)} to="/about">ABOUT US</Link>
            <Link onClick={() => setOpen(false)} to="/services">SERVICES</Link>
            <Link onClick={() => setOpen(false)} to="/news">NEWS</Link>
            <Link onClick={() => setOpen(false)} to="/contact">CONTACT</Link>

            <Link
              to="/submit-complaint"
              className="bg-blue-600 text-white text-center py-2 rounded"
            >
              SUBMIT A COMPLAINT
            </Link>

            <Link
              to="/TrackComplaintPage"
              className="border border-blue-600 text-blue-600 text-center py-2 rounded"
            >
              TRACK COMPLAINT
            </Link>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
