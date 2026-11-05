'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowDown, ArrowRight, Sparkles, Compass } from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollToNext = () => {
    const el = document.getElementById('philosophy-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-ivory-100">
      {/* Background Cinematic Textile Imagery with Organic Mask */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/craft-hero.avif"
          alt="Authentic Indian Handloom Textile and Craft"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 animate-pulse duration-[10000ms]"
        />
        {/* Editorial Gradients & Tint */}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/85 via-charcoal/60 to-charcoal/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-black/30" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-20 text-center text-ivory-100 flex flex-col items-center">
        {/* Cultural Heritage Pill */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-ivory-100/10 border border-ivory-100/20 backdrop-blur-md mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Sparkles className="w-3.5 h-3.5 text-turmeric" />
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] font-medium text-ivory-100">
            Threads of a Living Heritage • Mithila &amp; Kutch
          </span>
        </div>

        {/* Large Editorial Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-ivory-50 max-w-5xl leading-[1.08] drop-shadow-sm">
          An Art Woven <br className="hidden sm:inline" />
          Through <span className="italic font-light text-parchment">Generations.</span>
        </h1>

        {/* Supporting Editorial Copy */}
        <p className="mt-6 text-sm sm:text-base md:text-lg text-ivory-200/90 max-w-2xl font-light leading-relaxed">
          Discover the rare beauty of authentic Indian handlooms and sacred folk art — where centuries-old tacit knowledge meets contemporary heirloom design.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
          <Link
            href="/shop"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-terracotta text-white font-medium text-xs uppercase tracking-[0.2em] hover:bg-terracotta-dark transition-all duration-300 shadow-xl hover:shadow-terracotta/30 flex items-center justify-center space-x-2 group"
          >
            <span>Explore Collections</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/story"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-ivory-100 border border-ivory-100/30 backdrop-blur-md font-medium text-xs uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <Compass className="w-4 h-4 text-turmeric" />
            <span>Discover Our Story</span>
          </Link>
        </div>

        {/* Floating Craft Notes */}
        <div className="hidden lg:grid grid-cols-3 gap-8 mt-16 pt-10 border-t border-ivory-100/15 max-w-4xl text-left">
          <div className="border-l border-turmeric/40 pl-4">
            <span className="text-[10px] uppercase tracking-widest text-turmeric font-bold block">
              Mithila Folk Painting
            </span>
            <p className="text-xs text-ivory-200/80 mt-1">
              Natural soot ink &amp; earth pigments hand-applied with fine bamboo twigs.
            </p>
          </div>
          <div className="border-l border-turmeric/40 pl-4">
            <span className="text-[10px] uppercase tracking-widest text-turmeric font-bold block">
              Sujni &amp; Kantha Stitch
            </span>
            <p className="text-xs text-ivory-200/80 mt-1">
              Tens of thousands of poetic running stitches rippling over raw tussar silk.
            </p>
          </div>
          <div className="border-l border-turmeric/40 pl-4">
            <span className="text-[10px] uppercase tracking-widest text-turmeric font-bold block">
              Nomadic Kutch Rabari
            </span>
            <p className="text-xs text-ivory-200/80 mt-1">
              Hand-cut mirrors and counted cross-stitch traditions of the Great Rann.
            </p>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center space-y-1 text-ivory-200/70 hover:text-ivory-100 transition-colors cursor-pointer group"
        aria-label="Scroll to next section"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] font-medium">Scroll</span>
        <ArrowDown className="w-4 h-4 animate-bounce group-hover:text-turmeric transition-colors" />
      </button>
    </section>
  );
};
