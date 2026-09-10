'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Orbitron } from 'next/font/google';

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['900'],
  display: 'swap',
});

// Using the same theme colors from your Hero
const LIME = '#D2FF00';
const LIME_OFF = '#C8F000';
const GREY2 = '#D0D4C0';
const GREY1 = '#B0B5A0';
const OFF_WHITE = '#E8EDD8';

const navItems = [
  { label: 'Projects', href: '/projects', color: LIME, size: 16, angle: -51 },
  { label: 'About', href: '/about', color: OFF_WHITE, size: 14, angle: -34 },
  { label: 'Skills', href: '/skills', color: LIME_OFF, size: 14, angle: -17 },
  { label: 'Education', href: '/education', color: OFF_WHITE, size: 12, angle: 0 },
  { label: 'Publications', href: '/publications', color: GREY2, size: 12, angle: 17 },
  { label: 'Volunteering', href: '/volunteering', color: GREY1, size: 10, angle: 34 },
  { label: 'Contact', href: '/contact', color: LIME, size: 14, angle: 51 },
];

export const OrbitalNav = () => {
  const pathname = usePathname();

  // Geometric configuration to match your sketch
  const CX = -180;       // Center of the orbit (pushed off-screen to the left)
  const R = 320;         // Radius of the orbit curve
  const SUN_R = 220;     // Radius of the Home "Sun"

  // Do not render the nav on the hero/home page
  if (pathname === '/') return null;

  return (
    <nav className={`fixed left-0 top-0 h-screen w-0 z-40 select-none hidden lg:block ${orbitron.className}`}>
      
      {/* 1. The Home "Sun" (Peeking out from the left edge) */}
      <Link 
        href="/" 
        className="group absolute top-1/2 cursor-pointer transition-transform duration-500 hover:scale-[1.02]"
        style={{
          left: `${CX}px`,
          width: `${SUN_R * 2}px`,
          height: `${SUN_R * 2}px`,
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          background: `radial-gradient(circle at 85% 50%, ${LIME} 0%, #A2C800 40%, #2E3324 80%, #0D0F0A 100%)`,
          boxShadow: `0 0 40px rgba(210,255,0,0.15)`
        }}
        title="Return Home"
      >
        <span className="absolute right-[12%] top-1/2 -translate-y-1/2 text-[#151811] font-black uppercase tracking-[0.3em] text-[11px] -rotate-90 origin-center opacity-70 group-hover:opacity-100 transition-opacity">
          Home
        </span>
      </Link>

      {/* 2. The Orbit Path Line */}
      <div
        className="absolute top-1/2 border border-white/10 rounded-full pointer-events-none"
        style={{
          left: `${CX}px`,
          width: `${R * 2}px`,
          height: `${R * 2}px`,
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* 3. The Orbiting Sections (Nodes) */}
      <div className="absolute top-1/2" style={{ left: `${CX}px` }}>
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <div
              key={item.label}
              className="absolute top-0 left-0"
              style={{ transform: `rotate(${item.angle}deg)` }}
            >
              <div
                className="absolute"
                style={{
                  left: `${R}px`,
                  transform: `translate(-50%, -50%) rotate(${-item.angle}deg)`, // Rotates text back to horizontal
                }}
              >
                <Link href={item.href} className="relative flex items-center group cursor-pointer">
                  
                  {/* The Planet / Sphere */}
                  <div className="relative flex items-center justify-center">
                    {/* Active State Ring */}
                    {isActive && (
                      <div className="absolute inset-[-8px] border border-[#D2FF00] rounded-full border-dashed animate-[spin_4s_linear_infinite]" />
                    )}
                    
                    {/* Node Core */}
                    <div
                      className="rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.8)] transition-transform duration-300 group-hover:scale-125"
                      style={{
                        width: item.size,
                        height: item.size,
                        backgroundColor: isActive ? LIME : item.color,
                        boxShadow: isActive ? `0 0 15px ${LIME}` : 'none'
                      }}
                    />
                  </div>

                  {/* The Label */}
                  <span 
                    className={`absolute left-full ml-5 text-[10px] tracking-[0.2em] uppercase font-bold whitespace-nowrap transition-all duration-300 ${
                      isActive 
                        ? 'text-[#D2FF00] opacity-100' 
                        : 'text-white/40 group-hover:text-white/90 group-hover:translate-x-1'
                    }`}
                  >
                    {item.label}
                  </span>
                  
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      
    </nav>
  );
};