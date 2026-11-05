'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sparkles, ArrowRight, CheckCircle2, Feather, Flame, Scissors, PackageCheck } from 'lucide-react';

export const CraftProcess: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: '01',
      title: 'Raw Materials & Sacred Fibers',
      subtitle: 'Harvesting Nature’s Equilibrium',
      desc: 'We begin with ethically harvested wild forest Tussar silk cocoons from Bhagalpur, hand-spun indigenous Kora cotton, and unbleached handmade paper. No harsh chemical desizing or synthetic petrochemical threads are ever introduced.',
      icon: Feather,
      details: ['Wild Forest Tussar Cocoon Reeling', 'Indigenous Kora Cotton Spinning', 'Handmade Rag Paper Pre-wash'],
      image: '/images/craft-hero.avif',
    },
    {
      number: '02',
      title: 'Natural Dyeing & Organic Mordants',
      subtitle: 'Earth Chemistry & Living Vats',
      desc: 'Pigments are extracted from fermented indigo leaves, wild madder root (alizarin), powdered turmeric, and soot gathered from mustard oil lamps. Natural alum, tamarind seeds, and iron-rust water fix the dyes into permanent botanical bonds.',
      icon: Flame,
      details: ['Fermented Natural Indigo Vats', 'Lampblack Acacia Ink Preparation', 'Sun-cured Organic Mordanting'],
      image: '/images/bela.avif',
    },
    {
      number: '03',
      title: 'Slow Weaving & Master Needlecraft',
      subtitle: 'Tacit Knowledge in Rhythm',
      desc: 'Master weavers work pit looms with rhythmic foot pedals, while women embroiderers work in courtyard circles using Sujni running stitches, Kutch mirror settings, and micro-fine bamboo nib inking. A single saree may take 45 uninterrupted days.',
      icon: Scissors,
      details: ['Pit Loom Warp & Weft Alignment', 'Counted Thread Jat Cross-Stitching', 'Hand-cut Mirror Buttonhole Setting'],
      image: '/images/sujni.avif',
    },
    {
      number: '04',
      title: 'Artisanal Finishing & Archival Seal',
      subtitle: 'Heirloom Inspection & Care',
      desc: 'Each finished textile is hand-washed in natural soap nuts (Reetha), shade-dried under courtyard eaves, carefully inspected for tension balance, and stamped with our studio provenance seal before being wrapped in breathable archival muslin.',
      icon: PackageCheck,
      details: ['Gentle Reetha Eco-Washing', 'Precision Structural Inspection', 'Artisan Certificate of Authenticity'],
      image: '/images/kantha.avif',
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-parchment-light/30 border-y border-parchment">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-terracotta font-semibold block mb-2">
            The Journey of Making
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-charcoal">
            The Craftsmanship Process
          </h2>
          <p className="text-sm text-charcoal/70 mt-3 font-light leading-relaxed">
            Raw Materials &rarr; Organic Dyeing &rarr; Handloom &amp; Needlecraft &rarr; Final Creation. Trace how a whisper of thread becomes an heirloom.
          </p>
        </div>

        {/* Step Tabs / Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-12">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isActive = activeStep === idx;
            return (
              <button
                key={s.number}
                onClick={() => setActiveStep(idx)}
                className={`p-4 sm:p-5 rounded-2xl text-left transition-all border ${
                  isActive
                    ? 'bg-ivory-50 border-terracotta shadow-craft'
                    : 'bg-transparent border-parchment/80 hover:bg-ivory-50/60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`font-mono text-xs font-bold ${
                      isActive ? 'text-terracotta' : 'text-charcoal/40'
                    }`}
                  >
                    {s.number}
                  </span>
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-terracotta' : 'text-charcoal/40'
                    }`}
                  />
                </div>
                <h4
                  className={`font-serif text-sm font-medium ${
                    isActive ? 'text-charcoal' : 'text-charcoal/70'
                  }`}
                >
                  {s.title.split(' & ')[0]}
                </h4>
              </button>
            );
          })}
        </div>

        {/* Active Step Showcase */}
        <div className="bg-ivory-50 rounded-3xl overflow-hidden border border-parchment shadow-craft p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Content */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-terracotta font-bold">
                  Phase {steps[activeStep].number} of 04 • {steps[activeStep].subtitle}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-charcoal font-medium mt-1">
                  {steps[activeStep].title}
                </h3>
              </div>

              <p className="text-sm text-charcoal/80 leading-relaxed font-light">
                {steps[activeStep].desc}
              </p>

              {/* Details List */}
              <div className="space-y-2.5 pt-2">
                {steps[activeStep].details.map((item, i) => (
                  <div key={i} className="flex items-center space-x-2.5 text-xs text-charcoal/90">
                    <CheckCircle2 className="w-4 h-4 text-forest flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center space-x-4">
                <button
                  onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
                  className="px-6 py-2.5 rounded-full bg-charcoal text-white hover:bg-terracotta transition-colors text-xs uppercase tracking-widest font-semibold flex items-center space-x-1.5"
                >
                  <span>Next Phase</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs text-charcoal/50">
                  Step {activeStep + 1} of {steps.length}
                </span>
              </div>
            </div>

            {/* Right: Photographic Visual */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-parchment shadow-md border border-parchment">
                <Image
                  src={steps[activeStep].image}
                  alt={steps[activeStep].title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
