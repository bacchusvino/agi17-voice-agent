import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ExplainerVideo from './components/ExplainerVideo';
import Benefits from './components/Benefits';
import SocialProof from './components/SocialProof';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <ExplainerVideo />
      <Benefits />
      <SocialProof />
      <Features />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}

export default App;