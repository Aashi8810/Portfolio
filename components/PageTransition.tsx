'use client';

import React, { createContext, useContext, useRef, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { gsap } from '@/lib/gsap';

type TransitionType = 'hero-to-section' | 'section-to-hero' | 'section-to-section';

interface TransitionContextType {
  navigate: (url: string, type: TransitionType, event?: React.MouseEvent | MouseEvent) => void;
}

const TransitionContext = createContext<TransitionContextType | null>(null);

export const useTransition = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error('useTransition must be used within a PageTransitionProvider');
  }
  return context;
};

export const PageTransitionProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  
  // Curtain references
  const radialCurtainRef = useRef<HTMLDivElement>(null);
  const slideCurtainRef = useRef<HTMLDivElement>(null);
  const fadeCurtainRef = useRef<HTMLDivElement>(null);

  // Reusable ease extracted from design tokens
  const easeDefault = 'cubic-bezier(0.65, 0.05, 0, 1)';

  const navigate = (url: string, type: TransitionType, event?: React.MouseEvent | MouseEvent) => {
    if (typeof window !== 'undefined' && window.location.pathname === url) return;

    if (type === 'hero-to-section') {
      const clickX = event ? (event as MouseEvent).clientX : (typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
      const clickY = event ? (event as MouseEvent).clientY : (typeof window !== 'undefined' ? window.innerHeight / 2 : 0);
      
      const curtain = radialCurtainRef.current;
      if (!curtain) return;

      // Reset and prepare radial curtain
      gsap.set(curtain, { 
        clipPath: `circle(0% at ${clickX}px ${clickY}px)`,
        display: 'block' 
      });

      const tl = gsap.timeline();
      
      // Delay to allow the canvas "shockwave" to visually clear first
      tl.to(curtain, {
        clipPath: `circle(150% at ${clickX}px ${clickY}px)`,
        duration: 0.6,
        ease: easeDefault,
        delay: 0.1,
        onComplete: () => {
          router.push(url);
        }
      })
      // Reverse animation starts after new page mounts
      .to(curtain, {
        clipPath: `circle(0% at 50% 50%)`, // Reverses to center
        duration: 0.5,
        ease: 'power2.inOut',
        delay: 0.15, // 150ms allowance for route mount
        onComplete: () => {
          gsap.set(curtain, { display: 'none' });
        }
      });
    } 
    
    else if (type === 'section-to-hero') {
      const curtain = slideCurtainRef.current;
      if (!curtain) return;

      gsap.set(curtain, { yPercent: -100, display: 'block' });

      const tl = gsap.timeline();

      tl.to(curtain, {
        yPercent: 0,
        duration: 0.5,
        ease: easeDefault,
        onComplete: () => {
          router.push(url);
        }
      })
      .to(curtain, {
        yPercent: 100,
        duration: 0.5,
        ease: 'power2.inOut',
        delay: 0.1, 
        onComplete: () => {
          gsap.set(curtain, { display: 'none' });
        }
      });
    } 
    
    else if (type === 'section-to-section') {
      const curtain = fadeCurtainRef.current;
      if (!curtain) return;

      gsap.set(curtain, { opacity: 0, display: 'block' });

      const tl = gsap.timeline();

      tl.to(curtain, {
        opacity: 1,
        duration: 0.3,
        ease: 'power1.inOut',
        onComplete: () => {
          router.push(url);
        }
      })
      .to(curtain, {
        opacity: 0,
        duration: 0.3,
        ease: 'power1.inOut',
        delay: 0.1,
        onComplete: () => {
          gsap.set(curtain, { display: 'none' });
        }
      });
    }
  };

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      
      {/* Radial Curtain (Hero -> Section) */}
      <div 
        ref={radialCurtainRef}
        className="fixed inset-0 z-[999] hidden bg-[#101400]"
        style={{ clipPath: 'circle(0% at 50% 50%)' }}
      />

      {/* Vertical Slide Curtain (Section -> Hero) */}
      <div 
        ref={slideCurtainRef}
        className="fixed inset-0 z-[999] hidden bg-[#282C20]"
        style={{ transform: 'translateY(-100%)' }}
      />

      {/* Simple Fade Curtain (Section -> Section) */}
      <div 
        ref={fadeCurtainRef}
        className="fixed inset-0 z-[999] hidden bg-[#101400] opacity-0"
      />
    </TransitionContext.Provider>
  );
};