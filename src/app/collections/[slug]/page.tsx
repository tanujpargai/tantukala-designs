'use client';

import React from 'react';
import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Compass } from 'lucide-react';
import { store } from '@/lib/store';
import { ProductCard } from '@/components/ecommerce/ProductCard';

export default function SingleCollectionPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const collection = store.getCollectionBySlug(slug);

  if (!collection) {
    return (
      <div className="py-32 text-center bg-ivory-100 min-h-screen">
        <h2 className="font-serif text-2xl text-charcoal">Collection not found</h2>
        <p className="text-xs text-charcoal/60 mt-2 mb-6">
          The requested collection could not be located in our archive.
        </p>
        <Link
          href="/collections"
          className="px-6 py-2.5 rounded-full bg-charcoal text-white text-xs uppercase tracking-widest"
        >
          View All Collections
        </Link>
      </div>
    );
  }

  const products = store.getProducts().filter((p) => p.collectionId === collection.id);

  return (
    <div className="bg-ivory-100 min-h-screen pb-24">
      {/* Editorial Hero Banner */}
      <div className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-charcoal text-ivory-50">
        <Image
          src={collection.bannerUrl || collection.imageUrl}
          alt={collection.title}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <Link
            href="/collections"
            className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-widest text-turmeric hover:underline mb-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Collections</span>
          </Link>
          <span className="text-xs uppercase tracking-[0.25em] text-ivory-200/80 font-semibold block mb-2">
            {collection.subtitle}
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-medium text-white mb-4">
            {collection.title}
          </h1>
          <p className="text-xs sm:text-base text-ivory-200/90 max-w-2xl mx-auto font-light leading-relaxed">
            {collection.editorialStory}
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pt-16">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-parchment text-xs text-charcoal/70">
          <span>
            Curated selection of <strong className="text-charcoal">{products.length}</strong> creations
          </span>
          <Link href="/shop" className="text-terracotta hover:underline font-semibold">
            View All Handlooms &rarr;
          </Link>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-ivory-50 rounded-3xl border border-parchment">
            <p className="font-serif text-lg text-charcoal">
              New artisanal pieces for this collection are currently on the loom.
            </p>
            <Link
              href="/shop"
              className="mt-4 inline-block px-6 py-2.5 rounded-full bg-charcoal text-white text-xs uppercase tracking-widest"
            >
              Browse Available Handlooms
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
