"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function AboutPage() {
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

    // Fade and lift animation sequence for content structures (§3)
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75, // --dur-default
          ease: "cubic-bezier(0.65, 0.05, 0, 1)", // --ease-default
          stagger: 0.15,
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
      `}</style>

      {/* Main Container Wrapper (§8) */}
      <div className="min-h-screen bg-[#282C20] text-white pt-24 px-[clamp(1.5rem,4vw,5rem)] pb-24 mx-auto max-w-[1200px]">
        
        {/* Page Header Block (§8) */}
        <header ref={headerRef} className="overflow-hidden mb-12">
          <p className="text-[0.7rem] tracking-[0.2em] uppercase text-[#B0B5A0] mb-2 font-semibold">
            {renderSplitText("/ ABOUT")}
          </p>
          <h1 className="text-[clamp(4rem,9vw,8.5rem)] font-black tracking-[-0.04em] leading-[0.88] uppercase select-none">
            {renderSplitText("WHO I ")}
            <strong className="font-normal font-serif text-[#C8F000] italic">
              {renderSplitText("AM")}
            </strong>
          </h1>
          <div className="h-[1px] w-full bg-[#D2FF00]/20 mt-6 mb-12" />
        </header>

        {/* Structural Container Layer */}
        <div ref={contentRef} className="flex flex-col gap-16 w-full">
          
          {/* Two-Column Matrix Split Layout (§8.6) */}
          <div className="grid grid-cols-1 md:grid-cols-10 gap-12 items-start w-full">
            
            {/* Left Column Text Narrative Block (60% equivalent) */}
            <div className="md:col-span-6 flex flex-col gap-8">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight uppercase text-white">
                BUILDING AT THE EDGE OF{" "}
                <strong className="font-normal font-serif text-[#C8F000] italic">
                  MACHINE LEARNING
                </strong>
              </h2>
              
              <div className="flex flex-col gap-6 text-base text-white/72 leading-[1.65] text-pretty max-w-xl">
                <p>
                  I architect robust, scalable infrastructure layer systems designed to handle high-concurrency LLM routing, distributed intelligence frameworks, and complex edge compute optimization pipelines.
                </p>
                <p>
                  My work isolates and eliminates operational friction surfaces within deep neural context delivery networks, bridging theoretical optimization strategies directly into predictable production execution paradigms.
                </p>
              </div>
            </div>

            {/* Right Column Metrics Grid Block (40% equivalent) */}
            <div className="md:col-span-4 grid grid-cols-2 gap-x-8 gap-y-12 border-t md:border-t-0 md:border-l border-white/[0.08] pt-12 md:pt-0 md:pl-12">
              <div className="flex flex-col gap-1">
                <span className="text-[clamp(2.5rem,4vw,4rem)] font-black leading-none text-[#D2FF00]">
                  3+
                </span>
                <span className="text-[0.7rem] tracking-wider text-[#B0B5A0] uppercase font-semibold">
                  YEARS BUILDING
                </span>
              </div>
              
              <div className="flex flex-col gap-1">
                <span className="text-[clamp(2.5rem,4vw,4rem)] font-black leading-none text-[#D2FF00]">
                  7
                </span>
                <span className="text-[0.7rem] tracking-wider text-[#B0B5A0] uppercase font-semibold">
                  PROJECTS SHIPPED
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[clamp(2.5rem,4vw,4rem)] font-black leading-none text-[#D2FF00]">
                  2
                </span>
                <span className="text-[0.7rem] tracking-wider text-[#B0B5A0] uppercase font-semibold">
                  PUBLICATIONS
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[clamp(2.5rem,4vw,4rem)] font-black leading-none text-[#D2FF00]">
                  ∞
                </span>
                <span className="text-[0.7rem] tracking-wider text-[#B0B5A0] uppercase font-semibold">
                  THINGS TO LEARN
                </span>
              </div>
            </div>

          </div>

          {/* Current Execution State Ribbon Bar (§8.6) */}
          <div className="bg-[#D2FF00]/[0.05] border border-[#D2FF00]/[0.15] rounded-[6px] p-6 md:p-8 w-full mt-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-4">
              
              <div className="flex flex-col gap-1">
                <span className="text-[0.65rem] tracking-[0.15em] text-[#B0B5A0] uppercase font-medium">
                  BUILDING
                </span>
                <span className="text-[0.85rem] font-semibold text-white uppercase">
                  [DISTRIBUTED_ORCHESTRATION_ENGINE]
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[0.65rem] tracking-[0.15em] text-[#B0B5A0] uppercase font-medium">
                  LEARNING
                </span>
                <span className="text-[0.85rem] font-semibold text-white uppercase">
                  [SUB_4BIT_QUANTIZATION_KERNELS]
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[0.65rem] tracking-[0.15em] text-[#B0B5A0] uppercase font-medium">
                  BASED IN
                </span>
                <span className="text-[0.85rem] font-semibold text-white uppercase">
                  [COLOMBO_LK]
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </>
  );
}