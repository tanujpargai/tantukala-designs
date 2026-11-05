'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Compass } from 'lucide-react';
import { initialCollections } from '@/lib/data/initialData';

export const FeaturedCollections: React.FC = () => {
  const collections = initialCollections;

  return (
    <section className="py-24 sm:py-32 bg-parchment-light/40 border-y border-parchment/60">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.25em] text-terracotta font-semibold block mb-2">
              Curated Handloom Capsules
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-charcoal">
              Featured Collections
            </h2>
            <p className="text-sm text-charcoal/70 mt-3 font-light leading-relaxed">
              Organized by geographic craft clusters and sacred artistic disciplines. Each capsule represents months of meticulous handcraft.
            </p>
          </div>

          <Link
            href="/collections"
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-semibold text-charcoal hover:text-terracotta transition-colors group self-start md:self-end"
          >
            <span>View All Curations</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Asymmetric Collection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Card 1: Large Featured (7 cols) */}
          <div className="md:col-span-7 group">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden bg-parchment shadow-craft border border-parchment">
              <Image
                src={collections[0].imageUrl}
                alt={collections[0].title}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent" />
              <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-end text-ivory-50">
                <span className="text-xs uppercase tracking-[0.2em] text-turmeric font-semibold mb-1">
                  {collections[0].subtitle}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-white mb-2">
                  {collections[0].title}
                </h3>
                <p className="text-xs sm:text-sm text-ivory-200/80 max-w-md line-clamp-2 mb-4">
                  {collections[0].description}
                </p>
                <Link
                  href={`/collections/${collections[0].slug}`}
                  className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-semibold text-white group-hover:text-turmeric transition-colors"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Card 2: Medium (5 cols) */}
          <div className="md:col-span-5 group">
            <div className="relative aspect-[16/10] sm:aspect-[4/3] md:h-full rounded-3xl overflow-hidden bg-parchment shadow-craft border border-parchment">
              <Image
                src={collections[1].imageUrl}
                alt={collections[1].title}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent" />
              <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end text-ivory-50">
                <span className="text-xs uppercase tracking-[0.2em] text-turmeric font-semibold mb-1">
                  {collections[1].subtitle}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-medium text-white mb-2">
                  {collections[1].title}
                </h3>
                <p className="text-xs text-ivory-200/80 max-w-sm line-clamp-2 mb-4">
                  {collections[1].description}
                </p>
                <Link
                  href={`/collections/${collections[1].slug}`}
                  className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-semibold text-white group-hover:text-turmeric transition-colors"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Card 3: Medium (5 cols) */}
          <div className="md:col-span-5 group">
            <div className="relative aspect-[16/10] sm:aspect-[4/3] md:h-full rounded-3xl overflow-hidden bg-parchment shadow-craft border border-parchment">
              <Image
                src={collections[2].imageUrl}
                alt={collections[2].title}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent" />
              <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end text-ivory-50">
                <span className="text-xs uppercase tracking-[0.2em] text-turmeric font-semibold mb-1">
                  {collections[2].subtitle}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-medium text-white mb-2">
                  {collections[2].title}
                </h3>
                <p className="text-xs text-ivory-200/80 max-w-sm line-clamp-2 mb-4">
                  {collections[2].description}
                </p>
                <Link
                  href={`/collections/${collections[2].slug}`}
                  className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-semibold text-white group-hover:text-turmeric transition-colors"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Card 4: Large Featured (7 cols) */}
          <div className="md:col-span-7 group">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden bg-parchment shadow-craft border border-parchment">
              <Image
                src={collections[3].imageUrl}
                alt={collections[3].title}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent" />
              <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-end text-ivory-50">
                <span className="text-xs uppercase tracking-[0.2em] text-turmeric font-semibold mb-1">
                  {collections[3].subtitle}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-white mb-2">
                  {collections[3].title}
                </h3>
                <p className="text-xs sm:text-sm text-ivory-200/80 max-w-md line-clamp-2 mb-4">
                  {collections[3].description}
                </p>
                <Link
                  href={`/collections/${collections[3].slug}`}
                  className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-semibold text-white group-hover:text-turmeric transition-colors"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
