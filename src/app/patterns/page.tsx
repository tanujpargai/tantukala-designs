'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, ArrowRight, Compass } from 'lucide-react';
import { PatternExhibition } from '@/components/home/PatternExhibition';

export default function PatternsPage() {
  return (
    <div className="bg-charcoal min-h-screen text-ivory-100">
      {/* Editorial Page Header */}
      <div className="pt-16 pb-10 border-b border-charcoal-muted/40">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <Link
            href="/"
            className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-widest text-turmeric hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Atelier Home</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <span className="text-xs uppercase tracking-[0.25em] text-turmeric font-semibold block mb-2">
                Sacred Symbology &amp; Mineral Chemistry
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-ivory-50 tracking-tight">
                The Art of Patterns
              </h1>
              <p className="text-sm sm:text-base text-ivory-200/80 mt-3 font-light leading-relaxed">
                An interactive curatorial exhibition decoding the spiritual geometry, natural earth pigments, and generational linework of India&apos;s oldest living artistic traditions.
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                href="/shop"
                className="px-6 py-3 rounded-full bg-terracotta hover:bg-terracotta-dark text-white text-xs uppercase tracking-widest font-semibold transition-all shadow-md flex items-center space-x-2"
              >
                <span>Shop Patterned Works</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Curatorial Archive Component */}
      <PatternExhibition />

      {/* Cultural Footnote & Bridge to Craft */}
      <div className="py-20 bg-charcoal-dark border-t border-charcoal-muted/40">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="w-12 h-12 rounded-full border border-turmeric/40 flex items-center justify-center mx-auto text-turmeric">
            <Sparkles className="w-5 h-5" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-ivory-50">
            Every Motif is a Living Language
          </h2>
          <p className="text-xs sm:text-sm text-ivory-200/80 leading-relaxed font-light">
            In traditional Indian folk art, no line is purely decorative. A fish is fertility; a lotus is transcendental purity; the sun is the cosmic animator. When you bring these textiles into your space, you preserve the continuous memory of this symbolic language.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/craft"
              className="px-6 py-3 rounded-full border border-ivory-100/30 text-ivory-100 hover:bg-white/10 text-xs uppercase tracking-widest font-semibold transition-colors"
            >
              Explore Craft Process &rarr;
            </Link>
            <Link
              href="/artisans"
              className="px-6 py-3 rounded-full bg-turmeric text-charcoal hover:bg-turmeric-light text-xs uppercase tracking-widest font-semibold transition-colors"
            >
              Meet the Master Artisans &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
