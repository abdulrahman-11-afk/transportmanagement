"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

type Props = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f5f6fa] p-4">
      <div className="flex gap-4">

        {/* SIDEBAR */}
        <aside className="w-64 bg-white rounded-2xl p-4 shadow-sm flex flex-col">

          {/* Logo */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-lg font-bold">
              DT
            </div>
            <div>
              <p className="text-xs text-gray-400">Company</p>
              <p className="font-semibold text-sm">Dev Transport</p>
            </div>
          </div>

          {/* Menu */}
          <nav className="flex flex-col gap-2 text-sm">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-left">
              Dashboard
            </button>
            <button className="hover:bg-gray-100 px-4 py-2 rounded-lg text-left">
              Trips
            </button>
            <button className="hover:bg-gray-100 px-4 py-2 rounded-lg text-left">
              Report
            </button>
            <button className="hover:bg-gray-100 px-4 py-2 rounded-lg text-left">
              Delivery
            </button>
            <button className="hover:bg-gray-100 px-4 py-2 rounded-lg text-left">
              Settings
            </button>
          </nav>

          <div className="mt-auto">
            <button
              onClick={() => {
                localStorage.removeItem("user");
                router.push("/");
              }}
              className="w-full mt-6 bg-red-500 text-white py-2 rounded-lg"
            >
              Logout
            </button>
          </div>
        </aside>

        {/* MAIN */}
        <div className="flex-1 flex flex-col gap-4">

          {/* NAVBAR */}
          <div className="bg-white rounded-2xl p-4 flex justify-between items-center shadow-sm">
            <div>
              <h2 className="font-semibold text-lg">Dashboard</h2>
              <p className="text-xs text-gray-400">Transport System</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg">
                <Search size={16} />
                <input
                  placeholder="Search..."
                  className="bg-transparent outline-none ml-2 text-sm"
                />
              </div>

              <div className="w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center">
                R
              </div>
            </div>
          </div>

          {/* CONTENT */}
          {children}
        </div>
      </div>
    </div>
  );
}