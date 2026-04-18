"use client";
import { Zap, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed z-50 top-0 bg-white w-full left-0 shadow-sm">
      <div className="flex items-center justify-between px-5 md:px-20 h-16 md:h-20">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
            <Zap size={16} className="text-blue-600" />
          </div>
          <span className="font-bold text-sm md:text-xl text-gray-900">
            Transit<span className="text-blue-600">Pro</span>
          </span>
        </Link>

        <ul className="md:flex hidden items-center text-[14px] justify-center gap-6 cursor-pointer">
          <li className="hover:text-[#1E3A8A]">Home</li>
          <li className="hover:text-[#1E3A8A]">Why Choose Us</li>
          <li className="hover:text-[#1E3A8A]">About Us</li>
          <li className="hover:text-[#1E3A8A]">Contact</li>
        </ul>

        <div className="flex items-center gap-3">
          <Link href="/login">
            <button className="text-[13px] md:text-[16px] cursor-pointer">Log in</button>
          </Link>
          <Link href="/Signup">
            <button className="px-4 h-8 md:h-10 text-[13px] md:text-[16px] cursor-pointer bg-blue-600 text-white rounded-md hover:scale-105 duration-300 transition">
              Sign Up
            </button>
          </Link>
          <button
            className="md:hidden flex items-center justify-center"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu size={22} className="text-gray-700" />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-5 py-4 flex flex-col gap-4 text-[14px] text-gray-700">
          <a href="#" className="hover:text-blue-600">Home</a>
          <a href="#" className="hover:text-blue-600">Why Choose Us</a>
          <a href="#" className="hover:text-blue-600">About Us</a>
          <a href="#" className="hover:text-blue-600">Contact</a>
        </div>
      )}
    </header>
  );
}