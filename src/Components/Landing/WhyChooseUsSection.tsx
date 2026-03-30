import { Zap, ShieldCheck, Star, BadgeDollarSign } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Fast Booking",
    description:
      "Book your seat in under 60 seconds. No queues, no paperwork — just pick, click, and go.",
    accent: "from-blue-500/20 to-blue-500/5",
    iconColor: "text-blue-600",
    borderColor: "hover:border-blue-300",
  },
  {
    icon: ShieldCheck,
    title: "Safe Travel",
    description:
      "All drivers are background-checked and certified. Real-time GPS tracking on every trip.",
    accent: "from-green-400/20 to-green-400/5",
    iconColor: "text-green-500",
    borderColor: "hover:border-green-300",
  },
  {
    icon: Star,
    title: "Reliable Vehicles",
    description:
      "Premium fleet maintained to the highest standards — from economy coaches to luxury sedans.",
    accent: "from-purple-400/20 to-purple-400/5",
    iconColor: "text-purple-500",
    borderColor: "hover:border-purple-300",
  },
  {
    icon: BadgeDollarSign,
    title: "Affordable Prices",
    description:
      "Transparent pricing with no hidden fees. Price-match guarantee — we’ll beat any competitor.",
    accent: "from-orange-400/20 to-orange-400/5",
    iconColor: "text-orange-500",
    borderColor: "hover:border-orange-300",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-4 py-1.5 mb-5 border border-gray-200">
            <span className="text-blue-600 text-sm font-semibold">
              Why Choose Us
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Travel Built Around <span className="text-blue-600">You</span>
          </h2>

          <p className="text-gray-700 text-lg max-w-xl mx-auto leading-relaxed">
            Every feature designed to make your journey smoother, safer, and more
            enjoyable than ever before.
          </p>
        </div>

        <div className="grid grid-cols-1 mx-10 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map(
            ({ icon: Icon, title, description, accent, iconColor, borderColor }) => (
              <div
                key={title}
                className={`relative bg-white rounded-3xl p-7 border border-gray-200 ${borderColor} transition-all duration-300 group overflow-hidden hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-0 group-hover:opacity-10 transition duration-500 rounded-3xl`}
                />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mb-5 border border-gray-200 group-hover:scale-110 transition duration-300">
                    <Icon size={22} className={iconColor} />
                  </div>

                  <h3 className="font-bold text-xl text-gray-900 mb-3">{title}</h3>

                  <p className="text-gray-700 text-sm leading-relaxed">{description}</p>
                </div>
              </div>
            )
          )}
        </div>


        <div className="mt-16 bg-white rounded-3xl p-8 mx-20 grid grid-cols-2 md:grid-cols-4 gap-2 border border-gray-200 shadow-sm">
          {[
            { value: "99.2%", label: "On-time Arrival Rate", sub: "Across all routes" },
            { value: "24/7", label: "Customer Support", sub: "Always available" },
            { value: "<2 min", label: "Booking Time", sub: "Average completion" },
            { value: "₦0", label: "Cancellation Fee", sub: "Up to 24hrs before" },
          ].map(({ value, label, sub }) => (
            <div key={label} className="text-center">
              <div className="font-bold text-2xl text-blue-600 mb-1">{value}</div>
              <div className="text-gray-900 font-semibold text-sm mb-1">{label}</div>
              <div className="text-gray-500 text-xs">{sub}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}