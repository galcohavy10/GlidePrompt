import React, { useState } from 'react';
import Analytics from './components/Analytics';
import Cards from './components/Cards';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Newsletter from './components/Newsletter';
import Demo from './components/Demo/Demo'; 
import Roadmap from './components/Roadmap';
import FAQ from './components/FAQ';
import About from './components/About';
import Contact from './components/Contact';
import PrivacyPolicy from './components/Privacy';
import TOS from './components/TOS';
import SocialProof from './components/SocialProof';


function App() {
  const [currentPage, setCurrentPage] = useState('home'); //so navbar and footer can control navigation

  return (
    <div>
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
  {
    currentPage === 'home' && (
      <>
        <Hero />
        <Demo />
        <Analytics />
        <Newsletter />
        <Cards />
        <SocialProof />
      </>
    )
  }
  {
    currentPage === 'roadmap' && (
      <>
        <Roadmap />
        <Newsletter />
      </>
    )
  }
  {
    currentPage === 'faq' && (
      <>
        <FAQ />
        <Newsletter />
      </>
    )
  }
  {
    currentPage === 'about' && (
      <>
        <About />
        <Newsletter />
      </>
    )
  }
  {
    currentPage === 'contact' && (
      <>
        <Contact />
        <Newsletter />
      </>
    )
  }
  {
    currentPage === 'privacyPolicy' && (
      <>
        <PrivacyPolicy />
      </>
    )
  }
  {
    currentPage === 'tos' && (
      <>
        <TOS />
      </>
    )
  }

      <Footer currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    </div>
  );
}

export default App;
