import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-[#073A48] to-[#38C5F4]  flex flex-col md:flex-row items-center justify-between  max-w-7xl mx-20 px-6 md:pl-10 md:pr-0 rounded-3xl scroll-mt-40 min-h-[450px] shadow-lg">
      <div className="flex flex-col text-center md:text-left">
        <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight">
          Book Your Next Trip in Seconds
        </h1>

        <p className="text-white/90 mt-3">
          Book reliable buses and cars across states in minutes.
          <br /> Safe, fast, and affordable.
        </p>

        <div className="flex items-center justify-center md:justify-start mt-5 gap-4">
          <a href=" /Signup"> <button className="px-6 h-12 bg-blue-600 text-white rounded-lg hover:scale-105 transition duration-300 shadow-lg">
            Search Trips
          </button></a>
          <a href=" /Signup">  <button className="px-6 h-12 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-lg hover:bg-white/20 transition">
            Book Now
          </button></a>
        </div>
      </div>

      <div className="w-full md:w-[600px] flex justify-center md:justify-end mt-6 md:mt-0">
        <Image
          src="/toyota2.png"
          alt="Toyota car"
          width={1000}
          height={500}
          className="w-full rounded-xl object-cover hover:scale-105 transition duration-500"
        />
      </div>
    </section>
  );
}