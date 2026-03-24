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

        console.log({ from, to, date, passengers });

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
        <section className="flex flex-col items-center pt-20 gap-8 mx-20">
            <div className="text-center">
                <h2 className="text-3xl text-[#1E3A8A] font-semibold">Book Your Journey</h2>
                <p className="">Select from available buses or cars that fit your schedule.</p>
            </div>
            <form
                onSubmit={handleSearch}
                className="bg-white rounded-xl shadow-2xl mt-4 p-8 flex flex-col  gap-4 w-full "
            >
                <div className="flex items-center gap-6">
                     <div className="w-full flex flex-col gap-2">
                        <label className="flex items-center gap-1"><IoLocationOutline className="text-lg" />From</label>
                        <select
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                            className="border p-3 rounded-lg w-full h-12"
                            required
                        >
                            <option value="">From</option>
                            {locations.map((loc) => (
                                <option key={loc} value={loc}>
                                    {loc}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <label className="flex items-center gap-1"><IoLocationOutline className="text-lg" />To</label>
                        <select
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                            className="border p-3 rounded-lg w-full h-12"
                            required
                        >
                            <option value="">To</option>
                            {locations.map((loc) => (
                                <option key={loc} value={loc}>
                                    {loc}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="w-full">
                        <label>Travel Date</label>
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border p-3 rounded-lg w-full h-12" required />
                    </div>
                    <div className="w-full">
                        <label>Passengers</label>
                        <select value={passengers} onChange={(e) => setPassengers(e.target.value)} className="border p-3 rounded-lg w-full h-12" required>
                            <option value="">Passengers</option>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9,].map((num) => (
                                <option key={num} value={num}>
                                    {num} {num === 1 ? "Passenger" : "Passengers"}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <button type="submit" className="bg-[#1E3A8A]  text-white px-6 py-3 rounded-lg font-semibold">
                    Search Trips
                </button>
                  <p className="text-center text-[#9A9797]">You’ll be redirected to login to continue your booking.</p>
            </form>
        </section>
    );
}