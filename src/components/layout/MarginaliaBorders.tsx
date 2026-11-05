'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp, Sparkles, MessageCircle, Compass } from 'lucide-react';

interface MarginaliaBordersProps {
  onReplayOpening?: () => void;
}

export const MarginaliaBorders: React.FC<MarginaliaBordersProps> = ({ onReplayOpening }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setScrollProgress(progress);
        setShowScrollTop(window.scrollY > 400);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* =========================================================================
          LEFT MARGINALIA: Handloom Selvage (किनारी) & Vertical Living Weave
         ========================================================================= */}
      <div
        className="hidden xl:flex fixed left-0 top-0 bottom-0 w-12 2xl:w-16 z-30 pointer-events-none flex-col justify-between items-center py-8 select-none"
        aria-hidden="true"
      >
        {/* Top: Sanskrit Seal & Weft Diamond */}
        <div className="flex flex-col items-center space-y-2">
          <div className="w-8 h-8 rounded-full border border-terracotta/30 flex items-center justify-center text-[10px] font-serif font-bold text-terracotta bg-ivory-100/80 backdrop-blur-sm shadow-sm">
            त
          </div>
          <div className="w-1.5 h-1.5 bg-turmeric rotate-45" />
        </div>

        {/* Center: Vertical Rotated Editorial Monogram & Running-Stitch Thread */}
        <div className="relative flex-1 flex items-center justify-center my-6">
          {/* Vertical Running Stitch Line */}
          <div className="absolute top-0 bottom-0 w-[1px] bg-repeat-y bg-[linear-gradient(to_bottom,#B65C43_0,#B65C43_6px,transparent_6px,transparent_12px)] opacity-30" />

          {/* Golden Thread Shuttle Bead linked to Scroll Progress */}
          <div
            className="absolute w-2 h-2 rounded-full bg-turmeric shadow-md border border-white transition-all duration-150 ease-out"
            style={{
              top: `${scrollProgress}%`,
              transform: 'translateY(-50%)',
            }}
          />

          {/* Vertical Editorial Typography */}
          <div className="rotate-180 [writing-mode:vertical-rl] text-[10px] uppercase tracking-[0.3em] text-charcoal/50 font-medium py-4 bg-ivory-100/90 px-1 rounded backdrop-blur-sm">
            Tantukala Atelier &bull; Threads of a Living Heritage &bull; Estd. 2026
          </div>
        </div>

        {/* Bottom: Loom Warp Tension Indicator */}
        <div className="flex flex-col items-center space-y-1.5 text-[9px] font-mono text-charcoal/40">
          <span>{Math.round(scrollProgress)}%</span>
          <div className="w-4 h-[1px] bg-parchment" />
          <span className="uppercase text-[8px] tracking-widest text-terracotta">Weave</span>
        </div>
      </div>

      {/* =========================================================================
          RIGHT MARGINALIA: Regional Provenance & Interactive Atelier Controls
         ========================================================================= */}
      <div
        className="hidden xl:flex fixed right-0 top-0 bottom-0 w-12 2xl:w-16 z-30 pointer-events-none flex-col justify-between items-center py-8 select-none"
        aria-hidden="true"
      >
        {/* Top: Compass / Provenance Seal */}
        <div className="flex flex-col items-center space-y-2 pointer-events-auto">
          {onReplayOpening && (
            <button
              onClick={onReplayOpening}
              title="Replay Opening Experience"
              className="w-8 h-8 rounded-full border border-parchment bg-ivory-100/90 hover:bg-white text-charcoal/60 hover:text-terracotta flex items-center justify-center transition-all shadow-sm hover:scale-110"
              aria-label="Replay intro curtain"
            >
              <Sparkles className="w-3.5 h-3.5 text-turmeric" />
            </button>
          )}
          <div className="w-1.5 h-1.5 bg-indigo rotate-45" />
        </div>

        {/* Center: Vertical Geographic Weave Provenance */}
        <div className="relative flex-1 flex items-center justify-center my-6">
          {/* Vertical Running Stitch Line */}
          <div className="absolute top-0 bottom-0 w-[1px] bg-repeat-y bg-[linear-gradient(to_bottom,#24364A_0,#24364A_6px,transparent_6px,transparent_12px)] opacity-25" />

          {/* Vertical Text */}
          <div className="[writing-mode:vertical-rl] text-[10px] uppercase tracking-[0.3em] text-charcoal/50 font-medium py-4 bg-ivory-100/90 px-1 rounded backdrop-blur-sm">
            Mithila &bull; Kutch &bull; Bhagalpur &bull; Chanderi &bull; Bengal
          </div>
        </div>

        {/* Bottom: Scroll to Top Action Button */}
        <div className="flex flex-col items-center space-y-2 pointer-events-auto">
          {showScrollTop && (
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-full bg-charcoal text-ivory-100 hover:bg-terracotta flex items-center justify-center transition-all duration-300 shadow-md hover:-translate-y-1"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          )}
          <span className="text-[8px] uppercase tracking-widest text-charcoal/40 font-mono">
            Atelier
          </span>
        </div>
      </div>

      {/* =========================================================================
          SUBTLE CORNER FOLK-ART MOTIFS FOR LARGE DISPLAYS
         ========================================================================= */}
      {/* Top Left Corner Folk Flourish */}
      <div className="hidden xl:block fixed top-24 left-3 z-10 pointer-events-none opacity-20">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="text-terracotta">
          <path d="M0 0 L32 0 C16 16, 16 16, 0 32 Z" fill="currentColor" />
          <circle cx="8" cy="8" r="3" fill="#24364A" />
          <path d="M0 40 Q20 20 40 0" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        </svg>
      </div>

      {/* Top Right Corner Folk Flourish */}
      <div className="hidden xl:block fixed top-24 right-3 z-10 pointer-events-none opacity-20">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="text-indigo">
          <path d="M64 0 L32 0 C48 16, 48 16, 64 32 Z" fill="currentColor" />
          <circle cx="56" cy="8" r="3" fill="#B65C43" />
          <path d="M64 40 Q44 20 24 0" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        </svg>
      </div>
    </>
  );
};
