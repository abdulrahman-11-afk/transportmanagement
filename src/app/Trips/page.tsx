"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { trips } from "@/lib/constants";

export default function TripsPage() {
  const searchParams = useSearchParams();

  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const filteredTrips = trips.filter(
    (trip) =>
      (!from || trip.from === from) &&
      (!to || trip.to === to)
  );

  return (
    <section className="min-h-screen bg-gray-50 px-6 py-24">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900">
            Available Trips
          </h2>

          <p className="text-gray-600 mt-1">
            {from && to ? `${from} → ${to}` : "Showing all available trips"}
          </p>
        </div>

        {/* Trips List */}
        <div className="flex flex-col gap-6">
          {filteredTrips.length > 0 ? (
            filteredTrips.map((trip) => (
              <div
                key={trip.id}
                className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition"
              >
                {/* Info */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {trip.company}
                  </h3>

                  <p className="text-gray-600 text-sm mt-1">
                    {trip.from} → {trip.to}
                  </p>

                  <p className="text-gray-500 text-sm">
                    Departure: {trip.time}
                  </p>
                </div>

                {/* Price */}
                <div className="text-center md:text-right">
                  <p className="text-xl font-bold text-blue-600">
                    ₦{trip.price.toLocaleString()}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {trip.seats} seats left
                  </p>
                </div>

                {/* Button */}
                <Link
                  href={`/booking/${trip.id}`}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg text-center hover:scale-105 transition"
                >
                  Book Now
                </Link>
              </div>
            ))
          ) : (
            <div className="text-center mt-16">
              <p className="text-gray-500 text-lg mb-4">
                No trips found for this route.
              </p>

              <Link
                href="/"
                className="text-blue-600 font-medium hover:underline"
              >
                Go back and search again
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}