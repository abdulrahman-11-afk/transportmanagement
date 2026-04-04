"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function VerifyNINPage() {
  const [nin, setNin] = useState<string>("");
  const router = useRouter();

  const handleVerify = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (nin.length !== 11) {
      alert("NIN must be 11 digits");
      return;
    }

    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      alert("User not found");
      return;
    }

    const user = JSON.parse(storedUser);

    const updatedUser = {
      ...user,
      nin,
      verified: true,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));

    router.push("/dashboard");
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Verify Your Identity
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Enter your NIN to continue
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleVerify} className="flex flex-col gap-4">

          <div>
            <label className="text-sm text-gray-600">National ID Number (NIN)</label>
            <input
              type="number"
              placeholder="Enter 11-digit NIN"
              value={nin}
              onChange={(e) => setNin(e.target.value)}
              className="w-full mt-1 border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
          >
            Verify & Continue
          </button>
        </form>
      </div>
    </section>
  );
}