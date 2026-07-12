"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    category: "LLM & AI",
    skills: [
      { name: "Transformers & Attention Mechanisms", value: "92%" },
      { name: "Fine-Tuning (LoRA, QLoRA)", value: "88%" },
      { name: "Retrieval-Augmented Generation (RAG)", value: "95%" },
      { name: "Prompt Engineering & Evaluation Fabrics", value: "90%" },
    ],
  },
  {
    category: "Backend & APIs",
    skills: [
      { name: "FastAPI / Python", value: "90%" },
      { name: "Node.js & TypeScript", value: "85%" },
      { name: "gRPC & Protocol Buffers", value: "78%" },
      { name: "GraphQL System Design", value: "80%" },
    ],
  },
  {
    category: "DevOps & Infrastructure",
    skills: [
      { name: "Docker & Container Orchestration", value: "85%" },
      { name: "AWS (EC2, ECS, Lambda, Bedrock)", value: "82%" },
      { name: "CI/CD Pipelines (GitHub Actions)", value: "88%" },
      { name: "Kubernetes Cluster Configuration", value: "70%" },
    ],
  },
  {
    category: "Data & Databases",
    skills: [
      { name: "Vector Databases (Pinecone, Milvus, Chroma)", value: "94%" },
      { name: "Relational Engines (PostgreSQL)", value: "85%" },
      { name: "Graph Architectures (Neo4j)", value: "80%" },
      { name: "Redis Caching Layers", value: "88%" },
    ],
  },
  {
    category: "Languages",
    skills: [
      { name: "Python", value: "95%" },
      { name: "TypeScript / JavaScript", value: "88%" },
      { name: "C++ (Quantization/Kernels)", value: "72%" },
      { name: "SQL", value: "84%" },
    ],
  },
  {
    category: "Tools & Workflow",
    skills: [
      { name: "Git & Monorepo Frameworks", value: "90%" },
      { name: "Linux System Administration / Shell", value: "85%" },
      { name: "Weights & Biases / MLflow", value: "80%" },
      { name: "LangChain / LangGraph", value: "92%" },
    ],
  },
];

export default function SkillsPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Character Split Reveal for Header
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

    // ScrollTriggered filling for proficiency bars (§3 & §8.2)
    const blocks = gridRef.current?.querySelectorAll(".skill-category-block");
    if (blocks && blocks.length > 0) {
      blocks.forEach((block) => {
        const structuralBars = block.querySelectorAll(".progress-bar-fill");
        
        gsap.fromTo(
          structuralBars,
          { width: "0%" },
          {
            width: (i, target) => target.getAttribute("data-target-width") || "0%",
            duration: 1.2, // --dur-slow
            ease: "cubic-bezier(0.65, 0.05, 0, 1)", // --ease-default
            scrollTrigger: {
              trigger: block,
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

      {/* Main Wrapper (§8) */}
      <div className="min-h-screen bg-[#282C20] text-white pt-24 px-[clamp(1.5rem,4vw,5rem)] pb-24 mx-auto max-w-[1200px]">
        
        {/* Page Header Block (§8) */}
        <header ref={headerRef} className="overflow-hidden mb-12">
          <p className="text-[0.7rem] tracking-[0.2em] uppercase text-[#B0B5A0] mb-2 font-semibold">
            {renderSplitText("/ SKILLS")}
          </p>
          <h1 className="text-[clamp(4rem,9vw,8.5rem)] font-black tracking-[-0.04em] leading-[0.88] uppercase select-none">
            {renderSplitText("WHAT I ")}
            <strong className="font-normal font-serif text-[#C8F000] italic">
              {renderSplitText("USE")}
            </strong>
          </h1>
          <div className="h-[1px] w-full bg-[#D2FF00]/20 mt-6 mb-12" />
        </header>

        {/* Skills Two-Column Grid Setup (§8.2) */}
        <div 
          ref={gridRef} 
          className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12"
        >
          {skillCategories.map((group, index) => (
            <div 
              key={index} 
              className="skill-category-block flex flex-col pb-8 border-b border-white/[0.06]"
            >
              {/* Category Subhead Header */}
              <h2 className="text-[0.7rem] tracking-[0.2em] uppercase text-[#D2FF00] font-semibold mb-6">
                {group.category}
              </h2>

              {/* Stack Lines */}
              <div className="flex flex-col gap-6">
                {group.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="w-full flex flex-col gap-2">
                    <div className="flex justify-between items-baseline w-full">
                      <span className="text-[0.9rem] font-semibold text-white">
                        {skill.name}
                      </span>
                      <span className="text-[0.68rem] tracking-wider font-mono text-[#B0B5A0]">
                        {skill.value}
                      </span>
                    </div>

                    {/* Horizontal Metrics Bar Layout (§8.2) */}
                    <div className="h-[2px] w-full bg-white/[0.08] relative overflow-hidden">
                      <div 
                        className="progress-bar-fill h-full bg-[#D2FF00] w-0 absolute left-0 top-0"
                        data-target-width={skill.value}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}