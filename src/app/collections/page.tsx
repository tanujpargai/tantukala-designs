'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';
import { initialCollections } from '@/lib/data/initialData';

export default function CollectionsPage() {
  const collections = initialCollections;

  return (
    <div className="py-14 sm:py-24 bg-ivory-100 min-h-screen">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-terracotta font-semibold block mb-2">
            Regional Handloom Archives
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-charcoal">
            Curated Collections
          </h1>
          <p className="text-sm text-charcoal/70 mt-3 font-light leading-relaxed">
            Each collection explores a distinct geographic craft cluster, indigenous fiber, and sacred artistic discipline.
          </p>
        </div>

        {/* Collection Cards List */}
        <div className="space-y-16">
          {collections.map((col, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={col.id}
                className="bg-ivory-50 rounded-3xl border border-parchment overflow-hidden shadow-craft grid grid-cols-1 lg:grid-cols-12 items-center"
              >
                {/* Image (7 cols) */}
                <div
                  className={`lg:col-span-7 relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:h-[480px] bg-parchment ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <Image
                    src={col.imageUrl}
                    alt={col.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent lg:hidden" />
                </div>

                {/* Content (5 cols) */}
                <div
                  className={`lg:col-span-5 p-8 sm:p-12 space-y-5 ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <span className="text-xs uppercase tracking-[0.25em] text-turmeric font-semibold block">
                    {col.subtitle}
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-charcoal">
                    {col.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed font-light">
                    {col.editorialStory}
                  </p>
                  <div className="pt-2">
                    <Link
                      href={`/collections/${col.slug}`}
                      className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-charcoal text-white hover:bg-terracotta transition-colors text-xs uppercase tracking-widest font-semibold shadow-md group"
                    >
                      <span>Explore Collection Pieces</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
