'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';

export const BrandCampaign: React.FC = () => {
  return (
    <section className="relative py-28 sm:py-36 bg-indigo-deep text-ivory-50 overflow-hidden">
      {/* Background Cinematic Texture */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Image
          src="/images/jat.avif"
          alt="Campaign Background Texture"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-indigo-deep/80 mix-blend-multiply" />
      </div>

      <div className="relative z-10 max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 text-center">
        <div className="inline-flex items-center space-x-2 mb-8">
          <Sparkles className="w-3.5 h-3.5 text-turmeric" />
          <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-turmeric">
            The Tantukala Manifesto
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.15] max-w-4xl mx-auto text-ivory-50">
          &ldquo;Tradition Is Not Something We Leave Behind. <br className="hidden sm:inline" />
          <span className="italic text-turmeric-light font-light">
            It Is Something We Carry Forward.
          </span>&rdquo;
        </h2>

        <p className="mt-6 text-sm sm:text-base md:text-lg text-ivory-200/80 max-w-2xl mx-auto font-light leading-relaxed">
          Every handloom drape and painted panel you bring into your life preserves a family lineage, keeps a loom humming in rural India, and connects your contemporary space to centuries of continuous artistic civilization.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/shop"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-terracotta text-white hover:bg-terracotta-dark transition-all duration-300 font-semibold text-xs uppercase tracking-[0.2em] shadow-xl flex items-center justify-center space-x-2 group"
          >
            <span>Patronize an Heirloom</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/wholesale"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-transparent hover:bg-white/10 text-ivory-100 border border-ivory-100/30 transition-all duration-300 font-semibold text-xs uppercase tracking-[0.2em]"
          >
            Boutique &amp; Hospitality Curation
          </Link>
        </div>
      </div>
    </section>
  );
};
