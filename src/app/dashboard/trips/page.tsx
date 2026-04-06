"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

type Bus = {
  id: number;
  from: string;
  to: string;
  name: string;
  type: string;
  price: number;
  image: string;
};

export default function TripsPage() {
  const params = useSearchParams();
useEffect(() => {
  const fromParam = params.get("from");
  const toParam = params.get("to");
  const dateParam = params.get("date");
  const passengersParam = params.get("passengers");

  if (!fromParam || !toParam) return;

  // ✅ set values
  setFrom(fromParam);
  setTo(toParam);
  setDate(dateParam || "");
  setPassengers(passengersParam || "");

  // ✅ RUN SEARCH DIRECTLY (NO STATE DEPENDENCY)
  const filtered = buses.filter(
    (bus) =>
      bus.from.toLowerCase() === fromParam.toLowerCase() &&
      bus.to.toLowerCase() === toParam.toLowerCase()
  );

  setResults(filtered);

}, [params]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState("");
  const [results, setResults] = useState<Bus[]>([]);

  const locations = ["Ibadan", "Lagos", "Abuja", "Ilorin", "Osogbo"];

  // ✅ Dummy data
  const buses: Bus[] = [
    {
      id: 1,
      from: "Ibadan",
      to: "Osogbo",
      name: "ABC Transport",
      type: "Toyota Hiace",
      price: 5000,
      image: "/bus1.jpg",
    },
    {
      id: 2,
      from: "Ibadan",
      to: "Lagos",
      name: "GUO Transport",
      type: "Toyota Coaster",
      price: 7000,
      image: "/bus2.jpg",
    },
  ];

  // ✅ FILTER FUNCTION
  const filterBuses = (fromValue: string, toValue: string) => {
    const filtered = buses.filter(
      (bus) =>
        bus.from.toLowerCase() === fromValue.toLowerCase() &&
        bus.to.toLowerCase() === toValue.toLowerCase()
    );

    setResults(filtered);
  };

  // ✅ READ URL + AUTO SEARCH
  useEffect(() => {
    const fromParam = params.get("from") || "";
    const toParam = params.get("to") || "";
    const dateParam = params.get("date") || "";
    const passengersParam = params.get("passengers") || "";

    // set form values
    setFrom(fromParam);
    setTo(toParam);
    setDate(dateParam);
    setPassengers(passengersParam);

    // 🔥 AUTO FILTER (THIS WAS MISSING)
    if (fromParam && toParam) {
      filterBuses(fromParam, toParam);
    }
  }, [params]);

  // ✅ FORM SUBMIT (manual search)
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    filterBuses(from, to);
  };

  return (
    <div className="flex flex-col gap-6">

      {/* SEARCH */}
      <div className="bg-white p-5 rounded-2xl shadow-sm">
        <form onSubmit={handleSearch} className="grid md:grid-cols-5 gap-4">

          <select value={from} onChange={(e) => setFrom(e.target.value)} className="border p-3 rounded-lg">
            <option value="">From</option>
            {locations.map((loc) => (
              <option key={loc}>{loc}</option>
            ))}
          </select>

          <select value={to} onChange={(e) => setTo(e.target.value)} className="border p-3 rounded-lg">
            <option value="">To</option>
            {locations.map((loc) => (
              <option key={loc}>{loc}</option>
            ))}
          </select>

          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border p-3 rounded-lg" />

          <select value={passengers} onChange={(e) => setPassengers(e.target.value)} className="border p-3 rounded-lg">
            <option value="">Passengers</option>
            {[1,2,3,4,5].map((num) => (
              <option key={num}>{num}</option>
            ))}
          </select>

          <button className="bg-blue-600 text-white rounded-lg">
            Search
          </button>
        </form>
      </div>

      {/* RESULTS */}
      <div className="grid md:grid-cols-2 gap-4">

        {results.length === 0 ? (
          <p className="text-gray-500">No trips found</p>
        ) : (
          results.map((bus) => (
            <div key={bus.id} className="bg-white rounded-xl shadow overflow-hidden">

              <img src={bus.image} className="w-full h-40 object-cover" />

              <div className="p-4">
                <h3 className="font-semibold">{bus.name}</h3>
                <p className="text-sm text-gray-500">
                  {bus.from} → {bus.to}
                </p>
                <p className="text-sm">Type: {bus.type}</p>
                <p className="text-blue-600 font-bold">₦{bus.price}</p>

                <button className="bg-blue-600 text-white py-2 rounded-lg w-full mt-2">
                  Book Now
                </button>
              </div>

            </div>
          ))
        )}

      </div>
    </div>
  );
}