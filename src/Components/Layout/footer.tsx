import Link from "next/link";
import { Zap } from "lucide-react";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import { FiMail } from "react-icons/fi";

const footerLinks = {
  Company: ["About Us", "Careers", "Press", "Blog"],
  Services: ["Book a Trip", "Become a Driver", "Business Travel", "Group Bookings"],
  Support: ["Help Center", "Contact Us", "Safety", "Accessibility"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Refund Policy"],
};

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10">
          
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                <Zap size={16} className="text-blue-600" />
              </div>

              <span className="font-bold text-xl text-gray-900">
                Transit<span className="text-blue-600">Pro</span>
              </span>
            </Link>

            <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-xs">
              Fast, reliable transport booking for modern travelers. Get anywhere, effortlessly.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {[FaTwitter, FaGithub, FaLinkedin, FiMail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-blue-600 hover:border-blue-300 transition"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-gray-900 font-semibold text-sm mb-4">
                {category}
              </h4>

              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-blue-600 text-sm transition"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <p className="text-gray-500 text-sm">
            © 2026 TransitPro. All rights reserved.
          </p>

          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-gray-500 text-sm">
              All systems operational
            </span>
          </div>

        </div>
      </div>
    </footer>
  );
}