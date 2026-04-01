"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const savedSearch = localStorage.getItem("searchData");
    if (savedSearch) {
      const { from, to } = JSON.parse(savedSearch);
      window.location.href = `/trips?from=${from}&to=${to}`;
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({ email, password });

    localStorage.setItem("user", JSON.stringify({ email }));

    window.location.href = "/Trips";
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-600 text-sm">
            Login to continue booking your trips
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-700">Email</label>
            <input
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-700">Password</label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded-lg font-semibold hover:scale-[1.02] transition"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link href="/Signup" className="text-blue-600 font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
}