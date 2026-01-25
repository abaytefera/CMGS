import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

export default function HeaderHero() {
  return (
    <header
      className="
        relative 
        min-h-screen 
        w-full 
        bg-[url('/46b3e591158aa6115bd95cfe41151e1dc7228154.jpg')] 
        bg-cover 
        bg-center 
        bg-no-repeat
      "
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Header */}
      <div className="relative z-20">
        <Header  />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 mt-15 flex items-center flex-1">
        <div
          className="
            px-6
            sm:px-10
            md:px-20
            max-w-3xl
            text-white
          "
        >
          <h1
            className="
              text-3xl
              sm:text-4xl
              md:text-5xl
              font-extrabold
              leading-tight
              mb-6
            "
          >
            Your Voice Matters.
          </h1>

          <p
            className="
              text-base
              sm:text-lg
              md:text-xl
              text-gray-200
              mb-6
            "
          >
            Submit environmental complaints easily, track their progress
            transparently, and help us build a cleaner, safer, and more
            accountable environment for everyone.
          </p>

          <p className="text-sm text-gray-300 mb-8">
            Secure • Transparent • Citizen-Centered • Multilingual
          </p>

          <Link
            to="/submit-complaint"
            className="
              inline-flex
              items-center
              bg-blue-600
              hover:bg-blue-700
              transition
              px-6
              py-3
              rounded
              font-semibold
              text-sm
              sm:text-base
            "
          >
            SUBMIT A COMPLAINT →
          </Link>
        </div>
      </div>
    </header>
  );
}
