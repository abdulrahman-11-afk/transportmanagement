import Image from "next/image";

export default function AboutUsSection() {
  return (
    <section id="about-us" className="py-24 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">

        <div className="w-full h lg:w-1/2">
          <Image
            src="/aboutus.jpg" 
            alt="About Us"
            width={600}
            height={400}
            className="rounded-3xl h-110 object-cover shadow-lg"
          />
        </div>

        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <div className="text-4xl sm:text-5xl font-bold text-gray-900">
              About <span className="text-blue-600">us</span>
          </div>
          <h2 className="text-gray-700 text-lg max-w-xl">
            Connecting People, One Trip at a Time
          </h2>

          <p className="text-gray-700 text-lg leading-relaxed">
            At Transport, our mission is to make travel fast, safe, and affordable.
            We connect passengers with reliable buses and cars across states,
            ensuring a seamless booking experience for everyone.
          </p>

          <p className="text-gray-700 text-lg leading-relaxed">
            Founded with the goal of transforming public transportation, we focus
            on customer satisfaction, timely arrivals, and top-notch service.
            With verified drivers and premium vehicles, your journey is in safe hands.
          </p>

          <div className="flex text-center  gap-6 mt-4">
            <div className="flex flex-col">
              <span className="text-blue-600 font-bold text-2xl">99.2%</span>
              <span className="text-gray-600 text-sm">On-time Arrival</span>
            </div>
            <div className="flex flex-col">
              <span className="text-blue-600 font-bold text-2xl">24/7</span>
              <span className="text-gray-600 text-sm">Support</span>
            </div>
            <div className="flex flex-col">
              <span className="text-blue-600 font-bold text-2xl">₦0</span>
              <span className="text-gray-600 text-sm">Cancellation Fee</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}