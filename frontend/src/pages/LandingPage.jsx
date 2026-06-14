import LandingNavbar from '../components/layout/Navbar';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import Statistics from '../components/landing/Statistics';
import Testimonials from '../components/landing/Testimonials';
import CTA from '../components/landing/CTA';
import Footer from '../components/layout/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <LandingNavbar />
      <Hero />
      <Features />
      <Statistics />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

export default LandingPage;
