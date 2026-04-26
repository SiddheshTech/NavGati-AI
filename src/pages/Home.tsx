import Hero from '../components/Hero';
import TrustLogos from '../components/TrustLogos';
import HomeContent from '../components/HomeContent';

export default function Home() {
  return (
    <div className="relative z-10">
      <Hero />
      <TrustLogos />
      <HomeContent />
    </div>
  );
}
