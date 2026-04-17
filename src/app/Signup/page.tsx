"use client";

import { FcGoogle } from "react-icons/fc";
import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

const API = "https://transport-management-server-remi.onrender.com";

export default function SignupPage() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<"driver" | "passenger" | null>(null);
  const [showModal, setShowModal] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const router = useRouter();

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!role) {
      alert("Please select a role first");
      return;
    }

    if (role === "driver") {
      const userData = { name, email, role };
      localStorage.setItem("user", JSON.stringify(userData));
      router.push("/driver/complete-registration");
      return;
    }

    // Passenger registration
    setLoading(true);
    try {
      const response = await fetch(`${API}/api/passenger/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role: "Passenger" }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed. Please try again.");
        return;
      }

      const token = data.token;
      localStorage.setItem("verifyToken", token);
      localStorage.setItem("user", JSON.stringify({ name, email, role: "passenger" }));

      router.push("/verify-email");
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ROLE SELECTION MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-2xl text-black">
            <h2 className="text-xl font-semibold text-center mb-4">Sign up as</h2>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => { setRole("driver"); setShowModal(false); }}
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition"
              >
                Driver
              </button>
              <button
                onClick={() => { setRole("passenger"); setShowModal(false); }}
                className="bg-gray-100 hover:bg-gray-200 py-3 rounded-xl font-medium transition"
              >
                Passenger
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN PAGE */}
      <section className="min-h-screen flex flex-col lg:flex-row bg-gray-100 text-black">

        {/* LEFT IMAGE */}
        <div className="hidden lg:block w-[50%]">
          <Image
            src="/aboutus.jpg"
            alt="About"
            width={600}
            height={400}
            className="h-full w-full object-cover"
          />
        </div>

        {/* RIGHT FORM */}
        <div className="w-full lg:w-[50%] flex items-center justify-center p-6">
          <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">

            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
              <p className="text-gray-500 text-sm mt-1">
                {role === "driver"
                  ? "Create your driver account"
                  : role === "passenger"
                  ? "Start booking your trips"
                  : "Choose a role to continue"}
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">
                {error}
              </div>
            )}

            <form onSubmit={handleSignup} className="flex flex-col gap-4">

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

              {/* Full Name */}
              <div>
                <label className="text-sm text-gray-600">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full mt-1 border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  required
                />
              </div>

              {/* Email */}
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

              {/* Password */}
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

              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition transform hover:scale-[1.02]"
              >
                {loading ? "Creating Account..." : "Sign Up"}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 font-medium hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}