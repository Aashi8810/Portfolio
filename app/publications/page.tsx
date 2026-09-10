"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const publicationsData = [
  {
    id: "01",
    title: "A dual-phase financial strategy for sustainable customer loyalty: Integrating fixed deposits and voucher systems in Sri Lankan supermarket retail",
    venue: "Economics, Management and Sustainability - Scientific Journal",
    year: "2025",
    abstract: "This study develops and evaluates an innovative dual-phase customer loyalty strategy for Sri Lankan supermarkets, integrating fixed deposit investments with voucher-based reward systems to enhance both customer engagement and sustainable business profitability during festive seasons. The research employs a mixed-methods approach, combining financial modelling using the EBITDA framework, customer surveys (n = 250) to analyse spending patterns, and a hypothetical case study with 1,000 participants to assess the strategy's viability during Christmas 2023. The dual-phase model generated projected returns of Rs. 19,135,035.44 from fixed deposits (a 6.3% gross profit margin) and a Rs. 1,113 markup profit per voucher participant, resulting in an overall EBITDA gross profit of Rs. 2,248,035.44 for 1,000 participants. The study contributes to retail management literature by proposing a novel integration of customer investment programs with loyalty systems, extending existing loyalty program theory to emerging market contexts and seasonal retail dynamics. The framework provides retail managers with a structured approach to capitalise on seasonal demand while building long-term customer relationships, particularly applicable to emerging markets where traditional loyalty programs may be insufficient.",
    pdfUrl: "#",
    doiUrl: "https://doi.org/10.14254/jems.2025.10-1.8",
    arxivUrl: "#",
  },
  {
    id: "02",
    title: "Toward Objective Digital Biomarkers of Bradykinesia A Technology Centric Review of Finger Tapping Assessment in Parkinson’s Disease",
    venue: "JCos 2026 Faculty of Computing, University Of Sri Jayewardenepura",
    year: "2026",
    abstract: "This review explores how modern sensing technologies and machine learning are transforming the assessment of bradykinesia in Parkinson's disease through objective finger-tapping analysis. The paper presents a technology-centric review of three major sensing approaches—wearable sensors, vision-based systems, and smartphone touchscreens—examining their sensing capabilities, signal processing techniques, feature engineering methods, and machine learning pipelines. It compares the strengths and limitations of each modality while discussing challenges such as standardization, device variability, clinical validation, and real-world deployment. The review also identifies emerging research directions, including multimodal sensing, explainable AI, edge computing, and longitudinal monitoring, highlighting their potential to improve digital biomarkers and support future clinical decision-making.",
    pdfUrl: "#",
    doiUrl: "#",
    arxivUrl: "#",
  },
];

export default function PublicationsPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    // Character Split Reveal for Page Header
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

    // Fade and lift entry for the publication items
    const items = listRef.current?.querySelectorAll(".publication-entry");
    if (items && items.length > 0) {
      gsap.fromTo(
        items,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: "cubic-bezier(0.65, 0.05, 0, 1)",
          stagger: 0.1,
        }
      );
    }
  }, []);

  const toggleAbstract = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

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
        .text-link {
          position: relative;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
        }
        .text-link::after {
          content: "";
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: #d2ff00;
          transition: width 0.3s cubic-bezier(0.65, 0.05, 0, 1);
        }
        .text-link:hover::after {
          width: 100%;
        }
      `}</style>

      {/* Main Container Wrapper Layout */}
      <div className="min-h-screen bg-[#282C20] text-white pt-24 px-[clamp(1.5rem,4vw,5rem)] pb-24 mx-auto max-w-[1200px]">
        
        {/* Page Header Block */}
        <header ref={headerRef} className="overflow-hidden mb-12">
          <p className="text-[0.7rem] tracking-[0.2em] uppercase text-[#B0B5A0] mb-2 font-semibold">
            {renderSplitText("/ PUBLICATIONS")}
          </p>
          <h1 className="text-[clamp(4rem,9vw,8.5rem)] font-black tracking-[-0.04em] leading-[0.88] uppercase select-none">
            {renderSplitText("WHAT I ")}
            <strong className="font-normal font-serif text-[#C8F000] italic">
              {renderSplitText("WROTE")}
            </strong>
          </h1>
          <div className="h-[1px] w-full bg-[#D2FF00]/20 mt-6 mb-16" />
        </header>

        {/* Clean, Numbered List Block Structure */}
        <div ref={listRef} className="w-full flex flex-col max-w-4xl">
          {publicationsData.length === 0 ? (
            <span className="text-[0.7rem] tracking-[0.2em] font-mono text-[#6B7060] uppercase select-none">
              IN PROGRESS — CHECK BACK SOON
            </span>
          ) : (
            publicationsData.map((paper) => (
              <div
                key={paper.id}
                className="publication-entry flex flex-col gap-4 py-8 border-b border-white/[0.06] first:pt-0"
              >
                {/* ID Tag Row Element */}
                <span className="text-[0.7rem] font-mono text-[#D2FF00]">
                  {paper.id}
                </span>

                {/* Primary Title Block */}
                <h3 className="text-xl font-bold tracking-tight text-white uppercase max-w-3xl">
                  {paper.title}
                </h3>

                {/* Academic Metadata Container Row */}
                <div className="flex flex-row justify-between items-baseline w-full text-sm">
                  <span className="text-[#B0B5A0] italic font-medium pr-4">
                    {paper.venue}
                  </span>
                  <span className="text-[0.7rem] font-mono text-[#6B7060]">
                    {paper.year}
                  </span>
                </div>

                {/* Collapsible Abstract Interactive Pipeline Section */}
                <div className="w-full">
                  <button
                    onClick={() => toggleAbstract(paper.id)}
                    className="text-[0.68rem] tracking-wider text-[#B0B5A0] uppercase font-semibold flex items-center gap-1.5 hover:text-[#D2FF00] transition-colors duration-200"
                  >
                    <span>{expandedId === paper.id ? "[-] HIDE ABSTRACT" : "[+] VIEW ABSTRACT"}</span>
                  </button>
                  
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      expandedId === paper.id ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-sm text-[#B0B5A0] leading-[1.65] text-pretty max-w-3xl bg-white/[0.01] border-l-2 border-[#D2FF00]/40 pl-4 py-1">
                        {paper.abstract}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Associated Document Asset Source Target Links Row */}
                <div className="flex gap-6 pt-2">
                  <a
                    href={paper.pdfUrl}
                    className="text-link text-xs font-semibold text-white hover:text-[#D2FF00] transition-colors duration-200"
                  >
                    → PDF
                  </a>
                  <a
                    href={paper.doiUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link text-xs font-semibold text-white hover:text-[#D2FF00] transition-colors duration-200"
                  >
                    → DOI
                  </a>
                  <a
                    href={paper.arxivUrl}
                    className="text-link text-xs font-semibold text-white hover:text-[#D2FF00] transition-colors duration-200"
                  >
                    → ARXIV
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}