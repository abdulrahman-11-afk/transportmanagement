"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

type Seat = {
  id: string;
  status: "available" | "taken" | "selected";
};

function generateSeats(): Seat[] {
  const taken = ["A2", "B3", "C1", "D4", "E2", "F1"];
  const rows = ["A", "B", "C", "D", "E", "F"];
  const seats: Seat[] = [];
  for (const row of rows) {
    for (let i = 1; i <= 4; i++) {
      const id = `${row}${i}`;
      seats.push({ id, status: taken.includes(id) ? "taken" : "available" });
    }
  }
  return seats;
}

function BookingContent() {
  const params = useSearchParams();
  const router = useRouter();

  const busName = params.get("busName") || "ABC Transport";
  const from = params.get("from") || "Ibadan";
  const to = params.get("to") || "Lagos";
  const price = params.get("price") || "5000";
  const date = params.get("date") || "";

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  const [seats, setSeats] = useState<Seat[]>(generateSeats());
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);

  const [paymentMethod, setPaymentMethod] = useState<"card" | "transfer">("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");

  const [kinName, setKinName] = useState("");
  const [kinPhone, setKinPhone] = useState("");
  const [kinRelationship, setKinRelationship] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const bookingRef = `TRP-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  const goToStep = (next: 1 | 2 | 3, dir: "forward" | "back") => {
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setStep(next);
      setAnimating(false);
    }, 400);
  };

  const selectSeat = (seat: Seat) => {
    if (seat.status === "taken") return;
    setSeats((prev) =>
      prev.map((s) => {
        if (s.id === selectedSeat) return { ...s, status: "available" };
        if (s.id === seat.id) return { ...s, status: "selected" };
        return s;
      })
    );
    setSelectedSeat(seat.id);
  };

  const validateStep1 = () => {
    const e: Record<string, string> = {};
    if (!selectedSeat) e.seat = "Please select a seat to continue.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e: Record<string, string> = {};
    if (paymentMethod === "card") {
      if (!cardName) e.cardName = "Required";
      if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ""))) e.cardNumber = "Enter a valid 16-digit number";
      if (!/^\d{2}\/\d{2}$/.test(expiry)) e.expiry = "Format: MM/YY";
      if (!/^\d{3,4}$/.test(cvv)) e.cvv = "Invalid CVV";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep3 = () => {
    const e: Record<string, string> = {};
    if (!kinName) e.kinName = "Required";
    if (!kinPhone) e.kinPhone = "Required";
    if (!kinRelationship) e.kinRelationship = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) goToStep(2, "forward");
    if (step === 2 && validateStep2()) goToStep(3, "forward");
  };

  const handleBack = () => {
    if (step === 2) goToStep(1, "back");
    if (step === 3) goToStep(2, "back");
  };

  const handleConfirm = async () => {
    if (!validateStep3()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    setConfirmed(true);
  };

  const formatCard = (val: string) =>
    val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  const formatExpiry = (val: string) =>
    val.replace(/\D/g, "").slice(0, 4).replace(/^(\d{2})(\d)/, "$1/$2");

  const stepLabels = ["Select Seat", "Payment", "Next of Kin"];

  // ── CONFIRMED ──────────────────────────────────────────────
  if (confirmed) {
    return (
      <>
        <style>{`
          @keyframes popIn {
            0% { transform: scale(0.5); opacity: 0; }
            70% { transform: scale(1.1); }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes fadeUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          .pop-in { animation: popIn 0.5s cubic-bezier(.36,.07,.19,.97) both; }
          .fade-up { animation: fadeUp 0.5s ease both; }
          .fade-up-1 { animation-delay: 0.15s; }
          .fade-up-2 { animation-delay: 0.25s; }
          .fade-up-3 { animation-delay: 0.35s; }
          .fade-up-4 { animation-delay: 0.45s; }

          /* ── Print styles ── */
          @media print {
            /* Hide everything on the page */
            body * {
              visibility: hidden !important;
            }
            /* Show only the receipt and its children */
            .print-receipt,
            .print-receipt * {
              visibility: visible !important;
            }
            /* Position the receipt to fill the page */
            .print-receipt {
              position: fixed !important;
              top: 0 !important;
              left: 0 !important;
              width: 100% !important;
              margin: 0 !important;
              padding: 24px !important;
              box-shadow: none !important;
              border-radius: 0 !important;
            }
            /* Hide action buttons */
            .print-hide {
              display: none !important;
            }
          }
        `}</style>

        <div className="max-w-md text-center">
          {/* Add print-receipt class to the card only */}
          <div className="print-receipt bg-white rounded-3xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-8">
              <div className="pop-in text-6xl mb-3">🎉</div>
              <h2 className="fade-up text-white text-2xl font-bold">Booking Confirmed!</h2>
              <p className="fade-up fade-up-1 text-blue-100 text-sm mt-1">Your seat is reserved</p>
            </div>
            <div className="p-6 space-y-4 text-left">
              <div className="fade-up fade-up-1 bg-blue-50 rounded-2xl p-4 space-y-2 text-sm">
                <Row label="Booking ID" value={<span className="font-bold text-blue-600">{bookingRef}</span>} />
                <Row label="Route" value={`${from} → ${to}`} />
                <Row label="Bus" value={busName} />
                {date && <Row label="Date" value={date} />}
                <Row label="Seat" value={selectedSeat!} />
                <div className="border-t pt-2">
                  <Row label="Amount Paid" value={<span className="text-green-600 font-bold">₦{Number(price).toLocaleString()}</span>} />
                </div>
              </div>

              {/* Buttons hidden on print */}
              <button
                onClick={() => router.push("/dashboard/trips")}
                className="print-hide fade-up fade-up-3 w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                Back to Trips
              </button>
              <button
                onClick={() => window.print()}
                className="print-hide fade-up fade-up-4 w-full border border-gray-200 text-gray-600 py-3 rounded-xl font-semibold hover:bg-gray-50 transition"
              >
                🖨️ Print Receipt
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ── BOOKING WIZARD ─────────────────────────────────────────
  return (
    <>
      <style>{`
        @keyframes slideInForward {
          from { transform: translateX(60px); opacity: 0; }
          to   { transform: translateX(0);   opacity: 1; }
        }
        @keyframes slideOutForward {
          from { transform: translateX(0);    opacity: 1; }
          to   { transform: translateX(-60px); opacity: 0; }
        }
        @keyframes slideInBack {
          from { transform: translateX(-60px); opacity: 0; }
          to   { transform: translateX(0);     opacity: 1; }
        }
        @keyframes slideOutBack {
          from { transform: translateX(0);   opacity: 1; }
          to   { transform: translateX(60px); opacity: 0; }
        }
        .slide-in-forward  { animation: slideInForward  0.35s cubic-bezier(.4,0,.2,1) both; }
        .slide-out-forward { animation: slideOutForward 0.35s cubic-bezier(.4,0,.2,1) both; }
        .slide-in-back     { animation: slideInBack     0.35s cubic-bezier(.4,0,.2,1) both; }
        .slide-out-back    { animation: slideOutBack    0.35s cubic-bezier(.4,0,.2,1) both; }

        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner { animation: spin 0.8s linear infinite; }
      `}</style>

      <div className="max-w-lg space-y-5">

        {/* Step indicator */}
        <div className="flex items-center gap-2">
          {stepLabels.map((label, i) => {
            const num = i + 1;
            const active = step === num;
            const done = step > num;
            return (
              <div key={label} className="flex items-center gap-2 flex-1">
                <div className={`flex items-center gap-2 transition-all duration-300 ${active ? "opacity-100" : "opacity-50"}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300
                    ${done ? "bg-green-500 text-white" : active ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"}`}>
                    {done ? "✓" : num}
                  </div>
                  <span className={`text-xs font-medium whitespace-nowrap ${active ? "text-blue-600" : "text-gray-400"}`}>
                    {label}
                  </span>
                </div>
                {i < 2 && (
                  <div className={`h-0.5 flex-1 rounded transition-all duration-500 ${done ? "bg-green-400" : "bg-gray-200"}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Step content */}
        <div className="overflow-hidden">
          <div className={animating
            ? (direction === "forward" ? "slide-out-forward" : "slide-out-back")
            : (direction === "forward" ? "slide-in-forward" : "slide-in-back")
          }>

            {/* ── STEP 1: Seat ── */}
            {step === 1 && (
              <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
                <h3 className="font-bold text-gray-800">Choose Your Seat</h3>

                <div className="flex gap-4 text-xs">
                  {[
                    { color: "bg-green-100 border border-green-400", label: "Available" },
                    { color: "bg-blue-500", label: "Selected" },
                    { color: "bg-gray-200", label: "Taken" },
                  ].map(({ color, label }) => (
                    <span key={label} className="flex items-center gap-1.5">
                      <span className={`w-4 h-4 rounded ${color} inline-block`} />
                      {label}
                    </span>
                  ))}
                </div>

                <div className="flex justify-end">
                  <span className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full">🚌 Driver</span>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {["A", "B", "C", "D", "E", "F"].flatMap((row) => [
                    ...[1, 2].map((col) => {
                      const seat = seats.find((s) => s.id === `${row}${col}`)!;
                      return (
                        <button
                          key={seat.id}
                          type="button"
                          onClick={() => selectSeat(seat)}
                          disabled={seat.status === "taken"}
                          className={`py-2 rounded-lg text-xs font-semibold border transition-all
                            ${seat.status === "taken" ? "bg-gray-100 text-gray-300 border-gray-100 cursor-not-allowed" : ""}
                            ${seat.status === "available" ? "bg-green-50 border-green-300 text-green-700 hover:bg-green-100 hover:scale-105" : ""}
                            ${seat.status === "selected" ? "bg-blue-500 border-blue-500 text-white scale-105 shadow-md" : ""}
                          `}
                        >
                          {seat.id}
                        </button>
                      );
                    }),
                    <div key={`aisle-${row}`} />,
                    ...[3, 4].map((col) => {
                      const seat = seats.find((s) => s.id === `${row}${col}`)!;
                      return (
                        <button
                          key={seat.id}
                          type="button"
                          onClick={() => selectSeat(seat)}
                          disabled={seat.status === "taken"}
                          className={`py-2 rounded-lg text-xs font-semibold border transition-all
                            ${seat.status === "taken" ? "bg-gray-100 text-gray-300 border-gray-100 cursor-not-allowed" : ""}
                            ${seat.status === "available" ? "bg-green-50 border-green-300 text-green-700 hover:bg-green-100 hover:scale-105" : ""}
                            ${seat.status === "selected" ? "bg-blue-500 border-blue-500 text-white scale-105 shadow-md" : ""}
                          `}
                        >
                          {seat.id}
                        </button>
                      );
                    }),
                  ])}
                </div>

                {errors.seat && <p className="text-red-500 text-xs">{errors.seat}</p>}
                {selectedSeat && (
                  <p className="text-sm text-blue-600 font-medium">✓ Seat {selectedSeat} selected</p>
                )}
              </div>
            )}

            {/* ── STEP 2: Payment ── */}
            {step === 2 && (
              <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
                <h3 className="font-bold text-gray-800">Payment Details</h3>

                <div className="flex gap-3">
                  {(["card", "transfer"] as const).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method)}
                      className={`flex-1 py-2.5 rounded-xl border text-sm font-medium transition-all
                        ${paymentMethod === method
                          ? "bg-blue-600 text-white border-blue-600 shadow-md"
                          : "border-gray-200 text-gray-500 hover:bg-gray-50"}`}
                    >
                      {method === "card" ? "💳 Card" : "🏦 Transfer"}
                    </button>
                  ))}
                </div>

                {paymentMethod === "card" ? (
                  <div className="space-y-3">
                    <Field label="Cardholder Name" error={errors.cardName}>
                      <input value={cardName} onChange={(e) => setCardName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" />
                    </Field>
                    <Field label="Card Number" error={errors.cardNumber}>
                      <input value={cardNumber} onChange={(e) => setCardNumber(formatCard(e.target.value))}
                        placeholder="0000 0000 0000 0000" maxLength={19}
                        className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" />
                    </Field>
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Expiry" error={errors.expiry}>
                        <input value={expiry} onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                          placeholder="MM/YY" maxLength={5}
                          className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" />
                      </Field>
                      <Field label="CVV" error={errors.cvv}>
                        <input value={cvv} onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                          placeholder="123" maxLength={4}
                          className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" />
                      </Field>
                    </div>
                  </div>
                ) : (
                  <div className="bg-blue-50 rounded-2xl p-4 space-y-2 text-sm">
                    <p className="font-semibold text-gray-700 mb-2">Transfer to:</p>
                    <Row label="Bank" value="First Bank" />
                    <Row label="Account No." value={<span className="font-bold">0123456789</span>} />
                    <Row label="Account Name" value="Transport Co. Ltd" />
                    <Row label="Amount" value={<span className="text-green-600 font-bold">₦{Number(price).toLocaleString()}</span>} />
                    <p className="text-xs text-gray-400 pt-1">Transfer then click Next to continue.</p>
                  </div>
                )}
              </div>
            )}

            {/* ── STEP 3: Next of Kin ── */}
            {step === 3 && (
              <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
                <h3 className="font-bold text-gray-800">Next of Kin</h3>
                <p className="text-xs text-gray-400">This info is kept confidential and only used in emergencies.</p>

                <Field label="Full Name" error={errors.kinName}>
                  <input value={kinName} onChange={(e) => setKinName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" />
                </Field>
                <Field label="Phone Number" error={errors.kinPhone}>
                  <input value={kinPhone} onChange={(e) => setKinPhone(e.target.value.replace(/\D/g, "").slice(0, 11))}
                    placeholder="08012345678"
                    className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" />
                </Field>
                <Field label="Relationship" error={errors.kinRelationship}>
                  <select value={kinRelationship} onChange={(e) => setKinRelationship(e.target.value)}
                    className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300">
                    <option value="">Select relationship</option>
                    {["Parent", "Spouse", "Sibling", "Child", "Friend", "Other"].map((r) => (
                      <option key={r}>{r}</option>
                    ))}
                  </select>
                </Field>

                <div className="bg-gray-50 rounded-2xl p-4 text-sm space-y-2 mt-2">
                  <p className="font-semibold text-gray-600 text-xs uppercase tracking-wide mb-2">Booking Summary</p>
                  <Row label="Seat" value={selectedSeat!} />
                  <Row label="Route" value={`${from} → ${to}`} />
                  <div className="border-t pt-2">
                    <Row label="Total" value={<span className="text-blue-600 font-bold">₦{Number(price).toLocaleString()}</span>} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex gap-3">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-xl font-semibold hover:bg-gray-50 transition"
            >
              ← Back
            </button>
          )}

          {step < 3 ? (
            <button
              onClick={handleNext}
              className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition shadow-md"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={handleConfirm}
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition shadow-md disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="spinner w-4 h-4 border-2 border-white border-t-transparent rounded-full inline-block" />
                  Processing...
                </>
              ) : (
                `Confirm Booking — ₦${Number(price).toLocaleString()}`
              )}
            </button>
          )}
        </div>

      </div>
    </>
  );
}

// ── Small helper components ──────────────────────────────────

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs text-gray-500 mb-1 block font-medium">{label}</label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-400">{label}</span>
      <span className="font-medium text-gray-700">{value}</span>
    </div>
  );
}

// ── Page export ──────────────────────────────────────────────
export default function BookPage() {
  return (
    <Suspense fallback={<div className="p-6 text-gray-500">Loading booking...</div>}>
      <BookingContent />
    </Suspense>
  );
}