'use client';

import React from 'react';
import { useLocation } from 'react-router-dom';
import { initSmoothScrolling } from '@/lib/gsap';

export const Footer = () => {
  const location = useLocation();
  const pathname = location.pathname;

  // Footer is not visible on the hero[cite: 1]
  if (pathname === '/') return null;

  const handleScrollToTop = () => {
    const lenis = initSmoothScrolling();
    lenis.scrollTo(0, { immediate: false });
  };

  return (
    <footer className="bg-[var(--black)] px-[var(--gutter)] py-12 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between">
      {/* Left: Copyright[cite: 1] */}
      <span className="text-[var(--grey-ot)] text-[0.68rem] tracking-widest uppercase">
        © 2025 AASHI
      </span>

      {/* Right: Back to top[cite: 1] */}
      <button
        onClick={handleScrollToTop}
        className="text-[var(--lime)] text-[1.2rem] hover:-translate-y-1 transition-transform duration-300 focus:outline-none"
        aria-label="Back to top"
      >
        ↑
      </button>
    </footer>
  );
};