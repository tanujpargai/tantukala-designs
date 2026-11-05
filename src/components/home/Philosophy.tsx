'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, Feather, Layers, ShieldCheck } from 'lucide-react';

export const Philosophy: React.FC = () => {
  return (
    <section id="philosophy-section" className="py-24 sm:py-32 bg-ivory-100 overflow-hidden relative">
      {/* Subtle background decorative shapes */}
      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Asymmetric Layered Imagery */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main large image */}
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-craft border border-parchment">
                <Image
                  src="/images/sujni.avif"
                  alt="Sujni Hand Embroidery Detail by Master Artisans"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Overlapping secondary detail image */}
              <div className="absolute -bottom-8 -right-6 sm:-right-8 w-1/2 aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-ivory-100">
                <Image
                  src="/images/kantha.avif"
                  alt="Kantha Texture Macro Detail"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>

              {/* Floating Artisan Badge */}
              <div className="absolute -top-6 -left-4 sm:-left-6 bg-charcoal text-ivory-50 p-4 rounded-2xl shadow-xl border border-charcoal-muted max-w-[200px]">
                <div className="flex items-center space-x-1.5 text-turmeric text-[11px] font-bold uppercase tracking-wider mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Living Archive</span>
                </div>
                <p className="text-[11px] text-ivory-200/80 leading-snug">
                  Zero synthetic polyester. Only pure Tussar silk, indigenous cotton &amp; mineral pigments.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Editorial Narrative */}
          <div className="lg:col-span-6 space-y-6 lg:pl-6">
            <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.25em] text-terracotta font-semibold">
              <Feather className="w-4 h-4" />
              <span>Brand Philosophy</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-charcoal leading-[1.15]">
              More Than Fabric. <br />
              <span className="italic text-terracotta font-normal">A Piece of Heritage.</span>
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-charcoal/80 leading-relaxed font-light">
              <p>
                Every thread carries a story. Every pattern preserves a memory. Every handcrafted creation represents generations of artistic knowledge.
              </p>
              <p>
                In a modern world characterized by rushed assembly lines and disposable fashion, Tantukala exists as an intentional sanctuary for slow craft. We work directly with master weavers, needlework matriarchs, and generational block printers across the craft hamlets of Bihar, Gujarat, and Bengal.
              </p>
              <p className="text-xs sm:text-sm text-charcoal/70 italic border-l-2 border-terracotta/40 pl-4 py-1">
                &ldquo;We do not view craftsmanship as a nostalgic artifact of the past. It is a living, breathing continuum that deserves dignity, fair patronage, and pride of place in contemporary homes.&rdquo;
              </p>
            </div>

            {/* Three Pillar Points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-parchment">
              <div>
                <span className="font-serif text-lg font-bold text-charcoal block">100%</span>
                <span className="text-xs text-charcoal/70">Handloom &amp; Artisanal Provenance</span>
              </div>
              <div>
                <span className="font-serif text-lg font-bold text-terracotta block">Direct</span>
                <span className="text-xs text-charcoal/70">Fair-Wage Artisan Patronage</span>
              </div>
              <div>
                <span className="font-serif text-lg font-bold text-indigo block">Heirloom</span>
                <span className="text-xs text-charcoal/70">Generational Structural Integrity</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/story"
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-semibold text-charcoal hover:text-terracotta transition-colors group"
              >
                <span>Read Our Founding Manifesto</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
