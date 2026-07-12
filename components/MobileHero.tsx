'use client';

import React from 'react';
import { useTransition } from './PageTransition';

const MOBILE_LINKS = [
  { label: 'Projects', href: '/projects', subtitle: 'WHAT I BUILD' },
  { label: 'About', href: '/about', subtitle: 'WHO I AM' },
  { label: 'Skills', href: '/skills', subtitle: 'WHAT I USE' },
  { label: 'Education', href: '/education', subtitle: 'WHERE I LEARNED' },
  { label: 'Publications', href: '/publications', subtitle: 'WHAT I WROTE' },
  { label: 'Volunteering', href: '/volunteering', subtitle: 'WHERE I GIVE BACK' },
  { label: 'Contact', href: '/contact', subtitle: 'GET IN TOUCH' },
];

export const MobileHero = () => {
  const { navigate } = useTransition();

  const handleNavigate = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    navigate(href, 'hero-to-section', e);
  };

  return (
    <div className="w-full min-h-screen bg-[#282C20] px-[var(--gutter,2rem)] py-12 flex flex-col justify-between select-none md:hidden">
      {/* Top Branding Block */}
      <div className="pt-6">
        <h1 
          className="text-[var(--lime,#D2FF00)] uppercase text-4xl tracking-[0.10em] font-black"
          style={{ fontVariationSettings: '"wght" 900, "wdth" 93' }}
        >
          Aashi
        </h1>
        <p className="text-[#B0B5A0] text-xs tracking-[0.2em] uppercase font-semibold mt-1">
          AI / LLM ENGINEER
        </p>
      </div>

      {/* §10 Vertical Navigation Stack Layout */}
      <div className="flex flex-col gap-1 my-auto pt-10 pb-6">
        {MOBILE_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => handleNavigate(link.href, e)}
            className="group flex flex-col justify-center py-4 border-b border-[rgba(210,255,0,0.08)] min-h-[48px] active:bg-[rgba(210,255,0,0.04)] transition-colors duration-150"
          >
            <div className="flex items-center justify-between">
              <span 
                className="text-[var(--lime,#D2FF00)] uppercase text-xl font-bold tracking-wide group-active:text-white transition-colors"
                style={{ fontVariationSettings: '"wght" 700' }}
              >
                {link.label}
              </span>
              <span className="text-[#6B7060] text-sm transform group-active:translate-x-1 transition-transform">
                →
              </span>
            </div>
            <span className="text-[#B0B5A0] text-[0.65rem] tracking-[0.15em] uppercase mt-0.5">
              {link.subtitle}
            </span>
          </a>
        ))}
      </div>

      {/* Touch Interaction Hint */}
      <div className="text-[0.65rem] text-[#6B7060] tracking-[0.14em] uppercase pt-4">
        tap an option to explore
      </div>
    </div>
  );
};