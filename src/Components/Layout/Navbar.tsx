import { Zap } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
    return (
            <header className="flex items-center fixed z-50 top-0 bg-white w-full left-0 justify-between px-20 h-20 "> 
                <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                <Zap size={16} className="text-blue-600" />
              </div>

              <span className="font-bold text-xl text-gray-900">
                Transit<span className="text-blue-600">Pro</span>
              </span>
            </Link>
                 <ul className="flex items-center text-[14px] justify-center gap-6 ml-16 cursor-pointer ">
                    <li className="hover:text-[#1E3A8A]">Home</li>
                    <li className="hover:text-[#1E3A8A]">Why Choose Us</li>
                    <li className="hover:text-[#1E3A8A]">About Us</li>
                    <li className="hover:text-[#1E3A8A]">Contact</li>
                </ul>
                <div className="flex items-center gap-4">
                   <Link href="/login"> <button className="cursor-pointer">Log in</button></Link>
                    <Link href="/Signup"><button className="w-25 h-10 cursor-pointer bg-blue-600 text-white rounded-md hover:scale-105 duration-300 transition ">Sign Up</button></Link>
                </div>
               
            </header>
    )
}