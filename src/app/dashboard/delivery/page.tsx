"use client";

export default function DeliveryPage() {
  return (
    <>
     

      <div className="del-page min-h-[70vh] flex items-center justify-center px-4 text-black">
        <div className="text-center max-w-md">

        
         

          <h1 className="fu del-title text-3xl font-extrabold text-gray-900 mb-3">
            Delivery is Coming Soon
          </h1>
          <p className="fu fu1 text-gray-400 text-sm leading-relaxed mb-8">
            We're working hard to bring package delivery right to your fingertips.
            Send parcels across Nigeria with real-time tracking, affordable rates, and trusted drivers.
          </p>

          {/* Feature preview pills */}
          <div className="fu fu2 flex flex-wrap justify-center gap-2 mb-8">
            {[
              " Real-time Tracking",
              " Fast Delivery",
              " Insured Parcels",
              " Affordable Rates",
              " SMS Updates",
            ].map((f) => (
              <span key={f} className="bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1.5 rounded-full border border-blue-100">
                {f}
              </span>
            ))}
          </div>

          {/* Notify form */}
          <div className="fu fu3 bg-white rounded-2xl shadow-sm p-5 text-left">
            <p className="text-sm font-semibold text-gray-700 mb-3">Get notified when it launches 🔔</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 border border-gray-200 px-3 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button className="bg-blue-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition shadow-sm">
                Notify Me
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}