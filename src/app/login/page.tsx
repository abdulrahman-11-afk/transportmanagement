"use client";

import { FcGoogle } from "react-icons/fc";
import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

const API = "https://transport-management-server-remi.onrender.com";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const router = useRouter();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API}/api/passenger/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed. Please check your credentials.");
        return;
      }

      // Save token and user info
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      router.push("/dashboard");
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex flex-col lg:flex-row bg-gray-100 text-black">

      {/* LEFT IMAGE */}
      <div className="hidden lg:block w-[50%]">
        <Image
          src="/aboutus.jpg"
          alt="Login"
          width={600}
          height={400}
          className="h-full w-full object-cover"
        />
      </div>

      {/* RIGHT FORM */}
      <div className="w-full lg:w-[50%] flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">

          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
            <p className="text-gray-500 text-sm mt-1">Login to continue your journey</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-4">

            <button
              type="button"
              className="flex items-center justify-center gap-3 border py-3 rounded-xl hover:bg-gray-900 hover:text-white transition font-medium"
            >
              <FcGoogle className="text-xl" />
              Continue with Google
            </button>

            <div className="flex items-center gap-2">
              <div className="h-[1px] bg-gray-300 w-full" />
              <span className="text-sm text-gray-400">OR</span>
              <div className="h-[1px] bg-gray-300 w-full" />
            </div>

            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Password</label>
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" />
                Remember me
              </label>
              <button type="button" className="text-blue-600 hover:underline">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition transform hover:scale-[1.02]"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{" "}
            <Link href="/Signup" className="text-blue-600 font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}