"use client";

import { useState , useEffect } from "react";
import { useSearchParams } from "next/navigation";


export default function TripsPage() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState("");
  const [results, setResults] = useState([]);

  const locations = ["Ibadan", "Lagos", "Abuja", "Ilorin", "Osogbo"];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({ from, to, date, passengers });


  };
  const params = useSearchParams();


 useEffect(() => {
  if (from && to) {
    // run your filter logic here
  }
}, [from, to]);
  return (
   
    <div className="flex flex-col gap-6">

      {/* SEARCH BOX */}
      <div className="bg-white p-5 rounded-2xl shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Search Trips</h2>

        <form
          onSubmit={handleSearch}
          className="grid md:grid-cols-5 gap-4"
        >

          {/* FROM */}
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="border p-3 rounded-lg"
            required
          >
            <option value="">From</option>
            {locations.map((loc) => (
              <option key={loc}>{loc}</option>
            ))}
          </select>

          {/* TO */}
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="border p-3 rounded-lg"
            required
          >
            <option value="">To</option>
            {locations.map((loc) => (
              <option key={loc}>{loc}</option>
            ))}
          </select>

          {/* DATE */}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-3 rounded-lg"
            required
          />

          {/* PASSENGERS */}
          <select
            value={passengers}
            onChange={(e) => setPassengers(e.target.value)}
            className="border p-3 rounded-lg"
            required
          >
            <option value="">Passengers</option>
            {[1,2,3,4,5,6,7,8].map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? "Passenger" : "Passengers"}
              </option>
            ))}
          </select>

          {/* BUTTON */}
          <button className="bg-blue-600 text-white rounded-lg">
            Search
          </button>

        </form>
      </div>

    </div>
  );
}