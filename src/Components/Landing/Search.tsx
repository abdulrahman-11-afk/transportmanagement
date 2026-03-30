"use client";
import { IoLocationOutline } from "react-icons/io5";
import { useState } from "react";

export default function SearchForm() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState("");

  const locations = ["Ibadan", "Osogbo", "Lagos", "Abuja", "Ilorin"];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const isLoggedIn = false;

    if (!isLoggedIn) {
      localStorage.setItem(
        "searchData",
        JSON.stringify({ from, to, date, passengers })
      );
      window.location.href = "/login";
      return;
    }

    const resultsSection = document.getElementById("results");
    resultsSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="flex flex-col items-center gap-8 max-w-6xl mt-30 mx-auto px-6">

      <div className="text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Book Your Journey
        </h2>
        <p className="text-gray-700 text-lg max-w-xl mx-auto leading-relaxed">
          Select from available buses or cars that fit your schedule.
        </p>
      </div>
      <form
        onSubmit={handleSearch}
        className="bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.15)]  p-6 md:p-8 flex flex-col gap-6 w-full"
      >

        <div className="flex flex-col md:flex-row gap-4">

          <div className="w-full flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
              <IoLocationOutline /> From
            </label>
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="border p-3 rounded-lg w-full h-12 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
              required
            >
              <option value="">Select location</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
              <IoLocationOutline /> To
            </label>
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="border p-3 rounded-lg w-full h-12 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
              required
            >
              <option value="">Select location</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Travel Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border p-3 rounded-lg w-full h-12 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
              required
            />
          </div>

          <div className="w-full flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Passengers
            </label>
            <select
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
              className="border p-3 rounded-lg w-full h-12 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
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

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:scale-[1.02] transition duration-300 shadow-md"
        >
          Search Trips
        </button>

        <p className="text-center text-sm text-gray-500">
          You'll be redirected to login to continue your booking.
        </p>
      </form>
    </section>
  );
}