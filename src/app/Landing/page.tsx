import AboutUsSection from '@/src/Components/Landing/Aboutus'
import HeroSection from '@/src/Components/Landing/HeroSection';
import Search from '@/src/Components/Landing/Search';
import TestimonialsSection from '@/src/Components/Landing/Testimonial'
import FeaturesSection from '@/src/Components/Landing/WhyChooseUsSection';
import Footer from '@/src/Components/Layout/footer';
import Navbar from '@/src/Components/Layout/Navbar';
export default function Home() {
  return (
    <div className="min-h-screen bg-dark-500">
       <Navbar />
            <main className='pt-30'>
              <HeroSection />
              <Search />
              <FeaturesSection />
              <AboutUsSection/>
              <TestimonialsSection/>
            </main>
            <Footer/>
    </div>
  );
}
