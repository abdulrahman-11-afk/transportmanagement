"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Zap, Car, MapPin, Clock, Star, TrendingUp, Bell } from "lucide-react";

type DriverUser = {
  name: string;
  email: string;
  carName: string;
  plateNumber: string;
  carType: string;
  carColor: string;
};

const recentTrips = [
  { id: "DRV-001", from: "Ibadan", to: "Lagos",  date: "2025-04-08", passengers: 14, earned: 98000, status: "Completed" },
  { id: "DRV-002", from: "Lagos",  to: "Abuja",  date: "2025-04-06", passengers: 12, earned: 150000, status: "Completed" },
  { id: "DRV-003", from: "Ibadan", to: "Osogbo", date: "2025-04-10", passengers: 8,  earned: 40000, status: "Upcoming"  },
  { id: "DRV-004", from: "Ilorin", to: "Lagos",  date: "2025-04-03", passengers: 11, earned: 88000, status: "Completed" },
];

export default function DriverDashboardPage() {
  const router = useRouter();
  const [driver, setDriver] = useState<DriverUser | null>(null);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (!data) { router.push("/login"); return; }
    const parsed = JSON.parse(data);
    if (parsed.role !== "driver") { router.push("/dashboard"); return; }
    setDriver(parsed);
  }, []);

  if (!driver) return null;

  const totalEarned = recentTrips.filter(t => t.status === "Completed").reduce((s, t) => s + t.earned, 0);
  const completedTrips = recentTrips.filter(t => t.status === "Completed").length;
  const initials = driver.name?.split(" ").map(n => n[0]).join("").toUpperCase() || "DR";

  return (
    <>
      {/* <style>{`
        // @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');
        // .drv { font-family: 'DM Sans', sans-serif; }
        // .drv-title { font-family: 'Syne', sans-serif; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);} }
        .fu{animation:fadeUp 0.4s ease both;}
        .fu1{animation-delay:.05s;}.fu2{animation-delay:.1s;}.fu3{animation-delay:.18s;}.fu4{animation-delay:.26s;}
        @keyframes ping { 0%{transform:scale(1);opacity:1;}100%{transform:scale(2);opacity:0;} }
        .ping { animation: ping 1.5s cubic-bezier(0,0,.2,1) infinite; }
      `}</style> */}

      <div className="drv min-h-screen bg-[#f5f6fa]">

        {/* TOPBAR */}
        <div className="bg-white px-6 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-blue-600 text-white flex items-center justify-center rounded-xl">
              <Zap size={15} />
            </div>
            <span className="drv-title text-lg font-extrabold text-gray-900">
              Transit<span className="text-blue-600">Pro</span>
              <span className="text-xs font-normal text-gray-400 ml-2 bg-blue-50 text-blue-500 px-2 py-0.5 rounded-full">Driver</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500 hover:bg-gray-200 transition">
              <Bell size={16} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            <div className="w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
              {initials}
            </div>

            <button
              onClick={() => { localStorage.removeItem("user"); router.push("/"); }}
              className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-600 font-medium px-3 py-2 rounded-xl hover:bg-red-50 transition"
            >
              <LogOut size={15} /> Logout
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto p-6 space-y-6">

          <div className="fu flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="drv-title text-2xl font-semibold text-gray-900">
                Welcome back, {driver.name?.split(" ")[0] || "Driver"} 
              </h1>
              <p className="text-gray-400 text-sm mt-0.5">Here's your driving overview</p>
            </div>

            <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-sm">
              <div className="relative">
                               <span className={`inline-flex h-3 w-3 rounded-full ${available ? "bg-green-500" : "bg-gray-300"}`} />
              </div>
              <span className="text-sm font-medium text-gray-700">{available ? "Available" : "Offline"}</span>
              <button
                onClick={() => setAvailable(!available)}
                className={`w-11 h-6 rounded-full relative transition-colors ${available ? "bg-green-500" : "bg-gray-200"}`}>
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${available ? "translate-x-5" : "translate-x-0"}`} />
              </button>
            </div>
          </div>

          <div className="fu fu1 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-5 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Car size={24} />
                </div>
                <div>
                  <p className="font-bold text-lg">{driver.carName || "Your Vehicle"}</p>
                  <p className="text-blue-200 text-sm">{driver.carType} · {driver.carColor}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-blue-200 text-xs">Plate Number</p>
                <p className="font-mono font-bold text-lg tracking-wider">{driver.plateNumber}</p>
              </div>
            </div>
          </div>

          <div className="fu fu2 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Total Trips",     value: recentTrips.length,          icon: <MapPin size={18} />,      color: "text-blue-600 bg-blue-50"    },
              { label: "Completed",       value: completedTrips,              icon: <Clock size={18} />,       color: "text-emerald-600 bg-emerald-50" },
              { label: "Total Earned",    value: `₦${(totalEarned/1000).toFixed(0)}k`, icon: <TrendingUp size={18} />, color: "text-amber-600 bg-amber-50" },
              { label: "Driver Rating",   value: "4.8 ",                    icon: <Star size={18} />,        color: "text-violet-600 bg-violet-50" },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-2xl p-4 shadow-sm">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>
                  {s.icon}
                </div>
                <p className="drv-title text-xl font-bold text-gray-900">{s.value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="fu fu3 bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
              <h3 className="drv-title font-bold text-gray-800">Recent Trips</h3>
              <span className="text-xs text-blue-600 font-medium cursor-pointer hover:underline">View all</span>
            </div>
            <div className="divide-y divide-gray-50">
              {recentTrips.map((t) => (
                <div key={t.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-xl">🚌</div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{t.from} → {t.to}</p>
                      <p className="text-xs text-gray-400">{t.date} · {t.passengers} passengers</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-800">₦{t.earned.toLocaleString()}</p>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full
                      ${t.status === "Completed" ? "bg-emerald-100 text-emerald-600" : "bg-blue-100 text-blue-600"}`}>
                      {t.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="fu fu4 bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-center justify-between gap-4">
            <div>
              <p className="font-bold text-amber-800">Upcoming Trip</p>
              <p className="text-sm text-amber-600 mt-0.5">Ibadan → Osogbo · Apr 10 · 8 passengers</p>
            </div>
            <button className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow-sm whitespace-nowrap">
              View Details
            </button>
          </div>

        </div>
      </div>
    </>
  );
}