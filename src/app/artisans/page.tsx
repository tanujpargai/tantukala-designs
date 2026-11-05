'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, MapPin, Award, Heart, Sparkles, Compass } from 'lucide-react';
import { initialArtisans } from '@/lib/data/initialData';

export default function ArtisansPage() {
  const artisans = initialArtisans;

  return (
    <div className="py-14 sm:py-24 bg-ivory-100 min-h-screen">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Navigation Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-widest text-charcoal/60 hover:text-terracotta transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Atelier Home</span>
        </Link>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-terracotta font-semibold block mb-2">
            Custodians of Living Wisdom
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-charcoal">
            Hands That Preserve Heritage
          </h1>
          <p className="text-sm text-charcoal/70 mt-3 font-light leading-relaxed">
            Meet the master embroiderers, Mithila painters, and 5th-generation block printers whose lifetimes of devotion are stitched and painted into every Tantukala creation.
          </p>
        </div>

        {/* Artisans Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
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
                  <span className="text-[11px] text-ivory-200/90 font-light block">
                    {artisan.craftSpecialty}
                  </span>
                </div>
              </div>

              {/* Artisan Bio & Quote */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed font-light">
                  {artisan.bio}
                </p>

                <blockquote className="border-l-2 border-turmeric/70 pl-3 py-1 text-xs italic text-charcoal/70 bg-parchment/20 rounded-r-lg">
                  &ldquo;{artisan.quote}&rdquo;
                </blockquote>

                <div className="pt-2 flex items-center justify-between border-t border-parchment text-xs text-charcoal/60">
                  <div className="flex items-center space-x-1">
                    <Award className="w-3.5 h-3.5 text-terracotta" />
                    <span>{artisan.experienceYears}+ Years Craft Mastery</span>
                  </div>
                  <Link
                    href="/shop"
                    className="text-terracotta hover:underline font-semibold flex items-center space-x-1"
                  >
                    <span>View Works</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Artisan Patronage Pledge */}
        <div className="bg-charcoal text-ivory-100 rounded-3xl p-8 sm:p-14 border border-charcoal-muted">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="w-12 h-12 rounded-full border border-turmeric/50 flex items-center justify-center text-turmeric mx-auto">
              <Heart className="w-5 h-5" />
            </div>
            <span className="text-xs uppercase tracking-[0.25em] text-turmeric font-semibold block">
              Ethical Fair-Wage Covenant
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-ivory-50">
              Direct Patronage. Zero Middlemen. Total Dignity.
            </h2>
            <p className="text-xs sm:text-sm text-ivory-200/80 leading-relaxed font-light">
              Every creation sold on Tantukala directly funds the artisan households in Bhusra, Dhamadka, and Jitwarpur. Compensation is disbursed upfront before the weaving begins, insulating artisan families from the volatility of commercial middlemen.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link
                href="/shop"
                className="px-8 py-3.5 rounded-full bg-terracotta hover:bg-terracotta-dark text-white text-xs uppercase tracking-widest font-semibold transition-all shadow-md"
              >
                Patronize an Heirloom
              </Link>
              <Link
                href="/story"
                className="px-8 py-3.5 rounded-full border border-ivory-100/30 text-ivory-100 hover:bg-white/10 text-xs uppercase tracking-widest font-semibold transition-all"
              >
                Read Our Story
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
