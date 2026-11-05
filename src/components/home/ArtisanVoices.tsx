'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, MapPin, Award } from 'lucide-react';
import { initialArtisans } from '@/lib/data/initialData';

export const ArtisanVoices: React.FC = () => {
  const artisans = initialArtisans;

  return (
    <section className="py-24 sm:py-32 bg-ivory-100 overflow-hidden">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.25em] text-terracotta font-semibold block mb-2">
              Custodians of Living Wisdom
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-charcoal">
              Hands That Preserve Heritage
            </h2>
            <p className="text-sm text-charcoal/70 mt-3 font-light leading-relaxed">
              Meet the master embroiderers, Mithila painters, and 5th-generation block printers whose lifetimes of devotion are stitched and painted into every Tantukala creation.
            </p>
          </div>

          <Link
            href="/story"
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-semibold text-charcoal hover:text-terracotta transition-colors group self-start md:self-end"
          >
            <span>Our Artisan Collective</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Artisans Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {artisans.map((artisan) => (
            <div
              key={artisan.id}
              className="bg-ivory-50 rounded-3xl overflow-hidden border border-parchment shadow-craft hover:shadow-craft-hover transition-all duration-300 flex flex-col group"
            >
              {/* Portrait Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden bg-parchment/60">
                <Image
                  src={artisan.portraitImage}
                  alt={artisan.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center space-x-1.5 text-xs text-turmeric font-medium mb-0.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{artisan.villageRegion}, {artisan.state}</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-medium">
                    {artisan.name}
                  </h3>
                  <span className="text-xs text-ivory-200/80">
                    {artisan.experienceYears} Years of Practice
                  </span>
                </div>
              </div>

              {/* Bio & Quote */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-terracotta font-semibold block mb-2">
                    {artisan.craftSpecialty}
                  </span>
                  <p className="text-xs text-charcoal/70 leading-relaxed font-light mb-4">
                    {artisan.bio}
                  </p>
                  <blockquote className="text-xs italic text-charcoal/80 border-l-2 border-terracotta/40 pl-3 py-1">
                    &ldquo;{artisan.quote}&rdquo;
                  </blockquote>
                </div>

                <div className="pt-6 mt-4 border-t border-parchment/80">
                  <Link
                    href="/craft"
                    className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-wider font-semibold text-charcoal group-hover:text-terracotta transition-colors"
                  >
                    <span>View Handcrafted Works</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
