'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Orbitron } from 'next/font/google';
import { useTransition } from './PageTransition';

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['900'],
  display: 'swap',
});

interface NodeConfig {
  label: string;
  href: string;
  orbit: number;
  speed: number;
  angle: number;
  size: number;
  color: string;
  subtitle: string;
  localSpinSpeed: number;
  x?: number;
  y?: number;
  flyProgress?: number;
  visible?: boolean;
  flyFrom?: { x: number; y: number };
}

interface Shockwave {
  x: number;
  y: number;
  startTime: number;
}

export const OrbitalHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const centerLabelRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const { navigate } = useTransition();

  const LIME = '#D2FF00';
  const LIME_OFF = '#C8F000';
  const GREY2 = '#D0D4C0';
  const GREY1 = '#B0B5A0';
  const OFF_WHITE = '#E8EDD8';
  const TILT = 0.38;

  const initialNodes: NodeConfig[] = [
    { label: 'Projects', href: '/projects', orbit: 88, speed: 0.00035, angle: Math.PI * 0.1, size: 24, color: LIME, subtitle: 'WHAT I BUILD', localSpinSpeed: 0.04 },
    { label: 'About', href: '/about', orbit: 88, speed: 0.00035, angle: Math.PI * 1.1, size: 20, color: OFF_WHITE, subtitle: 'WHO I AM', localSpinSpeed: -0.03 }, 
    { label: 'Skills', href: '/skills', orbit: 148, speed: 0.00022, angle: Math.PI * 0.8, size: 20, color: LIME_OFF, subtitle: 'WHAT I USE', localSpinSpeed: 0.05 },
    { label: 'Education', href: '/education', orbit: 148, speed: 0.00022, angle: Math.PI * 0.5, size: 17, color: OFF_WHITE, subtitle: 'WHERE I LEARNED', localSpinSpeed: 0.02 },
    { label: 'Publications', href: '/publications', orbit: 208, speed: 0.00022, angle: Math.PI * 1.1, size: 17, color: GREY2, subtitle: 'WHAT I WROTE', localSpinSpeed: -0.035 },
    { label: 'Volunteering', href: '/volunteering', orbit: 208, speed: 0.00022, angle: Math.PI * 1.5, size: 15, color: GREY1, subtitle: 'WHERE I GIVE BACK', localSpinSpeed: 0.045 },
    { label: 'Contact', href: '/contact', orbit: 262, speed: 0.00012, angle: Math.PI * 1.3, size: 18, color: LIME, subtitle: 'GET IN TOUCH', localSpinSpeed: 0.015 },
  ];

  const [nodes] = useState<NodeConfig[]>(initialNodes);
  const [currentSubtitle, setCurrentSubtitle] = useState('AI / LLM ENGINEER');
  const [hintVisible, setHintVisible] = useState(false);
  
  // Cinematic Intro States
  const [introPhase, setIntroPhase] = useState<'intro' | 'transition' | 'active'>('intro');
  const introAnimProgress = useRef(0);

  const phrases = ["I'm Aashinshana Weerakoon.", "An AI/ML Enthusiast and a Researcher."];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIntroPhase('transition');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (introPhase !== 'active') return;

    const currentPhrase = phrases[phraseIndex] || '';
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayedText.length < currentPhrase.length) {
        timer = setTimeout(() => {
          setDisplayedText(currentPhrase.slice(0, displayedText.length + 1));
        }, 50); 
      } else {
        timer = setTimeout(() => setIsDeleting(true), 2500);
      }
    } else {
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(currentPhrase.slice(0, displayedText.length - 1));
        }, 85); 
      } else {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, phraseIndex, introPhase]);

  const hoveredNodeRef = useRef<NodeConfig | null>(null);
  const activeShockwaveRef = useRef<Shockwave | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    let cx = W / 2;
    let cy = H / 2;

    const handleResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      cx = W / 2;
      cy = H / 2;
    };
    window.addEventListener('resize', handleResize);

    const savedAngles = sessionStorage.getItem('aashi_orbit_angles');
    const parsedAngles = savedAngles ? JSON.parse(savedAngles) : null;

    const runtimeNodes = nodes.map((n, idx) => {
      const angle = parsedAngles ? parsedAngles[idx] : n.angle;
      return {
        ...n,
        angle,
        x: cx,
        y: cy,
        flyProgress: 0,
        visible: false,
        flyFrom: {
          x: cx + (Math.random() - 0.5) * W * 1.8,
          y: cy + (Math.random() - 0.5) * H * 1.8,
        },
      };
    });

    const ORBIT_RINGS = [88, 148, 208, 262];
    let assembled: NodeConfig[] = [];
    let assembleQueue = [...runtimeNodes];
    let lastAssemble = 0;
    const assembleInterval = 320;
    let allAssembled = false;
    let animationFrameId: number;
    
    let mouseX = -9999;
    let mouseY = -9999;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const stars = Array.from({ length: 130 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.0 + 0.2,
      a: Math.random() * 0.20 + 0.05,
    }));

    const easeOutCubic = (v: number) => 1 - Math.pow(1 - v, 3);
    const easeOutQuad = (v: number) => v * (2 - v);

    const getResponsiveRadius = (baseRadius: number) => {
      const responsiveScale = W > 768 ? (W * 0.0014) : 1.0;
      const innerClearanceOffset = W > 768 ? 100 : 20;
      return baseRadius * responsiveScale + innerClearanceOffset;
    };

    const orbitXY = (angle: number, r: number) => {
      const adjustedRadius = getResponsiveRadius(r);
      return {
        x: cx + Math.cos(angle) * adjustedRadius,
        y: cy + Math.sin(angle) * adjustedRadius * TILT,
      };
    };

    const drawStars = () => {
      stars.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(210,255,0,${s.a})`;
        ctx.fill();
      });
    };

    const drawRings = () => {
      ORBIT_RINGS.forEach((r) => {
        const adjustedRadius = getResponsiveRadius(r);
        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(1, TILT);
        ctx.beginPath();
        ctx.arc(0, 0, adjustedRadius, 0, Math.PI * 2);
        ctx.restore();
        ctx.strokeStyle = 'rgba(210,255,0,0.08)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });
    };

    // Removed tiltOverride from here. The sphere should ALWAYS be a perfect circle.
    const drawCore = (t: number, customCy: number, scaleMultiplier: number) => {
      const pulse = 1 + Math.sin(t * 0.0018) * 0.03;
      const r = (45 * pulse) * scaleMultiplier;

      // Outer Glow
      ctx.save();
      ctx.translate(cx, customCy);
      ctx.beginPath();
      ctx.arc(0, 0, r * 2.6, 0, Math.PI * 2);
      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, r * 2.6);
      grad.addColorStop(0, 'rgba(210,255,0,0.22)');
      grad.addColorStop(0.6, 'rgba(200,240,0,0.06)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();

      // Inner Core Clip
      ctx.save();
      ctx.translate(cx, customCy);
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.clip();

      const coreAngle = t * 0.0008;
      const fluxX = Math.cos(coreAngle) * (r * 0.25);
      const fluxY = Math.sin(coreAngle) * (r * 0.15);

      const coreGrad = ctx.createRadialGradient(fluxX, fluxY, r * 0.1, 0, 0, r);
      coreGrad.addColorStop(0, '#FFFFFF');
      coreGrad.addColorStop(0.4, LIME);
      coreGrad.addColorStop(1, '#A2C800');
      ctx.fillStyle = coreGrad;
      ctx.fill();
      ctx.restore();

      // Border
      ctx.save();
      ctx.translate(cx, customCy);
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255,255,255,0.4)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
    };

    const drawNode = (n: NodeConfig, alpha: number, t: number, scaleMultiplier = 1) => {
      if (n.x === undefined || n.y === undefined) return;
      
      ctx.save();
      ctx.globalAlpha = alpha;

      ctx.translate(n.x, n.y);
      ctx.scale(scaleMultiplier, scaleMultiplier);

      const angleFromSun = Math.atan2(n.y - cy, n.x - cx);

      if (n.label === 'Projects') {
        ctx.save();
        ctx.scale(1, TILT);

        ctx.beginPath();
        ctx.arc(0, 0, n.size * 2.1, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(210, 255, 0, 0.08)';
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, 0, n.size * 2.1, 0, Math.PI * 2);
        ctx.strokeStyle = LIME;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([6, 14]);
        ctx.lineDashOffset = -t * n.localSpinSpeed * 0.5; 
        ctx.stroke();
        ctx.restore();
      }

      ctx.beginPath();
      ctx.arc(0, 0, n.size, 0, Math.PI * 2);
      ctx.fillStyle = n.color;
      ctx.fill();

      ctx.save();
      ctx.beginPath();
      ctx.arc(0, 0, n.size, 0, Math.PI * 2);
      ctx.clip();

      const loopWidth = n.size * 3;
      const spinCycle = (t * n.localSpinSpeed * 0.25) % loopWidth;

      ctx.fillStyle = 'rgba(255, 255, 255, 0.09)';
      for (let offset = -loopWidth; offset <= loopWidth; offset += loopWidth) {
        ctx.fillRect(-n.size * 1.5 + spinCycle + offset, -n.size * 0.4, n.size * 0.9, n.size * 0.2);
      }
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
      for (let offset = -loopWidth; offset <= loopWidth; offset += loopWidth) {
        ctx.fillRect(-n.size * 0.6 + spinCycle + offset, n.size * 0.15, n.size * 1.1, n.size * 0.18);
      }

      ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
      for (let offset = -loopWidth; offset <= loopWidth; offset += loopWidth) {
        ctx.beginPath();
        ctx.arc(-n.size * 0.9 + spinCycle + offset, -n.size * 0.1, n.size * 0.16, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      ctx.beginPath();
      ctx.arc(0, 0, n.size, 0, Math.PI * 2);

      const shadowOffsetX = Math.cos(angleFromSun) * (n.size * 0.45);
      const shadowOffsetY = Math.sin(angleFromSun) * (n.size * 0.45);
      
      const shadowGrad = ctx.createRadialGradient(-shadowOffsetX, -shadowOffsetY, n.size * 0.2, 0, 0, n.size);
      shadowGrad.addColorStop(0, 'rgba(0,0,0,0)');
      shadowGrad.addColorStop(0.7, 'rgba(0,0,0,0.35)');
      shadowGrad.addColorStop(1, 'rgba(10,14,8,0.85)'); 
      
      ctx.fillStyle = shadowGrad;
      ctx.fill();

      ctx.globalAlpha = alpha * 0.1;
      ctx.beginPath();
      ctx.arc(0, 0, n.size * 1.6, 0, Math.PI * 2);
      ctx.fillStyle = n.color;
      ctx.fill();

      ctx.restore();
    };

    const drawConnectionLine = (n: NodeConfig) => {
      if (n.x === undefined || n.y === undefined) return;
      ctx.beginPath();
      ctx.moveTo(n.x, n.y);
      ctx.lineTo(cx, cy);
      ctx.strokeStyle = 'rgba(210,255,0,0.12)';
      ctx.lineWidth = 0.5;
      ctx.stroke();
    };

    const drawShockwave = (ts: number) => {
      const wave = activeShockwaveRef.current;
      if (!wave) return;

      const duration = 500; 
      const elapsed = ts - wave.startTime;
      const progress = Math.max(0, Math.min(1, elapsed / duration));

      if (progress >= 1) {
        activeShockwaveRef.current = null;
        return;
      }

      const easeProgress = easeOutQuad(progress);
      const maxRadius = Math.max(W, H) * 1.5;
      const currentRadius = Math.max(0, easeProgress * maxRadius);
      const alpha = 0.15 * (1 - progress); 

      ctx.save();
      ctx.beginPath();
      ctx.arc(wave.x, wave.y, currentRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(210,255,0,${alpha})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();
    };

    const updateLabels = (activeHover: NodeConfig | null) => {
      assembled.forEach((n) => {
        const el = labelRefs.current[n.label];
        if (!el || n.x === undefined || n.y === undefined) return;
        
        const isHov = activeHover?.label === n.label;
        const currentScale = isHov ? 1.35 : 1.0;
        const currentSize = n.size * currentScale;

        const clearance = n.label === 'Projects' ? currentSize + 24 : currentSize + 10;
        const offsetX = n.x > cx ? clearance : -clearance;
        
        el.style.left = n.x + offsetX + 'px';
        el.style.top = n.y - 7 + 'px';
        el.style.transform = n.x <= cx ? 'translateX(-100%)' : '';
        
        el.style.opacity = isHov ? '1' : allAssembled ? '0.65' : '0';
        el.style.color = isHov ? LIME : '#FFFFFF';
      });
    };

    const checkHover = (): NodeConfig | null => {
      for (const n of assembled) {
        if (n.x === undefined || n.y === undefined) continue;
        const dx = mouseX - n.x;
        const dy = mouseY - n.y;
        if (Math.sqrt(dx * dx + dy * dy) < n.size + 24) {
          return n;
        }
      }
      return null;
    };

    let lastTime = performance.now();

    const loop = (ts: number) => {
      let dt = ts - lastTime;
      if (dt > 100) dt = 16.67; 
      lastTime = ts;

      ctx.clearRect(0, 0, W, H);
      drawStars();

      // CINEMATIC MATH
      const maxR = Math.max(W, H) * 0.8; 
      const giantScale = maxR / 45;
      const startCy = H + maxR - (H * 0.35); // Top slice perfectly covers bottom 1/3

      let currentScale = 1;
      let currentCy = cy;

      if (introPhase === 'intro') {
        currentScale = giantScale;
        currentCy = startCy;
      } else if (introPhase === 'transition') {
        introAnimProgress.current += 0.015; // Smooth transition speed
        if (introAnimProgress.current >= 1) {
          introAnimProgress.current = 1;
          setIntroPhase((prev) => {
             if (prev !== 'active') return 'active';
             return prev;
          });
        }
        
        const p = easeOutCubic(introAnimProgress.current);
        currentScale = giantScale + (1 - giantScale) * p;
        currentCy = startCy + (cy - startCy) * p;
      }

      // Draw the core dynamically (always perfectly round)
      drawCore(ts, currentCy, currentScale);

      if (introPhase === 'active') {
        drawRings();

        if (assembleQueue.length > 0) {
          if (lastAssemble === 0) {
            lastAssemble = ts; 
          }
          
          if (ts - lastAssemble > assembleInterval) {
            const next = assembleQueue.shift()!;
            next.visible = true;
            next.flyProgress = 0;
            assembled.push(next);
            lastAssemble = ts;
            if (assembleQueue.length === 0) {
              setTimeout(() => {
                allAssembled = true;
                if (centerLabelRef.current) centerLabelRef.current.style.opacity = '1';
                setHintVisible(true);
              }, 600);
            }
          }
        }

        const activeHover = checkHover();

        assembled.forEach((n) => {
          if (n.flyProgress !== undefined && n.flyProgress < 1) {
            n.flyProgress = Math.min(1, n.flyProgress + 0.022);
            const p = easeOutCubic(n.flyProgress);
            const target = orbitXY(n.angle, n.orbit);
            if (n.flyFrom) {
              n.x = n.flyFrom.x + (target.x - n.flyFrom.x) * p;
              n.y = n.flyFrom.y + (target.y - n.flyFrom.y) * p;
            }
            drawNode(n, p, ts, 1.0);
          } else {
            n.angle += n.speed * dt;
            const pos = orbitXY(n.angle, n.orbit);
            n.x = pos.x;
            n.y = pos.y;

            const isHovered = activeHover && activeHover.label === n.label;
            if (isHovered) {
              drawConnectionLine(n);
            }
            
            drawNode(n, 1, ts, isHovered ? 1.35 : 1.0);
          }
        });

        drawShockwave(ts);
        updateLabels(activeHover);
        
        const anglesToSave = assembled.map(n => n.angle);
        sessionStorage.setItem('aashi_orbit_angles', JSON.stringify(anglesToSave));

        const currentHovered = activeHover;
        const previouslyHovered = hoveredNodeRef.current;

        if (currentHovered?.label !== previouslyHovered?.label) {
          hoveredNodeRef.current = currentHovered;
          if (currentHovered) {
            setCurrentSubtitle(currentHovered.subtitle);
            setHintVisible(false);
          } else {
            setCurrentSubtitle('AI / LLM ENGINEER');
          }
        }

        container.style.cursor = activeHover ? 'pointer' : 'default';
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [introPhase, nodes]);

  const handleNodeClick = (e: React.MouseEvent) => {
    const activeHover = hoveredNodeRef.current;
    if (activeHover && activeHover.x !== undefined && activeHover.y !== undefined) {
      e.preventDefault();

      activeShockwaveRef.current = {
        x: activeHover.x,
        y: activeHover.y,
        startTime: performance.now(),
      };

      navigate(activeHover.href, 'hero-to-section', e);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`w-screen h-screen relative overflow-hidden select-none ${orbitron.className}`}
      style={{
        background: 'radial-gradient(circle, #2E3324 0%, #151811 80%, #0D0F0A 100%)',
      }}
      onClick={handleNodeClick}
    >
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none z-30 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* "WELCOME" LAYER: Z-[5] places it perfectly behind the canvas (Z-10) */}
      <div
        className={`absolute inset-0 pointer-events-none select-none z-[5] flex flex-col items-center justify-center transition-opacity duration-700 ease-out ${
          introPhase === 'intro' ? 'opacity-80' : 'opacity-0'
        }`}
      >
         <h1 className="text-white text-5xl md:text-7xl font-black uppercase tracking-[0.4em] mb-12">
           WELCOME
         </h1>
      </div>

      {/* "AASHI" LAYER: Same Z-[5] depth, fades in when active. Blur removed for clarity. */}
      <div
        ref={centerLabelRef}
        className="absolute top-[calc(50%-55px)] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none opacity-0 transition-all duration-1000 z-[5]"
      >
        <h1 
          className="text-white/80 uppercase text-4xl sm:text-5xl md:text-6xl tracking-[0.16em] pl-[0.16em] font-black drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
          style={{ fontVariationSettings: '"wght" 950, "wdth" 90' }}
        >
          Aashi
        </h1>
      </div>

      {/* CANVAS: Z-10 creates the occlusion mask for the text */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10 bg-transparent" />

      {/* ALL OTHER UI ELEMENTS: Only mount or become visible when active */}
      <div className={`transition-opacity duration-1000 ${introPhase === 'active' ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute top-6 left-6 flex flex-col font-mono text-[9px] text-[var(--grey-ot)] tracking-[0.2em] uppercase z-40">
          <span>System // Active</span>
          <span className="opacity-40">v2.0.26</span>
        </div>

        <div className="absolute top-6 right-6 font-mono text-[9px] text-[var(--grey-ot)] tracking-[0.2em] uppercase z-40 text-right">
          <span>Based in Sri Lanka</span>
        </div>

        <div className="absolute bottom-12 left-6 z-40 select-none">
          <div className="backdrop-blur-md bg-white/[0.03] border border-white/[0.08] p-6 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] w-fit">
            <p 
              className="text-white/90 uppercase text-lg sm:text-xl md:text-2xl tracking-[0.2em] font-black drop-shadow-[0_0_8px_rgba(210,255,0,0.4)] whitespace-nowrap"
              style={{ fontVariationSettings: '"wght" 900, "wdth" 90' }}
            >
              {displayedText}
              <span className="animate-pulse ml-2 text-[#D2FF00] drop-shadow-[0_0_10px_rgba(210,255,0,0.8)]">_</span>
            </p>
          </div>
        </div>

        <div className="absolute bottom-6 right-6 font-mono text-[9px] text-[var(--grey-ot)] tracking-[0.2em] uppercase z-40 text-right">
          <span>©2026 Aashi</span>
        </div>

        {initialNodes.map((n) => (
          <div
            key={n.label}
            ref={(el) => {
              labelRefs.current[n.label] = el;
            }}
            className="absolute text-[13px] tracking-[0.14em] uppercase pointer-events-none opacity-0 transition-opacity duration-300 font-bold whitespace-nowrap z-20 text-white drop-shadow-[0_2px_5px_rgba(0,0,0,0.6)]"
          >
            {n.label}
          </div>
        ))}

        {hintVisible && (
          <div
            ref={hintRef}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[0.65rem] text-[var(--grey-ot)] tracking-[0.14em] uppercase opacity-100 transition-opacity duration-1000 z-40"
          >
            hover a sphere to explore
          </div>
        )}
      </div>
    </div>
  );
};