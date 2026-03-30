import AboutUsSection from '@/Components/Landing/Aboutus'
import HeroSection from '@/Components/Landing/HeroSection';
import Search from '@/Components/Landing/Search';
import TestimonialsSection from '@/Components/Landing/Testimonial'
import FeaturesSection from '@/Components/Landing/WhyChooseUsSection';
import Footer from '@/Components/Layout/footer';
import Navbar from '@/Components/Layout/Navbar';
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
