"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Dummy projects data structure conforming to §12 and §8.1
const dummyProjects = [
  {
    id: "01",
    title: "DISTRIBUTED LLM ORCHESTRATION ENGINE",
    tagline: "High-throughput multi-agent routing layer for low-latency inference orchestration.",
    tags: ["LLMOps", "Python", "Docker", "gRPC", "Redis"],
    description: "Engineered a custom routing fabric that dynamically fragments and schedules token generation workloads across heterogeneous clusters. Optimized operational boundaries to mitigate memory pressure during peak concurrency states. Realized significant latency reductions across complex agent chains.",
    githubUrl: "https://github.com/aashi/llm-orchestration",
    liveUrl: "https://demo.aashi.ai/orchestration",
    featured: true,
  },
  {
    id: "02",
    title: "RETRIEVAL-AUGMENTED GRAPH DATABASE SEARCH",
    tagline: "Context-aware knowledge graph synthesis engine utilizing vector-symbolic architectures.",
    tags: ["TypeScript", "Neo4j", "Vector DB", "FastAPI"],
    description: "Developed an interface combining dense vector retrieval with structured graph data structures to minimize hallucination factors in automated reasoning systems. Implemented deterministic verification loops on top of unstructured document parsing pipelines.",
    githubUrl: "https://github.com/aashi/rag-graph-search",
    liveUrl: "https://demo.aashi.ai/rag-graph",
    featured: false,
  },
  {
    id: "03",
    title: "QUANTIZED EDGE MODEL DEPLOYMENT FABRIC",
    tagline: "Automated quantization and compilation pipeline targeting constrained compute environments.",
    tags: ["C++", "ONNX Runtime", "CUDA", "Shell"],
    description: "Designed a lightweight compilation sequence optimizing weights down to sub-4-bit precision targets with minimal metric degradation. Created custom hardware abstraction kernels to accelerate localized execution matrix modifications.",
    githubUrl: "https://github.com/aashi/edge-quant-fabric",
    liveUrl: "https://demo.aashi.ai/edge-quant",
    featured: false,
  },
];

export default function ProjectsPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Character Split Reveal (H1 / Heading Elements) using native React splits
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

    // 2. Scroll-Triggered Reveal for Cards (§3 & §8.1)
    const cards = cardsContainerRef.current?.querySelectorAll(".project-card");
    if (cards && cards.length > 0) {
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75, // --dur-default
            ease: "cubic-bezier(0.65, 0.05, 0, 1)", // --ease-default
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
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

  // Helper function to turn strings into arrays for character animation split loops
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
      {/* Structural Injectable Styles for Signature Micro-interactions (§11 & §8.1) */}
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
        .project-card .hover-border {
          clip-path: inset(0 0 100% 0);
          transition: clip-path 0.4s cubic-bezier(0.65, 0.05, 0, 1);
        }
        .project-card:hover .hover-border {
          clip-path: inset(0 0 0% 0);
        }
      `}</style>

      {/* Main Page Wrapper (§8) */}
      <div className="min-height-screen bg-[#282C20] text-white pt-24 px-[clamp(1.5rem,4vw,5rem)] pb-24 mx-auto max-w-[1200px]">
        
        {/* Page Header Block (§8) */}
        <header ref={headerRef} className="overflow-hidden mb-12">
          <p className="text-[0.7rem] tracking-[0.2em] uppercase text-[#B0B5A0] mb-2 font-semibold">
            {renderSplitText("/ PROJECTS")}
          </p>
          <h1 className="text-[clamp(4rem,9vw,8.5rem)] font-black tracking-[-0.04em] leading-[0.88] uppercase select-none">
            {renderSplitText("WHAT I ")}
            <strong className="font-normal font-serif text-[#C8F000] italic">
              {renderSplitText("BUILD")}
            </strong>
          </h1>
          {/* Rule line */}
          <div className="h-[1px] w-full bg-[#D2FF00]/20 mt-6 mb-12" />
        </header>

        {/* Projects Content Stack (§8.1) */}
        <section ref={cardsContainerRef} className="flex flex-col gap-8 w-full">
          {dummyProjects.map((project) => (
            <div
              key={project.id}
              className="project-card relative group w-full bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.05] p-8 md:p-12 transition-colors duration-300"
            >
              {/* Left animated highlight border line (§8.1) */}
              <div className="hover-border absolute left-0 top-0 bottom-0 w-[4px] bg-[#D2FF00]" />

              <div className="flex flex-col gap-6">
                {/* Meta Row: Featured Eyebrow + Project ID */}
                <div className="flex items-center justify-between w-full">
                  {project.featured ? (
                    <span className="text-[0.65rem] font-mono tracking-[0.12em] text-[#D2FF00] font-bold">
                      FEATURED
                    </span>
                  ) : (
                    <div />
                  )}
                  <span className="text-[0.7rem] font-mono text-[#D2FF00]">
                    {project.id}
                  </span>
                </div>

                {/* Title and Tagline Block */}
                <div>
                  <h3 className="text-2xl font-bold tracking-tight text-white mb-2 uppercase">
                    {project.title}
                  </h3>
                  <p className="text-base text-[#B0B5A0]">
                    {project.tagline}
                  </p>
                </div>

                {/* Tag Pills Container */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-[#D2FF00]/[0.08] border border-[#D2FF00]/[0.2] text-[#D2FF00] text-[0.65rem] tracking-wider px-3 py-1 font-mono uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Internal Divider */}
                <div className="h-[1px] w-full bg-white/[0.07]" />

                {/* Detailed Narrative */}
                <p className="text-sm text-white/70 leading-[1.65] text-pretty max-w-4xl">
                  {project.description}
                </p>

                {/* Resource Navigation Row */}
                <div className="flex gap-6 pt-2">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link text-sm font-semibold text-white hover:text-[#D2FF00] transition-colors duration-200"
                  >
                    → GITHUB
                  </a>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link text-sm font-semibold text-white hover:text-[#D2FF00] transition-colors duration-200"
                  >
                    → LIVE DEMO
                  </a>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}