"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const publicationsData = [
  {
    id: "01",
    title: "LATENCY OPTIMIZATION IN DISTRIBUTED MULTI-AGENT INFERENCE NETWORKS",
    venue: "International Conference on Machine Learning Systems (MLSys)",
    year: "2026",
    abstract: "This paper introduces a novel execution-fragmentation algorithm targeting multi-agent loops. By deploying deterministic context routers, we minimize cross-node memory overhead during concurrent token delivery windows.",
    pdfUrl: "#",
    doiUrl: "#",
    arxivUrl: "#",
  },
  {
    id: "02",
    title: "HYBRID VECTOR-SYMBOLIC ARCHITECTURES FOR REDUCING HALLUCINATION DYNAMICS",
    venue: "Journal of Artificial Intelligence Research (JAIR)",
    year: "2025",
    abstract: "We evaluate structural knowledge graph validation patterns overlaid on dense vector retrieval systems. Our framework enforces strict boundary conditions on unstructured context inputs, leading to quantifiable decreases in factual deviation metrics.",
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

    // Fade and lift entry for the publication items (§3)
    const items = listRef.current?.querySelectorAll(".publication-entry");
    if (items && items.length > 0) {
      gsap.fromTo(
        items,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75, // --dur-default
          ease: "cubic-bezier(0.65, 0.05, 0, 1)", // --ease-default
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
          background: #d2ff00; /* --lime */
          transition: width 0.3s cubic-bezier(0.65, 0.05, 0, 1);
        }
        .text-link:hover::after {
          width: 100%;
        }
      `}</style>

      {/* Main Container Wrapper Layout (§8) */}
      <div className="min-h-screen bg-[#282C20] text-white pt-24 px-[clamp(1.5rem,4vw,5rem)] pb-24 mx-auto max-w-[1200px]">
        
        {/* Page Header Block (§8) */}
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

        {/* Clean, Numbered List Block Structure (§8.4) */}
        <div ref={listRef} className="w-full flex flex-col max-w-4xl">
          {publicationsData.length === 0 ? (
            /* Empty State String Node (§8.4) */
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