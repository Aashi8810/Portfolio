import { OrbitalHero } from '@/components/OrbitalHero';
import { MobileHero } from '@/components/MobileHero';

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden">
      
      {/* Desktop Section: Hidden on small screens, shown on medium screens and up */}
      <div className="hidden md:block w-full h-full">
        <OrbitalHero />
      </div>

      {/* Mobile Section: Shown on small screens, hidden on medium screens and up */}
      <div className="block md:hidden w-full h-full">
        <MobileHero />
      </div>

    </main>
  );
}