'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useTransition } from './PageTransition';

const NAV_LINKS = [
  { label: 'Projects', href: '/projects' },
  { label: 'Skills', href: '/skills' },
  { label: 'Education', href: '/education' },
  { label: 'Publications', href: '/publications' },
  { label: 'Volunteering', href: '/volunteering' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const Nav = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const { navigate } = useTransition();
  const navRef = useRef<HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Nav is not visible on the hero
  const isHero = pathname === '/';

  useEffect(() => {
    if (isHero) return;

    // Scroll-driven border opacity change[cite: 1]
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          if (!navRef.current) return;
          if (self.direction === 1) {
            gsap.to(navRef.current, { borderBottomColor: 'rgba(210,255,0,0.15)', duration: 0.3 });
          } else {
            gsap.to(navRef.current, { borderBottomColor: 'rgba(210,255,0,0.08)', duration: 0.3 });
          }
        },
      });
    });

    return () => ctx.revert();
  }, [isHero]);

  const handleNavigate = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (href === '/') {
      navigate(href, 'section-to-hero');
    } else {
      navigate(href, 'section-to-section');
    }
  };

  if (isHero) return null;

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 h-[5rem] z-[100] bg-[rgba(40,44,32,0.85)] backdrop-blur-[12px] border-b border-[rgba(210,255,0,0.08)] px-[var(--gutter)] flex items-center justify-between"
      >
        {/* Left: Wordmark[cite: 1] */}
        <a
          href="/"
          onClick={(e) => handleNavigate('/', e)}
          className="text-[var(--lime)] font-black text-xl uppercase tracking-wider"
          style={{ fontVariationSettings: '"wght" 900' }}
        >
          AASHI
        </a>

        {/* Right: Desktop Links[cite: 1] */}
        <div className="hidden md:flex gap-6 items-center">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavigate(link.href, e)}
                className={`text-[0.7rem] uppercase tracking-[0.1em] transition-colors duration-200 ${
                  isActive ? 'text-[var(--lime)]' : 'text-[var(--grey-1)] hover:text-[var(--white)]'
                }`}
                style={{
                  textDecoration: isActive ? 'underline' : 'none',
                  textDecorationColor: isActive ? 'var(--lime)' : 'transparent',
                  textUnderlineOffset: '4px',
                }}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Mobile Nav Toggle[cite: 1] */}
        <button
          className="md:hidden text-[var(--lime)] text-2xl focus:outline-none"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          ☰
        </button>
      </nav>

      {/* Mobile Drawer[cite: 1] */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[200] flex justify-end">
          {/* Backdrop[cite: 1] */}
          <div
            className="absolute inset-0 bg-[rgba(16,20,0,0.9)]"
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Drawer[cite: 1] */}
          <div className="relative w-64 bg-[var(--dark-green)] h-full border-l border-[rgba(255,255,255,0.07)] p-8 flex flex-col justify-center">
            <button
              className="absolute top-6 right-[var(--gutter)] text-[var(--grey-1)] text-2xl"
              onClick={() => setMobileMenuOpen(false)}
            >
              ×
            </button>
            <div className="flex flex-col gap-0">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavigate(link.href, e)}
                    className="flex items-center justify-between py-4 border-b border-[rgba(255,255,255,0.07)] min-h-[48px]"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isActive ? 'bg-[var(--lime)]' : 'bg-transparent border border-[var(--grey-1)]'
                        }`}
                      />
                      <span
                        className={`text-[0.8rem] tracking-[0.14em] uppercase ${
                          isActive ? 'text-[var(--lime)]' : 'text-[var(--white)]'
                        }`}
                      >
                        {link.label}
                      </span>
                    </div>
                    <span className="text-[var(--grey-ot)]">→</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};