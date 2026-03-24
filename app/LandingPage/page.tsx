import React from 'react'
import Navbar from './Components/Navbar'
import HeroSection from './Components/HeroSection'
import Search from './Components/Search'
import WhyChooseUs from './Components/WhyChooseUsSection'

export default function page() {
  return (
    <div >
        <Navbar/>
      <main className='py-42' >
          <HeroSection/>
        <Search/>
        <WhyChooseUs/>
      </main>
    </div>
  )
}
