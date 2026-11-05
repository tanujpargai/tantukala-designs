'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, ChevronUp, Feather } from 'lucide-react';

interface AtelierOpeningProps {
  forceOpen?: boolean;
  onComplete?: () => void;
}

export const AtelierOpeningExperience: React.FC<AtelierOpeningProps> = ({
  forceOpen = false,
  onComplete,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if user has already seen opening in this session
    const hasSeen = sessionStorage.getItem('tantukala_seen_opening_v1');
    const isSmallScreen = window.innerWidth < 768;
    setIsMobile(isSmallScreen);

    if (forceOpen || !hasSeen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';

      // Auto-trigger smooth opening after brief cinematic pause
      const timer = setTimeout(() => {
        triggerOpen();
      }, isSmallScreen ? 2200 : 2000);

      return () => clearTimeout(timer);
    }
  }, [forceOpen]);

  const triggerOpen = () => {
    setIsOpening(true);
    sessionStorage.setItem('tantukala_seen_opening_v1', 'true');

    setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = '';
      if (onComplete) onComplete();
    }, 1100);
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden pointer-events-auto"
      role="dialog"
      aria-label="Atelier Opening Entrance"
    >
      {/* =========================================================================
          DESKTOP OPENING: Dual-Curtain Loom Warp Reveal (Splits Left & Right)
         ========================================================================= */}
      {!isMobile ? (
        <div className="relative w-full h-full">
          {/* Left Curtain Panel */}
          <div
            className={`absolute top-0 bottom-0 left-0 w-1/2 bg-charcoal text-ivory-50 border-r border-terracotta/30 z-10 transition-transform duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] ${
              isOpening ? '-translate-x-full' : 'translate-x-0'
            }`}
          >
            {/* Subtle vertical loom warp threads pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D5A449_1px,transparent_1px)] [background-size:16px_16px]" />
          </div>

          {/* Right Curtain Panel */}
          <div
            className={`absolute top-0 bottom-0 right-0 w-1/2 bg-charcoal text-ivory-50 border-l border-terracotta/30 z-10 transition-transform duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] ${
              isOpening ? 'translate-x-full' : 'translate-x-0'
            }`}
          >
            {/* Subtle vertical loom warp threads pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D5A449_1px,transparent_1px)] [background-size:16px_16px]" />
          </div>

          {/* Center Brand Emblem & Weft Shuttle (Fades out when curtains part) */}
          <div
            className={`absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 transition-all duration-700 ${
              isOpening ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
            }`}
          >
            {/* Golden Horizontal Weft Thread Animation */}
            <div className="w-64 h-[1px] bg-gradient-to-r from-transparent via-turmeric to-transparent mb-6 animate-pulse" />

            {/* Sanskrit Seal */}
            <div className="w-16 h-16 rounded-full border border-turmeric/60 bg-charcoal-dark flex items-center justify-center text-xl font-serif font-bold text-turmeric shadow-xl mb-4">
              तन्तुकला
            </div>

            {/* Editorial Title */}
            <h2 className="font-serif text-4xl lg:text-5xl font-medium tracking-wider text-ivory-50">
              TANTUKALA DESIGNS
            </h2>
            <p className="text-xs uppercase tracking-[0.35em] text-turmeric mt-2 font-semibold">
              Where Heritage Becomes Art
            </p>
            <p className="text-xs text-ivory-200/60 mt-3 font-light tracking-widest uppercase">
              Mithila &bull; Kutch &bull; Bhagalpur &bull; Bengal
            </p>

            {/* Manual Enter / Skip CTA */}
            <div className="mt-8">
              <button
                onClick={triggerOpen}
                className="px-8 py-3 rounded-full border border-turmeric/50 bg-charcoal-dark/80 hover:bg-terracotta text-ivory-50 text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-300 shadow-xl hover:scale-105 flex items-center space-x-2"
              >
                <span>Enter The Atelier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* =========================================================================
            MOBILE OPENING: The Vertical Handloom Scroll Unfurl (Glides Upward)
           ========================================================================= */
        <div
          className={`fixed inset-0 w-full h-[100dvh] bg-ivory-100 text-charcoal z-20 flex flex-col justify-between p-8 transition-transform duration-900 ease-[cubic-bezier(0.76,0,0.24,1)] ${
            isOpening ? '-translate-y-full' : 'translate-y-0'
          }`}
        >
          {/* Top Running Stitch Border */}
          <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-terracotta font-semibold pt-4">
            <span>Atelier Estd. 2026</span>
            <span className="font-serif">तन्तुकला</span>
          </div>

          {/* Center Mobile Motif & Brand Card */}
          <div className="flex flex-col items-center text-center space-y-4 my-auto">
            {/* Animated Lotus Mandala SVG */}
            <div className="w-20 h-20 relative flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full text-terracotta animate-spin-slow duration-[25000ms]">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#D5A449" strokeWidth="1.5" strokeDasharray="4 3" />
                <path d="M50 15 C45 35, 55 35, 50 15 Z M50 85 C45 65, 55 65, 50 85 Z M15 50 C35 45, 35 55, 15 50 Z M85 50 C65 45, 65 55, 85 50 Z" fill="#B65C43" opacity="0.8" />
                <circle cx="50" cy="50" r="14" fill="#24364A" />
                <circle cx="50" cy="50" r="6" fill="#F5F0E6" />
              </svg>
            </div>

            <div>
              <h1 className="font-serif text-3xl font-medium tracking-wider text-charcoal">
                TANTUKALA
              </h1>
              <span className="text-[10px] uppercase tracking-[0.3em] text-terracotta font-bold block mt-1">
                Where Heritage Becomes Art
              </span>
            </div>

            <p className="text-xs text-charcoal/70 max-w-xs font-light leading-relaxed">
              Authentic Indian handlooms &amp; sacred folk art preserved through generations.
            </p>
          </div>

          {/* Bottom Tactile Swipe-up / Tap Action */}
          <div className="flex flex-col items-center pb-6">
            <button
              onClick={triggerOpen}
              className="w-full py-4 rounded-2xl bg-charcoal text-ivory-50 text-xs uppercase tracking-[0.2em] font-semibold shadow-xl flex items-center justify-center space-x-2 active:scale-95 transition-transform"
            >
              <span>Unfurl The Weave</span>
              <ChevronUp className="w-4 h-4 animate-bounce text-turmeric" />
            </button>
            <span className="text-[10px] text-charcoal/40 uppercase tracking-widest mt-3">
              Tap or Swipe up to enter
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
