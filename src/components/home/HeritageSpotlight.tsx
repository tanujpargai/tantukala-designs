'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Feather, Users, Compass, Eye } from 'lucide-react';

export const HeritageSpotlight: React.FC = () => {
  const portals = [
    {
      title: 'The Art of Patterns',
      subtitle: 'Sacred Symbology & Mineral Chemistry',
      desc: 'Interactive curatorial archive decoding Kachni linework, lotus mandalas, and natural earth dyes.',
      image: '/images/bela.avif',
      href: '/patterns',
      tag: 'Interactive Archive',
      icon: Sparkles,
      color: 'text-turmeric',
    },
    {
      title: 'The Regional Crafts',
      subtitle: 'From Raw Cocoon to Loom',
      desc: 'Step-by-step master techniques: Sujni needlework, Rabari mirror setting, and Bela mud resist.',
      image: '/images/sujni.avif',
      href: '/craft',
      tag: 'Living Process',
      icon: Feather,
      color: 'text-terracotta',
    },
    {
      title: 'Master Artisans',
      subtitle: 'Hands That Preserve Heritage',
      desc: 'Meet the multi-generational custodians of tacit knowledge across Bihar, Gujarat, and Bengal.',
      image: '/images/kantha.avif',
      href: '/artisans',
      tag: 'Direct Patronage',
      icon: Users,
      color: 'text-indigo-light',
    },
    {
      title: 'Our Story & Ethos',
      subtitle: 'Threads of a Living Heritage',
      desc: 'Why we reject fast fashion assembly lines to create slow, intentional structural heirlooms.',
      image: '/images/craft-hero.avif',
      href: '/story',
      tag: 'Atelier Manifesto',
      icon: Compass,
      color: 'text-forest-light',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-parchment-light/50 border-t border-parchment">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.25em] text-terracotta font-semibold block mb-2">
              Curatorial Portals
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-charcoal leading-tight">
              Explore The Heritage Archive
            </h2>
            <p className="text-sm text-charcoal/70 mt-2 font-light">
              Dive deeper into the sacred geometry, master craftspeople, and centuries-old living traditions behind every weave.
            </p>
          </div>

          <Link
            href="/story"
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-semibold text-charcoal hover:text-terracotta transition-colors group self-start md:self-end"
          >
            <span>Read Our Manifesto</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4 Portals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {portals.map((portal) => {
            const Icon = portal.icon;
            return (
              <Link
                key={portal.title}
                href={portal.href}
                className="group relative rounded-3xl overflow-hidden bg-charcoal border border-parchment shadow-craft hover:shadow-craft-hover transition-all duration-500 flex flex-col justify-end min-h-[360px] sm:min-h-[420px]"
              >
                {/* Background Image */}
                <Image
                  src={portal.image}
                  alt={portal.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover opacity-60 group-hover:opacity-75 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent" />

                {/* Top Tag Badge */}
                <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
                  <span className="text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-ivory-100 border border-white/20">
                    {portal.tag}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-charcoal/60 backdrop-blur-md flex items-center justify-center text-ivory-100 group-hover:bg-terracotta group-hover:text-white transition-colors">
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 p-6 sm:p-7 text-ivory-50 space-y-2">
                  <div className="flex items-center space-x-1.5 text-xs font-medium text-turmeric">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{portal.subtitle}</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-medium text-white group-hover:text-turmeric-light transition-colors">
                    {portal.title}
                  </h3>
                  <p className="text-xs text-ivory-200/80 line-clamp-2 font-light leading-relaxed">
                    {portal.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
