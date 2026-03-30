import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Adebayo O.",
    role: "Entrepreneur",
    message:
      "Booking with Transport was so easy! My trip from Lagos to Ibadan was smooth and on time. Highly recommend!",
    rating: 5,
  },
  {
    name: "Chiamaka E.",
    role: "Student",
    message:
      "I love how fast and safe the booking process is. The drivers are verified and the vehicles are very clean.",
    rating: 5,
  },
  {
    name: "Tunde K.",
    role: "Business Traveler",
    message:
      "Affordable pricing with great service. I’ll never use another booking platform again!",
    rating: 4,
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          What Our Users Say
        </h2>
        <p className="text-gray-700 text-lg max-w-xl mx-auto leading-relaxed">
          Real feedback from passengers who trust Transport for their journeys.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map(({ name, role, message, rating }) => (
          <div
            key={name}
            className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200 flex flex-col justify-between transition hover:shadow-lg"
          >
            <p className="text-gray-700 text-sm leading-relaxed mb-4">"{message}"</p>
            
            <div className="mt-auto">
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: rating }).map((_, i) => (
                  <Star key={i} size={18} className="text-yellow-400" />
                ))}
              </div>
              <span className="font-semibold text-gray-900">{name}</span>
              <span className="text-gray-500 text-sm ml-1"> - {role}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}