"use client";

import { useState } from "react";

export default function SettingsPage() {
  // Notifications
  const [notifs, setNotifs] = useState({
    bookingConfirmation: true,
    tripReminders: true,
    promotions: false,
    smsAlerts: true,
    emailDigest: false,
  });

  // Password
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [pwdError, setPwdError] = useState("");
  const [pwdSuccess, setPwdSuccess] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const strength = newPwd.length === 0 ? 0
    : newPwd.length < 6 ? 1
    : newPwd.length < 10 ? 2
    : /[^a-zA-Z0-9]/.test(newPwd) ? 4 : 3;

  const strengthLabel = ["", "Weak", "Fair", "Strong", "Very Strong"];
  const strengthColor = ["", "bg-red-400", "bg-amber-400", "bg-blue-500", "bg-emerald-500"];

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setPwdError("");
    if (!currentPwd) return setPwdError("Enter your current password.");
    if (newPwd.length < 6) return setPwdError("New password must be at least 6 characters.");
    if (newPwd !== confirmPwd) return setPwdError("Passwords do not match.");
    setPwdSuccess(true);
    setCurrentPwd(""); setNewPwd(""); setConfirmPwd("");
    setTimeout(() => setPwdSuccess(false), 3000);
  };

  const Toggle = ({ on, onChange }: { on: boolean; onChange: () => void }) => (
    <button type="button" onClick={onChange}
      className={`w-11 h-6 rounded-full transition-colors relative ${on ? "bg-blue-600" : "bg-gray-200"}`}>
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${on ? "translate-x-5" : "translate-x-0"}`} />
    </button>
  );

  return (
    <>
     

      <div className="set-page max-w-2xl space-y-6">

        <div className="fu">
          <h1 className="set-title text-2xl font-extrabold text-gray-900">Settings</h1>
          <p className="text-gray-400 text-sm mt-0.5">Manage your preferences and security</p>
        </div>

        {/* Notification preferences */}
        <div className="fu fu1 bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50">
            <h2 className="set-title font-bold text-gray-800">🔔 Notification Preferences</h2>
            <p className="text-xs text-gray-400 mt-0.5">Choose how you want to be notified</p>
          </div>
          <div className="divide-y divide-gray-50">
            {[
              { key: "bookingConfirmation", label: "Booking Confirmations", desc: "Get notified when a booking is made" },
              { key: "tripReminders", label: "Trip Reminders", desc: "Reminders before your departure time" },
              { key: "smsAlerts", label: "SMS Alerts", desc: "Receive alerts via text message" },
              { key: "promotions", label: "Promotions & Offers", desc: "Deals and discount notifications" },
              { key: "emailDigest", label: "Weekly Email Digest", desc: "A weekly summary of your trips" },
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between px-6 py-4">
                <div>
                  <p className="text-sm font-medium text-gray-800">{label}</p>
                  <p className="text-xs text-gray-400">{desc}</p>
                </div>
                <Toggle
                  on={notifs[key as keyof typeof notifs]}
                  onChange={() => setNotifs((p) => ({ ...p, [key]: !p[key as keyof typeof notifs] }))}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Password change */}
        <div className="fu fu2 bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50">
            <h2 className="set-title font-bold text-gray-800">🔒 Change Password</h2>
            <p className="text-xs text-gray-400 mt-0.5">Keep your account secure</p>
          </div>
          <form onSubmit={handlePasswordChange} className="px-6 py-5 space-y-4">

            {pwdSuccess && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl px-4 py-3 text-sm font-medium">
                ✓ Password updated successfully!
              </div>
            )}
            {pwdError && (
              <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm">
                {pwdError}
              </div>
            )}

            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1">Current Password</label>
              <div className="relative">
                <input type={showCurrent ? "text" : "password"} value={currentPwd}
                  onChange={(e) => setCurrentPwd(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-gray-200 p-3 pr-10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" />
                <button type="button" onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-3 text-gray-400 text-xs">{showCurrent ? "Hide" : "Show"}</button>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1">New Password</label>
              <div className="relative">
                <input type={showNew ? "text" : "password"} value={newPwd}
                  onChange={(e) => setNewPwd(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-gray-200 p-3 pr-10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" />
                <button type="button" onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-3 text-gray-400 text-xs">{showNew ? "Hide" : "Show"}</button>
              </div>
              {newPwd.length > 0 && (
                <div className="mt-2 space-y-1">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= strength ? strengthColor[strength] : "bg-gray-100"}`} />
                    ))}
                  </div>
                  <p className={`text-xs font-medium ${["", "text-red-500", "text-amber-500", "text-blue-500", "text-emerald-500"][strength]}`}>
                    {strengthLabel[strength]}
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1">Confirm New Password</label>
              <input type="password" value={confirmPwd}
                onChange={(e) => setConfirmPwd(e.target.value)}
                placeholder="••••••••"
                className={`w-full border p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300
                  ${confirmPwd && confirmPwd !== newPwd ? "border-red-300" : "border-gray-200"}`} />
              {confirmPwd && confirmPwd !== newPwd && (
                <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
              )}
            </div>

            <button type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold text-sm hover:bg-blue-700 transition shadow-sm">
              Update Password
            </button>
          </form>
        </div>

      </div>
    </>
  );
}