"use client";

import { IoLocationOutline } from "react-icons/io5";
import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ IMPORT ADDED

export default function DashboardPage() {
  const router = useRouter(); // ✅ FIX

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState("");

  const locations = ["Ibadan", "Osogbo", "Lagos", "Abuja", "Ilorin"];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const isLoggedIn = localStorage.getItem("user");

    if (!isLoggedIn) {
      localStorage.setItem(
        "searchData",
        JSON.stringify({ from, to, date, passengers })
      );

      router.push("/login"); // ✅ FIXED (no reload)
      return;
    }

    // ✅ CORRECT REDIRECT TO TRIPS PAGE
    router.push(
      `/dashboard/trips?from=${from}&to=${to}&date=${date}&passengers=${passengers}`
    );
  };

  return (
    <div className="grid grid-cols-3 gap-4">

      {/* SEARCH FORM */}
      <div className="bg-white col-span-2 rounded-2xl p-4 shadow-sm">
        <h3 className="font-semibold mb-3">Search Trips</h3>

        <form onSubmit={handleSearch} className="flex flex-col gap-3">

          <div className="flex flex-col md:flex-row gap-4 items-end">

            {/* FROM */}
            <div className="w-full flex flex-col gap-1">
              <label className="text-sm font-medium flex items-center gap-1">
                <IoLocationOutline /> From
              </label>
              <select
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="border rounded-lg h-12 text-sm"
                required
              >
                <option value="">Select location</option>
                {locations
                  .filter((loc) => loc !== to)
                  .map((loc) => (
                    <option key={loc}>{loc}</option>
                  ))}
              </select>
            </div>

            {/* TO */}
            <div className="w-full flex flex-col gap-1">
              <label className="text-sm font-medium flex items-center gap-1">
                <IoLocationOutline /> To
              </label>
              <select
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="border rounded-lg h-12 text-sm"
                required
              >
                <option value="">Select location</option>
                {locations
                  .filter((loc) => loc !== from)
                  .map((loc) => (
                    <option key={loc}>{loc}</option>
                  ))}
              </select>
            </div>

            {/* DATE */}
            <div className="w-full flex flex-col gap-1">
              <label className="text-sm font-medium">
                Travel Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border p-3 rounded-lg h-12"
                required
              />
            </div>

            {/* PASSENGERS */}
            <div className="w-full flex flex-col gap-1">
              <label className="text-sm font-medium">
                Passengers
              </label>
              <select
                value={passengers}
                onChange={(e) => setPassengers(e.target.value)}
                className="border p-3 rounded-lg h-12"
                required
              >
                <option value="">Select</option>
                {[1,2,3,4,5,6,7,8,9].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? "Passenger" : "Passengers"}
                  </option>
                ))}
              </select>
            </div>

          </div>

          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold">
            Search Trips
          </button>

        </form>
      </div>

     <div className=" bg-white rounded-2xl p-4 shadow-sm">
        <h3 className="font-semibold mb-3">Recent Bookings</h3>

        <div className="flex flex-col gap-2 text-sm">
          <div className="bg-gray-100 flex items-center justify-between p-3 rounded-lg">
            <p> Ibadan → Lagos</p>
            <p className="text-green-500">Successfull</p>
          </div>
         <div className="bg-gray-100 flex items-center justify-between p-3 rounded-lg">
            <p>Abuja → Ilorin</p>
            <p className="text-green-500">Successfull</p>
          </div>
          <div className="bg-gray-100 flex items-center justify-between p-3 rounded-lg">
            <p>Kwara → Osun</p>
            <p className="text-green-500">Successfull</p>
          </div>
        </div>
      </div>

    
      {/* ANALYTICS */}
      <div className="col-span-2 bg-white rounded-2xl p-4 shadow-sm">
        <h3 className="font-semibold mb-3">Analytics</h3>
        <div className="h-40 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
          Chart / Graph here
        </div>
      </div>
  {/* TOTAL BOOKINGS */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <h3 className="text-sm text-gray-400">Total Bookings</h3>
        <p className="text-2xl font-bold mt-2">120</p>
      </div>
    </div>
  );
}


 