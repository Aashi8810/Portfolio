"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function ContactPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Character Split Reveal for Page Header (§3 & §8)
    const chars = headerRef.current?.querySelectorAll(".split-char");
    if (chars && chars.length > 0) {
      gsap.fromTo(
        chars,
        { y: "110%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 0.9,
          stagger: 0.022,
          ease: "power3.out",
        }
      );
    }

    // Fade and lift entry for the central contact elements (§3)
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75, // --dur-default
          ease: "cubic-bezier(0.65, 0.05, 0, 1)", // --ease-default
          stagger: 0.12,
        }
      );
    }
  }, []);

  const renderSplitText = (text: string) => {
    return text.split("").map((char, index) => (
      <span
        key={index}
        className="split-char inline-block will-change-transform"
        style={{ display: char === " " ? "inline" : "inline-block" }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <>
      <style jsx global>{`
        * {
          scrollbar-width: none;
        }
        *::-webkit-scrollbar {
          display: none;
        }
        /* Custom Keyframe for availability status pulse micro-interaction (§8.7) */
        @keyframes badgePulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.4);
          }
        }
        .status-dot-pulse {
          animation: badgePulse 2s cubic-bezier(0.65, 0.05, 0, 1) infinite;
        }
      `}</style>

      {/* Main Page Wrapper Layout (§8) */}
      <div className="min-h-screen bg-[#282C20] text-white pt-24 px-[clamp(1.5rem,4vw,5rem)] pb-24 mx-auto max-w-[1200px]">
        
        {/* Page Header Block (§8) */}
        <header ref={headerRef} className="overflow-hidden mb-12">
          <p className="text-[0.7rem] tracking-[0.2em] uppercase text-[#B0B5A0] mb-2 font-semibold">
            {renderSplitText("/ CONTACT")}
          </p>
          <h1 className="text-[clamp(4rem,9vw,8.5rem)] font-black tracking-[-0.04em] leading-[0.88] uppercase select-none">
            {renderSplitText("GET IN ")}
            <strong className="font-normal font-serif text-[#C8F000] italic">
              {renderSplitText("TOUCH")}
            </strong>
          </h1>
          <div className="h-[1px] w-full bg-[#D2FF00]/20 mt-6 mb-16" />
        </header>

        {/* Centered, single column layout content block, max-width 600px (§8.7) */}
        <div 
          ref={contentRef} 
          className="mx-auto max-w-[600px] flex flex-col items-center justify-center text-center mt-8"
        >
          {/* Introductory Core Text Statement Line (§8.7) */}
          <p className="text-base text-[#B0B5A0] leading-[1.65] mb-12 text-pretty">
            Open to engineering roles, research collaborations, and interesting problems.
          </p>

          {/* Vertical Navigation / Platforms Resource Stack Link List (§8.7) */}
          <div className="w-full flex flex-col gap-1 items-stretch mb-16">
            
            {/* Email Resource Link */}
            <a
              href="mailto:aashi@example.com"
              className="group flex items-center justify-between py-4 border-b border-white/[0.07] text-white hover:text-[#D2FF00] transition-colors duration-200 text-lg font-semibold"
            >
              <div className="flex items-center gap-4">
                {/* Lucide Mail SVG Icon Asset Placeholder (§12) */}
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#D2FF00]">
                  <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                <span className="tracking-wide uppercase">EMAIL</span>
              </div>
              <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300 ease-out text-[#6B7060] group-hover:text-[#D2FF00]">
                →
              </span>
            </a>

            {/* LinkedIn Resource Link */}
            <a
              href="https://linkedin.com/in/aashi"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between py-4 border-b border-white/[0.07] text-white hover:text-[#D2FF00] transition-colors duration-200 text-lg font-semibold"
            >
              <div className="flex items-center gap-4">
                {/* Lucide LinkedIn SVG Icon Asset Placeholder (§12) */}
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#D2FF00]">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
                </svg>
                <span className="tracking-wide uppercase">LINKEDIN</span>
              </div>
              <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300 ease-out text-[#6B7060] group-hover:text-[#D2FF00]">
                →
              </span>
            </a>

            {/* GitHub Resource Link */}
            <a
              href="https://github.com/aashi"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between py-4 border-b border-white/[0.07] text-white hover:text-[#D2FF00] transition-colors duration-200 text-lg font-semibold"
            >
              <div className="flex items-center gap-4">
                {/* Lucide GitHub SVG Icon Asset Placeholder (§12) */}
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#D2FF00]">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>
                </svg>
                <span className="tracking-wide uppercase">GITHUB</span>
              </div>
              <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300 ease-out text-[#6B7060] group-hover:text-[#D2FF00]">
                →
              </span>
            </a>

          </div>

          {/* Static Operational Availability Badge Node (§8.7) */}
          <div className="inline-flex items-center gap-3 bg-white/[0.02] border border-white/[0.06] rounded-full px-5 py-2.5">
            <span className="status-dot-pulse w-2 h-2 rounded-full bg-[#D2FF00]" />
            <span className="text-[0.68rem] font-mono tracking-[0.12em] text-[#B0B5A0] font-semibold">
              AVAILABLE FOR OPPORTUNITIES
            </span>
          </div>

        </div>
      </div>
    </>
  );
}