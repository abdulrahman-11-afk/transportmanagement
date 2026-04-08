"use client";

import { useState } from "react";

const myBookings = [
  { ref: "TRP-A1B2C3", from: "Ibadan", to: "Lagos", date: "2025-03-12", seat: "B2", price: 7000, bus: "GUO Transport", status: "Completed" },
  { ref: "TRP-D4E5F6", from: "Lagos", to: "Abuja", date: "2025-02-28", seat: "A3", price: 12500, bus: "ABC Transport", status: "Completed" },
  { ref: "TRP-G7H8I9", from: "Ibadan", to: "Osogbo", date: "2025-04-10", seat: "C4", price: 5000, bus: "GUO Transport", status: "Upcoming" },
  { ref: "TRP-J0K1L2", from: "Ilorin", to: "Lagos", date: "2025-01-15", seat: "D1", price: 8000, bus: "ABC Transport", status: "Cancelled" },
  { ref: "TRP-M3N4O5", from: "Ibadan", to: "Lagos", date: "2024-12-20", seat: "E2", price: 7000, bus: "GUO Transport", status: "Completed" },
];

type Status = "All" | "Completed" | "Upcoming" | "Cancelled";

export default function ReportsPage() {
  const [filter, setFilter] = useState<Status>("All");
  const [search, setSearch] = useState("");

  const filtered = myBookings.filter((b) => {
    const matchStatus = filter === "All" || b.status === filter;
    const matchSearch =
      b.ref.toLowerCase().includes(search.toLowerCase()) ||
      b.from.toLowerCase().includes(search.toLowerCase()) ||
      b.to.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const totalSpent = myBookings
    .filter((b) => b.status === "Completed")
    .reduce((s, b) => s + b.price, 0);

  const handleExportCSV = () => {
    const header = "Reference,From,To,Date,Seat,Bus,Price,Status\n";
    const rows = filtered
      .map((b) => `${b.ref},${b.from},${b.to},${b.date},${b.seat},${b.bus},${b.price},${b.status}`)
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "my_trips.csv";
    a.click();
  };

  return (
    <>
      
      <div className="rep space-y-6 max-w-2xl text-black">

        {/* Header */}
        <div className="fu flex items-start justify-between flex-wrap gap-3">
          <div>
            <h1 className="rep-title text-2xl font-extrabold text-gray-900">My Trips</h1>
            <p className="text-gray-400 text-sm mt-0.5">Your personal booking history</p>
          </div>
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm transition"
          >
            ⬇ Export CSV
          </button>
        </div>

        {/* Summary cards */}
        <div className="fu fu1 grid grid-cols-3 gap-4">
          {[
            { label: "Total Trips", value: myBookings.length, icon: "", color: "bg-blue-50 text-blue-600" },
            { label: "Completed", value: myBookings.filter((b) => b.status === "Completed").length, icon: "", color: "bg-emerald-50 text-emerald-600" },
            { label: "Total Spent", value: `₦${totalSpent.toLocaleString()}`, icon: "", color: "bg-amber-50 text-amber-600" },
          ].map((s) => (
            <div key={s.label} className={`${s.color} rounded-2xl p-4 text-center`}>
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="rep-title text-lg font-bold">{s.value}</div>
              <div className="text-xs opacity-70 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Search + filter */}
        <div className="fu fu2 flex flex-wrap gap-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by route or reference..."
            className="flex-1 min-w-[180px] border border-gray-200 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <div className="flex bg-white border border-gray-200 rounded-xl p-1 gap-1">
            {(["All", "Completed", "Upcoming", "Cancelled"] as Status[]).map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all
                  ${filter === s ? "bg-blue-600 text-white shadow-sm" : "text-gray-400 hover:text-gray-700"}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Booking list */}
        <div className="fu fu3 bg-white rounded-2xl shadow-sm overflow-hidden">
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-gray-400">
              <div className="text-4xl mb-3">🔍</div>
              <p className="text-sm">No trips found</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {filtered.map((b) => (
                <div key={b.ref} className="px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                      🚌
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {b.from} → {b.to}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {b.date} · Seat {b.seat} · {b.bus}
                      </p>
                      <p className="text-xs text-gray-300 font-mono mt-0.5">{b.ref}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-gray-800">₦{b.price.toLocaleString()}</p>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full mt-1 inline-block
                      ${b.status === "Completed" ? "bg-emerald-100 text-emerald-600"
                      : b.status === "Upcoming" ? "bg-blue-100 text-blue-600"
                      : "bg-red-100 text-red-500"}`}>
                      {b.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </>
  );
}