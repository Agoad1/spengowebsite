import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import CursorGlow from './components/CursorGlow';
import ValueDemonstrator from './components/ValueDemonstrator';
import Contact from './components/Contact';
import MobileCTA from './components/MobileCTA';
import BackgroundBlobs from './components/BackgroundBlobs';
import BackgroundEngine from './components/BackgroundEngine';
import BeforeAfter from './components/BeforeAfter';
import RiskReversal from './components/RiskReversal';

export default function App() {
  return (
    <div className="relative z-10 min-h-screen">
      <BackgroundBlobs />
      <BackgroundEngine />
      <CursorGlow />
      <MobileCTA />
      <Navbar />
      <Hero />
      <Pricing />
      <BeforeAfter />
      <ValueDemonstrator />
      <Contact />
      <RiskReversal />
      <Footer />
    </div>
  );
}
