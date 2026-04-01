import Link from "next/link";

export default function Navbar() {
    return (
            <header className="flex items-center fixed z-50 top-0 bg-white w-full left-0 justify-between px-20 h-20 "> 
                <h2 className="cursor-pointer text-xl">Transport</h2>
                 <ul className="flex items-center justify-center gap-10 ml-16 cursor-pointer ">
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