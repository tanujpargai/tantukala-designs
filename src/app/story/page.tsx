'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ArrowRight, Compass, ShieldCheck, Heart } from 'lucide-react';
import { BrandCampaign } from '@/components/home/BrandCampaign';

export default function StoryPage() {
  return (
    <div className="py-14 sm:py-24 bg-ivory-100 min-h-screen">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-terracotta font-semibold block mb-2">
            The Tantukala Genesis
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-charcoal">
            Threads of a Living Heritage
          </h1>
          <p className="text-sm text-charcoal/70 mt-3 font-light leading-relaxed">
            Where ancestral craftsmanship meets contemporary editorial living.
          </p>
        </div>

        {/* Narrative Section 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-6 relative aspect-[4/5] rounded-3xl overflow-hidden bg-parchment shadow-craft border border-parchment">
            <Image
              src="/images/craft-hero.avif"
              alt="Artisanal Handloom Loom in Studio"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.2em] text-turmeric font-semibold block">
              Our Founding Ethos
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-medium">
              A Living Continuum, Not a Museum Relic
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-charcoal/80 leading-relaxed font-light">
              <p>
                In the Sanskrit lexicon, <em>Tantu</em> (तन्तु) represents the primordial warp thread — the sacred filament that binds cosmos, human heart, and physical memory. <em>Kala</em> (कला) is the disciplined artistic mastery of hand and spirit. Together, <strong>Tantukala</strong> translates to the timeless art of the thread.
              </p>
              <p>
                Founded to bridge the quiet village courtyards of Bihar, Gujarat, and Bengal with discerning collectors worldwide, Tantukala operates not as a commercial middleman, but as an intentional craft house.
              </p>
              <p>
                We reject the rushed pace of mechanized fast fashion. Each handloom drape, embroidered stole, and painted panel is allowed the time it naturally requires: weeks of patient pit-loom tensioning, months of delicate needlework, and days of natural indigo curing in the desert sun.
              </p>
            </div>
          </div>
        </div>

        {/* The 3 Core Commitments */}
        <div className="bg-charcoal text-ivory-100 rounded-3xl p-8 sm:p-14 mb-24">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-turmeric font-semibold block mb-2">
              Our Sacred Covenant
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-medium text-ivory-50">
              Three Uncompromising Principles
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs text-ivory-200/80 leading-relaxed">
            <div className="p-6 rounded-2xl bg-charcoal-dark border border-charcoal-muted">
              <span className="font-serif text-2xl text-turmeric font-bold block mb-2">01</span>
              <h4 className="font-serif text-base text-ivory-50 font-semibold mb-2">Pure Provenance</h4>
              <p>
                Zero synthetic fibers. We work exclusively with certified wild forest Tussar silk, pure mulberry silk, indigenous Desi wool, and hand-spun unbleached Kora cotton.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-charcoal-dark border border-charcoal-muted">
              <span className="font-serif text-2xl text-terracotta font-bold block mb-2">02</span>
              <h4 className="font-serif text-base text-ivory-50 font-semibold mb-2">Artisan Dignity</h4>
              <p>
                Artisans are credited by name and community. Fair-wage compensation is disbursed upfront before production begins, ensuring economic stability in rural craft hamlets.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-charcoal-dark border border-charcoal-muted">
              <span className="font-serif text-2xl text-indigo-light font-bold block mb-2">03</span>
              <h4 className="font-serif text-base text-ivory-50 font-semibold mb-2">Generational Life</h4>
              <p>
                Our creations are structural heirlooms designed to be worn, loved, displayed, and passed down across generations with timeless elegance.
              </p>
            </div>
          </div>
        </div>

        {/* Brand Campaign Manifesto Banner */}
        <div className="mb-24 rounded-3xl overflow-hidden shadow-craft">
          <BrandCampaign />
        </div>

        {/* Closing Action */}
        <div className="text-center max-w-xl mx-auto space-y-4">
          <h3 className="font-serif text-2xl text-charcoal font-medium">
            Explore the Creations of Our Artisans
          </h3>
          <p className="text-xs text-charcoal/70">
            Every piece you select helps sustain an endangered Indian weaving lineage.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center space-x-2 px-8 py-4 rounded-full bg-terracotta text-white font-semibold text-xs uppercase tracking-widest hover:bg-terracotta-dark transition-all shadow-md"
            >
              <span>Explore The Atelier</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/artisans"
              className="inline-flex items-center space-x-2 px-8 py-4 rounded-full border border-charcoal/30 text-charcoal hover:bg-charcoal hover:text-white font-semibold text-xs uppercase tracking-widest transition-all"
            >
              <span>Meet The Artisans</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
