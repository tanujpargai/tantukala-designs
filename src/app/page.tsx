import React from 'react';
import { Hero } from '@/components/home/Hero';
import { FeaturedCollections } from '@/components/home/FeaturedCollections';
import { Bestsellers } from '@/components/home/Bestsellers';
import { HeritageSpotlight } from '@/components/home/HeritageSpotlight';
import { TrustSection } from '@/components/home/TrustSection';

export default function HomePage() {
  return (
    <>
      {/* 1. Immersive Hero */}
      <Hero />

      {/* 2. Featured Regional Handloom Capsules */}
      <FeaturedCollections />

      {/* 3. Shop Bestsellers Showcase */}
      <Bestsellers />

      {/* 4. Curatorial Heritage Portals (Direct doorways to dedicated /patterns, /craft, /artisans, /story) */}
      <HeritageSpotlight />

      {/* 5. Customer Trust & Authenticity Guarantees */}
      <TrustSection />
    </>
  );
}
