import React from 'react';
import { Hero } from '@/components/home/Hero';
import { Philosophy } from '@/components/home/Philosophy';
import { FeaturedCollections } from '@/components/home/FeaturedCollections';
import { Bestsellers } from '@/components/home/Bestsellers';
import { PatternExhibition } from '@/components/home/PatternExhibition';
import { ArtisanVoices } from '@/components/home/ArtisanVoices';
import { CraftProcess } from '@/components/home/CraftProcess';
import { BrandCampaign } from '@/components/home/BrandCampaign';
import { TrustSection } from '@/components/home/TrustSection';

export default function HomePage() {
  return (
    <>
      {/* 1. Immersive Hero */}
      <Hero />

      {/* 2. Brand Philosophy */}
      <Philosophy />

      {/* 3. Featured Collections Gallery */}
      <FeaturedCollections />

      {/* 4. Shop Bestsellers */}
      <Bestsellers />

      {/* 5. The Art of Patterns: Interactive Exhibition */}
      <PatternExhibition />

      {/* 6. Artisan Stories: Hands That Preserve Heritage */}
      <ArtisanVoices />

      {/* 7. Craftsmanship Process: Raw to Creation */}
      <CraftProcess />

      {/* 8. Brand Campaign Manifesto */}
      <BrandCampaign />

      {/* 9. Customer Trust & Authenticity Guarantees */}
      <TrustSection />
    </>
  );
}
