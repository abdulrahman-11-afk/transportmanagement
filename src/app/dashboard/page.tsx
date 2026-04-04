"use client";

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

      {/* LEFT CONTENT */}
      <div className="lg:col-span-2 flex flex-col gap-4">

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-blue-600 text-white p-4 rounded-2xl shadow">
            <p className="text-sm">Total Trips</p>
            <h2 className="text-2xl font-bold">₦238,000</h2>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow">
            <p className="text-sm text-gray-500">Total Deliveries</p>
            <h2 className="text-2xl font-bold">35,874</h2>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow">
            <p className="text-sm text-gray-500">Pending</p>
            <h2 className="text-2xl font-bold">64%</h2>
          </div>
        </div>

        {/* ANALYTICS */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="font-semibold mb-4">Analytics</h3>

          {/* Fake chart bars */}
          <div className="flex items-end gap-2 h-40">
            {[20, 40, 60, 30, 80, 50, 70].map((h, i) => (
              <div
                key={i}
                className="bg-blue-600 w-6 rounded"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        {/* FLEET */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="font-semibold mb-4">Fleet Overview</h3>

          <div className="flex justify-between">
            <p>🚢 Ships</p>
            <p>2,345</p>
          </div>

          <div className="flex justify-between mt-2">
            <p>🚚 Trucks</p>
            <p>1,200</p>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="bg-white p-4 rounded-2xl shadow flex flex-col gap-4">

        <h3 className="font-semibold">Recent Trips</h3>

        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="border p-3 rounded-xl flex justify-between items-center"
          >
            <div>
              <p className="font-medium">Ibadan → Lagos</p>
              <p className="text-xs text-gray-400">Shipment #{item}</p>
            </div>

            <span className="text-green-600 text-sm">Delivered</span>
          </div>
        ))}
      </div>
    </div>
  );
}