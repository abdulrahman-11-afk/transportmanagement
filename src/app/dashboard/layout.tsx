"use client";

import { ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Search, LogOut, Zap } from "lucide-react";

type Props = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg text-left transition ${
      pathname === path
        ? "bg-blue-600 text-white"
        : "hover:bg-gray-100 text-gray-700"
    }`;

  return (
    <div className="min-h-screen bg-[#f5f6fa] p-4">
      <div className="flex gap-4">

        <aside className="w-64 h-[95vh] bg-white rounded-2xl p-4 shadow-sm flex flex-col">

          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-lg font-bold">
              <Zap size={16} />
            </div>
            <div>
              <p className="text-xs text-gray-400">Company</p>
              <span className="font-bold text-xl text-gray-900">
                Transit<span className="text-blue-600">Pro</span>
              </span>
            </div>
          </div>

          <nav className="flex flex-col gap-2 text-sm">
            <button
              onClick={() => router.push("/dashboard")}
              className={linkClass("/dashboard")}
            >
              Dashboard
            </button>

            <button
              onClick={() => router.push("/dashboard/trips")}
              className={linkClass("/dashboard/trips")}
            >
              Trips
            </button>

            <button
              onClick={() => router.push("/dashboard/report")}
              className={linkClass("/dashboard/report")}
            >
              Report
            </button>

            <button
              onClick={() => router.push("/dashboard/delivery")}
              className={linkClass("/dashboard/delivery")}
            >
              Delivery
            </button>

            <button
              onClick={() => router.push("/dashboard/settings")}
              className={linkClass("/dashboard/settings")}
            >
              Settings
            </button>
          </nav>

          <div className="mt-auto">
            <button
              onClick={() => {
                localStorage.removeItem("user");
                router.push("/");
              }}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 py-2 rounded-lg transition"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </aside>

      
        <div className="flex-1 flex flex-col gap-4">

          <div className="bg-white rounded-2xl p-4 flex justify-between items-center shadow-sm text-black">
            <div>
              <h2 className="font-semibold text-lg capitalize">
                {pathname.split("/")[2] || "Dashboard"}
              </h2>
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

          
          {children}
        </div>
      </div>
    </div>
  );
}