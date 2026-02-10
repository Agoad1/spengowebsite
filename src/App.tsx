import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Services from './components/Services';
import Process from './components/Process';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import CursorGlow from './components/CursorGlow';
import ValueDemonstrator from './components/ValueDemonstrator';
import Contact from './components/Contact';
import MobileCTA from './components/MobileCTA';

export default function App() {
  return (
    <div className="relative z-10 min-h-screen">
      <CursorGlow />
      <MobileCTA />
      <Navbar />
      <Hero />
      <Problem />
      <ValueDemonstrator />
      <Services />
      <Process />
      <Pricing />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}
