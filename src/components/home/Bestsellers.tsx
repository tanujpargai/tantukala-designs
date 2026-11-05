'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Feather } from 'lucide-react';
import { Product } from '@/types';
import { ProductCard } from '@/components/ecommerce/ProductCard';
import { QuickViewModal } from '@/components/ecommerce/QuickViewModal';
import { initialProducts } from '@/lib/data/initialData';

export const Bestsellers: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const categories = [
    { id: 'all', name: 'All Creations' },
    { id: 'cat-madhubani', name: 'Madhubani Art' },
    { id: 'cat-sarees', name: 'Handloom Sarees' },
    { id: 'cat-dupattas', name: 'Dupattas & Stoles' },
    { id: 'cat-living', name: 'Living Textiles' },
  ];

  const filteredProducts =
    activeCategory === 'all'
      ? initialProducts.slice(0, 8)
      : initialProducts.filter((p) => p.categoryId === activeCategory);

  return (
    <section className="relative py-24 sm:py-32 bg-ivory-100 overflow-hidden">
      {/* Subtle Background Loom Weft Lines on Sides */}
      <div className="absolute inset-y-0 left-0 w-24 pointer-events-none hidden xl:block opacity-30">
        <div className="w-full h-full bg-[repeating-linear-gradient(to_bottom,#B65C43_0,#B65C43_2px,transparent_2px,transparent_32px)]" />
      </div>
      <div className="absolute inset-y-0 right-0 w-24 pointer-events-none hidden xl:block opacity-30">
        <div className="w-full h-full bg-[repeating-linear-gradient(to_bottom,#24364A_0,#24364A_2px,transparent_2px,transparent_32px)]" />
      </div>

      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        {/* Header with Decorative Running Stitch Accent */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-6 border-b border-parchment/80">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="w-6 h-[1px] bg-terracotta" />
              <span className="text-xs uppercase tracking-[0.25em] text-terracotta font-semibold">
                The Collector&rsquo;s Selection
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-charcoal tracking-tight">
              Shop Bestsellers
            </h2>
            <p className="text-sm text-charcoal/70 mt-2 font-light max-w-xl">
              Authentic handcrafted pieces woven in limited batches by master artisan cooperatives. Never mass-manufactured.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`text-xs px-4 py-2 rounded-full transition-all border ${
                  activeCategory === cat.id
                    ? 'bg-charcoal text-white border-charcoal shadow-sm scale-105'
                    : 'bg-ivory-50 text-charcoal/70 border-parchment hover:border-charcoal hover:text-charcoal'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid with Widescreen Scale */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-8 xl:gap-10">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>

        {/* Bottom Banner & CTA */}
        <div className="mt-16 pt-8 border-t border-parchment/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-xs text-charcoal/60">
            <Feather className="w-4 h-4 text-terracotta" />
            <span>Each purchase supports generational loom communities across India.</span>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-charcoal text-white hover:bg-terracotta transition-all text-xs uppercase tracking-[0.2em] font-semibold shadow-md group"
          >
            <span>Explore Entire Artisanal Catalogue</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
};
