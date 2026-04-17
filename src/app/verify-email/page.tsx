"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API = "https://transport-management-server-remi.onrender.com";

export default function VerifyEmailPage() {
  const [verified, setVerified] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("verifyToken");

    if (!token) {
      setError("Session expired. Please sign up again.");
      return;
    }

   
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`${API}/api/passenger/check_verification`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        console.log("Poll response:", data);

        if (!res.ok) {
          setError(data.message || "Verification check failed.");
          clearInterval(interval);
          return;
        }

        if (data.isVerified) {
          clearInterval(interval);
          setVerified(true);
        }
      } catch (err) {
        console.error("Polling error:", err);
      }
    }, 2000);

    return () => clearInterval(interval); 
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg text-center">

        {!verified ? (
          // ── WAITING STATE ──
          <>
            <div
              className="w-[72px] h-[72px] bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              {/* Animated spinner */}
              <svg
                className="animate-spin"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#2563eb"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M12 2a10 10 0 0 1 10 10" />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Verify Your Email
            </h2>
            <p className="text-gray-500 text-sm mb-8 leading-relaxed">
              We've sent a verification link to your email address. Please check
              your inbox and click the link to continue.
            </p>

            {error ? (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">
                {error}
              </div>
            ) : (
              <div className="bg-blue-50 rounded-xl p-4 text-sm text-blue-600">
                Waiting for verification...
              </div>
            )}

            <p className="text-xs text-gray-400 mt-6">
              Didn't receive an email?{" "}
              <button className="text-blue-500 hover:underline">Resend</button>
            </p>
          </>
        ) : (
          // ── VERIFIED STATE ──
          <>
            <div
              className="w-[72px] h-[72px] bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#16a34a"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Registration Successful
            </h2>
            <p className="text-gray-500 text-sm mb-8 leading-relaxed">
              Your account has been created and your email has been verified.
              You're all set to start booking trips.
            </p>

            <div className="bg-gray-50 rounded-xl p-4 mb-8 text-left flex flex-col gap-3">
              {["Account created", "Email verified", "Ready to book trips"].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#16a34a"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-sm text-gray-600">{item}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => router.push("/dashboard")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
            >
              Go to Dashboard
            </button>

            <p className="text-xs text-gray-400 mt-5">
              Need help?{" "}
              <a href="/support" className="text-blue-500 hover:underline">
                Contact support
              </a>
            </p>
          </>
        )}
      </div>
    </section>
  );
}