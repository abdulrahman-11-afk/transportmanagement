import { FaClock, FaBus, FaShieldAlt, FaMoneyBillWave } from "react-icons/fa";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <FaClock className="text-blue-500 text-4xl" />,
      title: "Fast Booking",
      desc: "Book trips in just a few clicks."
    },
    {
      icon: <FaBus className="text-blue-500 text-4xl" />,
      title: "Reliable Vehicles",
      desc: "We partner with trusted transport providers."
    },
    {
      icon: <FaShieldAlt className="text-blue-500 text-4xl" />,
      title: "Safe Travel",
      desc: "Safety is our top priority."
    },
    {
      icon: <FaMoneyBillWave className="text-blue-500 text-4xl" />,
      title: "Affordable Prices",
      desc: "Travel without breaking the bank."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">Why Choose Us</h2>
        <p className="text-gray-500 mt-2">Safe, fast, and reliable travel across states</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {features.map((feature, i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-lg text-center hover:scale-105 transition-transform">
            <div className="mb-4">{feature.icon}</div>
            <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
            <p className="text-gray-500">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}