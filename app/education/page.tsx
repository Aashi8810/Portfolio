"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const educationData = [
  {
    yearRange: "2022 — 2026",
    institution: "ADVANCED TECHNOLOGICAL INSTITUTE",
    degree: "B.Sc. in Computer Science / Artificial Intelligence Track",
    details: "Focused on deep learning sequence models and high-performance computing frameworks. Graduated with top-tier honors.",
  },
  {
    yearRange: "2020 — 2022",
    institution: "GLOBAL SYSTEMS INFRASTRUCTURE ACADEMY",
    degree: "Associate Degree in Systems Engineering & Networking",
    details: "Specialized in distributed networking protocols, Linux systems administration, and automated virtualization pipelines.",
  },
];

export default function EducationPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

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

    // ScrollTriggered Sequential Node Animation (§8.3)
    const nodes = timelineRef.current?.querySelectorAll(".timeline-node");
    if (nodes && nodes.length > 0) {
      nodes.forEach((node) => {
        gsap.fromTo(
          node,
          { x: -20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.75, // --dur-default
            ease: "cubic-bezier(0.65, 0.05, 0, 1)", // --ease-default
            scrollTrigger: {
              trigger: node,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
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
        * { scrollbar-width: none; }
        *::-webkit-scrollbar { display: none; }
      `}</style>

      <div className="min-h-screen bg-[#282C20] text-white pt-24 px-[clamp(1.5rem,4vw,5rem)] pb-24 mx-auto max-w-[1200px]">
        {/* Page Header Block */}
        <header ref={headerRef} className="overflow-hidden mb-12">
          <p className="text-[0.7rem] tracking-[0.2em] uppercase text-[#B0B5A0] mb-2 font-semibold">
            {renderSplitText("/ EDUCATION")}
          </p>
          <h1 className="text-[clamp(4rem,9vw,8.5rem)] font-black tracking-[-0.04em] leading-[0.88] uppercase select-none">
            {renderSplitText("WHERE I ")}
            <strong className="font-normal font-serif text-[#C8F000] italic">
              {renderSplitText("LEARNED")}
            </strong>
          </h1>
          <div className="h-[1px] w-full bg-[#D2FF00]/20 mt-6 mb-16" />
        </header>

        {/* Vertical Timeline Structure (§8.3) */}
        <div ref={timelineRef} className="relative pl-8 max-w-3xl ml-2">
          {/* Continuous left baseline border */}
          <div className="absolute left-0 top-2 bottom-2 w-[1px] bg-[#D2FF00]/15" />

          <div className="flex flex-col gap-12">
            {educationData.map((item, index) => (
              <div key={index} className="timeline-node relative w-full flex flex-col gap-2">
                {/* Fixed position absolute lime dot node pointer */}
                <div className="absolute left-[-36px] top-[5px] w-2 h-2 rounded-full bg-[#D2FF00]" />
                
                <span className="text-[0.68rem] font-mono tracking-wider text-[#6B7060]">
                  {item.yearRange}
                </span>
                <h3 className="text-xl font-bold tracking-tight text-white uppercase">
                  {item.institution}
                </h3>
                <p className="text-[0.85rem] font-medium text-[#B0B5A0]">
                  {item.degree}
                </p>
                {item.details && (
                  <p className="text-sm text-white/70 leading-[1.65] text-pretty max-w-xl mt-1">
                    {item.details}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}