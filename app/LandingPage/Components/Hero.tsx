import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-[#073A48] to-[#38C5F4] mb-10 flex items-center justify-between mx-20 pl-10 pr-0 rounded-4xl scroll-mt-40 h-85">
      <div className="flex flex-col ">
        <h1 className="text-white text-3xl font-bold">
          Book Your Next Trip in Seconds
        </h1>
        <p className="text-white/90 mt-2">
          Book reliable buses and cars across states in minutes.<br /> Safe, fast, and affordable.
        </p>
        <div className="flex items-center mt-4 gap-4">
          <button className="w-30 h-12 cursor-pointer bg-[#1E3A8A] text-white rounded-md hover:scale-105 duration-400 transition ">Search Trips</button>
          <button className="w-30 h-12 cursor-pointer bg-white/10 backdrop-blur-md border rounded-md border-white/20 text-white">Book Now</button>
        </div>
      </div>
      <div className="w-[500px] flex justify-end ">
        <Image
          src="/toyota2.png"
          alt="Toyata"
          width={1000}
          height={400}
          className="w-full rounded-xl object-cover"
        />
      </div>
    </section>
  );
}