"use client";

import { useState, useRef } from "react";

const mockBookings = [
  { ref: "TRP-A1B2C3", from: "Ibadan", to: "Lagos", date: "2025-03-12", seat: "B2", price: 7000, status: "Completed" },
  { ref: "TRP-D4E5F6", from: "Lagos", to: "Abuja", date: "2025-02-28", seat: "A3", price: 12500, status: "Completed" },
  { ref: "TRP-G7H8I9", from: "Ibadan", to: "Osogbo", date: "2025-04-01", seat: "C4", price: 5000, status: "Upcoming" },
  { ref: "TRP-J0K1L2", from: "Ilorin", to: "Lagos", date: "2025-01-15", seat: "D1", price: 8000, status: "Cancelled" },
];

export default function ProfilePage() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const [info, setInfo] = useState({
    firstName: "Ade",
    lastName: "Okafor",
    email: "ade.okafor@gmail.com",
    phone: "08034567890",
    city: "Ibadan",
    gender: "Male",
  });
  const [draft, setDraft] = useState({ ...info });

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    setInfo({ ...draft });
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const totalSpent = mockBookings.filter(b => b.status === "Completed").reduce((s, b) => s + b.price, 0);
  const completedTrips = mockBookings.filter(b => b.status === "Completed").length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');
        .pro-page { font-family: 'DM Sans', sans-serif; }
        .pro-title { font-family: 'Syne', sans-serif; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);} }
        .fu { animation: fadeUp 0.4s ease both; }
        .fu1{animation-delay:.05s;}.fu2{animation-delay:.12s;}.fu3{animation-delay:.2s;}.fu4{animation-delay:.28s;}
        @keyframes popIn { 0%{transform:scale(0.8);opacity:0;} 70%{transform:scale(1.05);} 100%{transform:scale(1);opacity:1;} }
        .pop { animation: popIn 0.35s cubic-bezier(.4,0,.2,1) both; }
      `}</style>

      <div className="pro-page space-y-6 max-w-2xl">

        {saved && (
          <div className="pop fixed top-5 right-5 z-50 bg-emerald-500 text-white px-5 py-3 rounded-2xl shadow-lg text-sm font-semibold">
            ✓ Profile saved!
          </div>
        )}

        {/* Profile card */}
        <div className="fu bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="h-20 bg-gradient-to-r from-blue-500 to-blue-700" />
          <div className="px-6 pb-6 -mt-10">
            <div className="flex items-end justify-between">
              <div className="relative">
                <div
                  onClick={() => fileRef.current?.click()}
                  className="w-20 h-20 rounded-2xl border-4 border-white shadow-md overflow-hidden bg-blue-100 cursor-pointer hover:opacity-90 transition"
                >
                  {photo
                    ? <img src={photo} className="w-full h-full object-cover" alt="Profile" />
                    : <div className="w-full h-full flex items-center justify-center text-3xl">
                        {info.firstName[0]}{info.lastName[0]}
                      </div>
                  }
                </div>
                <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center cursor-pointer shadow"
                  onClick={() => fileRef.current?.click()}>✏</div>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
              </div>
              <button
                onClick={() => editing ? handleSave() : setEditing(true)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition shadow-sm
                  ${editing ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              >
                {editing ? "Save Changes" : "Edit Profile"}
              </button>
            </div>
            <div className="mt-3">
              <h2 className="pro-title text-xl font-bold text-gray-900">{info.firstName} {info.lastName}</h2>
              <p className="text-sm text-gray-400">{info.email}</p>
            </div>
          </div>
        </div>

        {/* Account stats */}
        <div className="fu fu1 grid grid-cols-3 gap-4">
          {[
            { label: "Total Trips", value: mockBookings.length, icon: "🎫" },
            { label: "Completed", value: completedTrips, icon: "✅" },
            { label: "Total Spent", value: `₦${totalSpent.toLocaleString()}`, icon: "💸" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl shadow-sm p-4 text-center">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="pro-title text-lg font-bold text-gray-800">{stat.value}</div>
              <div className="text-xs text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Edit personal info */}
        <div className="fu fu2 bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50">
            <h3 className="pro-title font-bold text-gray-800">Personal Information</h3>
          </div>
          <div className="px-6 py-5 grid grid-cols-2 gap-4">
            {[
              { key: "firstName", label: "First Name" },
              { key: "lastName", label: "Last Name" },
              { key: "email", label: "Email" },
              { key: "phone", label: "Phone" },
              { key: "city", label: "City" },
            ].map(({ key, label }) => (
              <div key={key}>
                <label className="text-xs font-medium text-gray-400 block mb-1">{label}</label>
                {editing
                  ? <input
                      value={draft[key as keyof typeof draft]}
                      onChange={(e) => setDraft((p) => ({ ...p, [key]: e.target.value }))}
                      className="w-full border border-gray-200 p-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                  : <p className="text-sm font-medium text-gray-800 py-2.5">{info[key as keyof typeof info]}</p>
                }
              </div>
            ))}
            <div>
              <label className="text-xs font-medium text-gray-400 block mb-1">Gender</label>
              {editing
                ? <select value={draft.gender} onChange={(e) => setDraft((p) => ({ ...p, gender: e.target.value }))}
                    className="w-full border border-gray-200 p-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300">
                    {["Male", "Female", "Prefer not to say"].map((g) => <option key={g}>{g}</option>)}
                  </select>
                : <p className="text-sm font-medium text-gray-800 py-2.5">{info.gender}</p>
              }
            </div>
          </div>
          {editing && (
            <div className="px-6 pb-5 flex gap-3">
              <button onClick={() => { setEditing(false); setDraft({ ...info }); }}
                className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition">
                Cancel
              </button>
              <button onClick={handleSave}
                className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition">
                Save Changes
              </button>
            </div>
          )}
        </div>

        {/* Booking history */}
        <div className="fu fu3 bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50">
            <h3 className="pro-title font-bold text-gray-800">Booking History</h3>
          </div>
          <div className="divide-y divide-gray-50">
            {mockBookings.map((b) => (
              <div key={b.ref} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center text-lg">🚌</div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{b.from} → {b.to}</p>
                    <p className="text-xs text-gray-400">{b.date} · Seat {b.seat} · <span className="font-mono">{b.ref}</span></p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-800">₦{b.price.toLocaleString()}</p>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full
                    ${b.status === "Completed" ? "bg-emerald-100 text-emerald-600"
                    : b.status === "Upcoming" ? "bg-blue-100 text-blue-600"
                    : "bg-red-100 text-red-500"}`}>
                    {b.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}