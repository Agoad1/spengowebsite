import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Process from './components/Process';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import CursorGlow from './components/CursorGlow';
import ValueDemonstrator from './components/ValueDemonstrator';
import Contact from './components/Contact';
import MobileCTA from './components/MobileCTA';
import BackgroundBlobs from './components/BackgroundBlobs';
import BackgroundEngine from './components/BackgroundEngine';

export default function App() {
  return (
    <div className="relative z-10 min-h-screen">
      <BackgroundBlobs />
      <BackgroundEngine />
      <CursorGlow />
      <MobileCTA />
      <Navbar />
      <Hero />
      <Process />
      <Pricing />
      <ValueDemonstrator />
      <Contact />
      <Footer />
    </div>
  );
}
