"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

type Bus = {
  id: number;
  from: string;
  to: string;
  type: string;
  price: number;
  image: string;
};

const buses: Bus[] = [
  {
    id: 1,
    from: "Ibadan",
    to: "Osogbo",
    type: "Toyota Hiace",
    price: 5000,
    image: "/bus1.jpg",
  },
  {
    id: 2,
    from: "Ibadan",
    to: "Lagos",
    type: "Toyota Coaster",
    price: 7000,
    image: "/bus2.jpg",
  },
];

const locations = ["Ibadan", "Lagos", "Abuja", "Ilorin", "Osogbo"];

function TripsContent() {
  const params = useSearchParams();
  const router = useRouter(); // ✅ moved INSIDE the component

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState("");
  const [results, setResults] = useState<Bus[]>([]);

  const filterBuses = (fromValue: string, toValue: string) => {
    const filtered = buses.filter(
      (bus) =>
        bus.from.toLowerCase() === fromValue.toLowerCase() &&
        bus.to.toLowerCase() === toValue.toLowerCase()
    );
    setResults(filtered);
  };

  useEffect(() => {
    const fromParam = params.get("from") || "";
    const toParam = params.get("to") || "";
    const dateParam = params.get("date") || "";
    const passengersParam = params.get("passengers") || "";

    setFrom(fromParam);
    setTo(toParam);
    setDate(dateParam);
    setPassengers(passengersParam);

    if (fromParam && toParam) {
      filterBuses(fromParam, toParam);
    }
  }, [params]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    filterBuses(from, to);
  };

  return (
    <div className="flex flex-col gap-6 text-black">

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

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <select value={passengers} onChange={(e) => setPassengers(e.target.value)} className="border p-3 rounded-lg">
            <option value="">Passengers</option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num}>{num}</option>
            ))}
          </select>

          <button type="submit" className="bg-blue-600 text-white rounded-lg">
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
              <img src={bus.image} className="w-full h-40 object-cover" alt={bus.type} />
              <div className="p-4">
                <p className="font-semibold">{bus.from} → {bus.to}</p>
                <p className="text-sm">Type: {bus.type}</p>
                <p className="text-blue-600 font-bold">₦{bus.price}</p>
                <button
                  onClick={() =>
                    router.push(
                      // ✅ using bus.type instead of bus.name since name was removed
                      `/dashboard/trips/book?busName=${encodeURIComponent(bus.type)}&from=${bus.from}&to=${bus.to}&price=${bus.price}&date=${date}`
                    )
                  }
                  className="bg-blue-600 text-white py-2 rounded-lg w-full mt-2"
                >
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

export default function TripsPage() {
  return (
    <Suspense fallback={<div className="p-6 text-gray-500">Loading trips...</div>}>
      <TripsContent />
    </Suspense>
  );
}