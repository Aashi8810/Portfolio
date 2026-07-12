import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

// Register plugins globally
gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

export const initSmoothScrolling = () => {
  if (lenis) return lenis;

  lenis = new Lenis({
    smoothWheel: true,
  });

  // Sync Lenis scroll with GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);

  // Integrate Lenis RAF with GSAP ticker
  gsap.ticker.add((time) => {
    lenis?.raf(time * 1000);
  });

  // Prevent GSAP from lag-smoothing conflicting with Lenis
  gsap.ticker.lagSmoothing(0);

  return lenis;
};

export { gsap, ScrollTrigger };